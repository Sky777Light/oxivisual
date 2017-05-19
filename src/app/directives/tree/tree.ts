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
<li>

	<div class ="iconButton"   [ngClass]="classes" #iconBtn>
	    <a  (click)="select(item )" >{{item.name}}</a>
	    <div class="pop-up-icon" [class.pop-up-icon-active]="showPopUp">
          <i class="material-icons set-icon" (click)="showPopUp = !showPopUp">more_vert</i>
        </div>
	</div>
	<div *ngIf="!arrow" class="left-arrow"></div>

	    <div class="pop-up bla-t" [hidden]="!showPopUp" *ngIf="showPopUp" (click)="showPopUp = !showPopUp" >
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
              <node  *ngFor="let subitem of item.areas;"  [_iter]="index" [classes]="subitem._category===0?'js-code':subitem._category==1?'link':'' " [mainParent]="mainParent"  [parent]="item" [item]="subitem"></node>
        </ul>
	</div>
</li>
`
})
export class MNode {
    @Input() classes:any;
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

        let _active = document.querySelector('.tree-webgl-view .iconButton.active');
        if(_active){
            _active.className = _active.className.replace(' active','');
        }
        this.iconBtn['nativeElement'].className +=' active';

    }
    delete(){
        this.mainParent.selectedChild.app._deleteArea( this.parent.areas.splice(this._iter,1)[0]);
    }

}

@Component({
    selector: 'tree',
    template: `
<ul class="tree-webgl-view first" >
		<node *ngFor="let item of data" [arrow]="1" [classes]="'main active'" [parent]="item" [mainParent]="mainParent" [item]="item"></node>
</ul>
`,
    styleUrls: ['./tree.sass']
})
export class MTree {
    @Input() data:any[];
    @Input() mainParent:any;
}