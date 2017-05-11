import {
    Component,
    Input,
    //CORE_DIRECTIVES,
    EventEmitter,
    Output,
    OnInit
} from  '@angular/core';

@Component({
    selector: 'node',
    template: `
<li>

	<div class ="iconButton"   [ngClass]="classes">
	    <a  (click)="select(item )" >{{item.name}}</a>
	    <div class="pop-up-icon" [class.pop-up-icon-active]="showPopUp">
          <i class="material-icons set-icon" (click)="showPopUp = !showPopUp">more_vert</i>
        </div>
	</div>
	    <div class="pop-up bla-t" [hidden]="!showPopUp" *ngIf="showPopUp" (click)="showPopUp = !showPopUp" >
            <div class="pop-up-item"  *ngIf="item.areas" (click)="IsExpanded = !IsExpanded">
              <i class="material-icons">visibility</i>
              <div class="pop-up-row-name">
                <span>{{IsExpanded?"Hide":"Expand"}}</span>
              </div>
            </div>
            <div class="pop-up-item" (click)="delete()">
              <i class="material-icons">delete</i>
              <div class="pop-up-row-name">
                <span>Delete</span>
              </div>
            </div>
        </div>
	<div *ngIf="IsExpanded">
        <ul *ngIf="item.areas" class="tree-webgl-view">
              <node  *ngFor="let subitem of item.areas" [classes]="subitem.category"  [parent]="parent" [item]="subitem"></node>
        </ul>
	</div>
</li>
`
})
export class MNode {
    @Input() classes:any;
    @Input() item:any;
    @Input() parent:any;
    IsExpanded:boolean = true;
    toggle() {
        this.IsExpanded = !this.IsExpanded;


    }
    select(item){
        this.parent.select(item);
    }
    delete(){
        console.log(this.item);
    }

}

@Component({
    selector: 'tree',
    template: `
<ul class="tree-webgl-view ">
		<node *ngFor="let item of data" [classes]="'main'"  [parent]="parent" [item]="item"></node>
</ul>
`,
    styleUrls: ['./tree.sass']
})
export class MTree {
    @Input() data:any[];
    @Input() parent:any;


}