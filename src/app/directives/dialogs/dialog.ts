export class Dialog {
    parent:any;
    container:any;
    popUp:any;
    body:any;
    btns:any;
    values:any;

    constructor(val) {
        this.values = val;
        this.parent = document.body;
        let div = this.container = document.createElement('div');
        this.popUp = document.createElement('div');
        div.className = 'dialog-view';
        this.popUp.className = 'dialog-pop-up';
        div.appendChild(this.popUp);
        this.parent.appendChild(div);
        this.popUp.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        let title = document.createElement('h4');
        title.innerHTML = val.title;
        this.popUp.appendChild(title);

        let body = this.body = document.createElement('div');
        body.className = "body-dialog";
        this.popUp.appendChild(body);


        let btns = this.btns = document.createElement('div');
        let btnOk = document.createElement('span');
        btns.className = 'new-btns';
        btnOk.className = 'true-btn';
        btnOk.innerText = 'accept';
        btnOk.addEventListener('click', ()=>this.onOk());
        div.addEventListener('click', ()=>this.onOk());
        btns.appendChild(btnOk);
        this.popUp.appendChild(btns);
    }

    onOk() {
        if (this.values.onOk)this.values.onOk();
        this.anyWay();
    }

    anyWay() {
        if (this.values.onAnyWay)this.values.onAnyWay();
        let foo = this.container;
        while (foo.firstChild) foo.removeChild(foo.firstChild);
        if (foo.parentNode)foo.parentNode.removeChild(foo);
    }
}
export class Confirm extends Dialog {
    constructor(val) {
        super(val);
        let btnCancel = document.createElement('span');
        btnCancel.className = 'false-btn';
        btnCancel.innerText = 'cancel';
        btnCancel.addEventListener('click', ()=>this.onCancel());
        this.btns.appendChild(btnCancel);
    }

    onCancel() {
        if (this.values.onCancel)this.values.onCancel();
        this.anyWay();
    }
}
export class Prompt extends Dialog {
    input:any;

    constructor(val) {
        super(val);
        let input = this.input = document.createElement('input');
        input.value = val.txt || 'Default input data';
        input.addEventListener('change', (e)=> {
            this.input.className = input.value.length ? '' : 'error';
        });
        this.body.appendChild(input);
    }

    onOk() {
        if (!this.input.value)return this.input.className = 'error';
        super.onOk();
    }

    anyWay() {
        if (!this.input.value)return this.input.className = 'error';
        super.anyWay();
    }

}