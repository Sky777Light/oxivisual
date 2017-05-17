class Dialog {
    parent:any;
    container:any;
    popUp:any;
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

        let title = document.createElement('h4');
        title.innerHTML = val.title;
        this.popUp.appendChild(title);

        let btns = this.btns = document.createElement('div');
        let btnOk = document.createElement('span');
        btns.className = 'new-btns';
        btnOk.className = 'true-btn';
        btnOk.innerText = 'accept';
        btnOk.addEventListener('click',()=>this.onOk());
        div.addEventListener('click',()=>this.onOk());
        btns.appendChild(btnOk);
        this.popUp.appendChild(btns);
    }
    onOk(){
        if(this.values.onOk)this.values.onOk();
        this.anyWay();
    }
    anyWay(){
        if(this.values.onAnyWay)this.values.onAnyWay();
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
        this.btns.appendChild(btnCancel);
    }

    onCancel(){
        if(this.values.onCancel)this.values.onCancel();
        this.anyWay();
    }
}