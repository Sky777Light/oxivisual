import {
    Component,
    Input,
    //CORE_DIRECTIVES,
    EventEmitter,
    Output,
    ViewChild,
    OnInit
} from  '@angular/core';

@Component({
    selector: 'node',
    template: `
<li [ngClass]="{'last-item':lastE}">

	<div class ="iconButton"   [ngClass]="item._selected?classes+' active':classes"  #iconBtn>
	    <a  (click)="select(item )" >{{item.name}}</a>
	    <div class="pop-up-icon" [class.pop-up-icon-active]="showPopUp">
          <i class="material-icons set-icon" (click)="showPopUp = !showPopUp">more_vert</i>
        </div>
	</div>
	<div *ngIf="!arrow" class="left-arrow"></div>
	<div *ngIf="!arrow && lastE" class="left-arrow end-list"></div>

	    <div class="pop-up bla-t" [hidden]="!showPopUp" *ngIf="showPopUp" (click)="showPopUp = !showPopUp" (window:mouseup)="showPopUp = !showPopUp">
            <div class="pop-up-item"  *ngIf="item.areas && item.areas.length" (click)="IsExpanded = !IsExpanded">
              <i class="material-icons">visibility</i>
              <div class="pop-up-row-name">
                <span>{{IsExpanded?"Hide":"Expand"}}</span>
              </div>
            </div>
            <div class="pop-up-item" (click)="delete()" *ngIf="item._id != parent._id">
              <i class="material-icons">delete</i>
              <div class="pop-up-row-name">
                <span>Delete</span>
              </div>
            </div>
        </div>
	<div *ngIf="IsExpanded">
        <ul *ngIf="item.areas" class="tree-webgl-view">
              <node  *ngFor="let subitem of item.areas; let itT = index"  [_iter]="index" [classes]="subitem._category===0?'js-code':subitem._category==1?'link':'' " [mainParent]="mainParent"  [parent]="item" [item]="subitem" [lastE]="itT == item.areas.length-1"></node>
        </ul>
	</div>
</li>
`
})
export class MNode {
    @Input() classes:any;
    @Input() lastE:boolean;
    @Input() arrow:any;
    @Input() item:any;
    @Input() parent:any;
    @Input() mainParent:any;
    @Input() _iter:number;
    @ViewChild("iconBtn")
        iconBtn:HTMLElement;
    IsExpanded:boolean = true;
    toggle() {
        this.IsExpanded = !this.IsExpanded;


    }
    select(item){
        this.mainParent.select(item);
    }
    delete(){
        let itemDroped = this.parent.areas.splice(this._iter,1)[0];
        if(this.mainParent.selectedChild.glApp)this.mainParent.selectedChild.glApp._deleteArea(itemDroped);
        this.mainParent.select(this.parent);
    }

}

@Component({
    selector: 'tree',
    template: `
<ul class="tree-webgl-view first" slimScroll  >
		<node *ngFor="let item of data" [arrow]="1" [classes]="'main'" [parent]="item" [mainParent]="mainParent" [item]="item"     ></node>
</ul>
`,
    styleUrls: ['./tree.sass']
})
export class MTree {
    @Input() data:any[];
    @Input() mainParent:any;

}