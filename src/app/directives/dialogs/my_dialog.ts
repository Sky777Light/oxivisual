import {Input,ViewChild,Component,OnInit,OnChanges,EventEmitter,Injectable} from '@angular/core';
import * as ENTITY from '../../entities/entities';

@Component({
    selector: 'app-project-dialog',
    template: '<div class="dialog-view" #container>' +
    '<div class="dialog-pop-up" #popUp (click)="preventEv($event)">' +
        '<h4 [innerText]="values.title"></h4>' +
        '<div #body></div>' +
            '<div #btns>' +
            '<span (click)="onOk()">accept</span>' +
            '</div>' +
        '</div>' +
    '</div>',
    styleUrls: ['./webgl.view.sass']
})
export class MDialog implements OnInit {
    parent:any;
    @ViewChild("container")
        container:any;
    @ViewChild("popUp")
        popUp:any;
    @ViewChild("body")
        body:any;
    @ViewChild("btns")
        btns:any;
    values:any;
    constructor( val){
        this.values = val||{};
        this.parent = document.body;


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
    private preventEv(e){
        e.preventDefault();
        e.stopPropagation();
    }
}
