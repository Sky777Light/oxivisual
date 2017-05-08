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
	<a class ="iconButton"  (click)="select(item )" >{{item.name}}</a>
	<div *ngIf="IsExpanded">
        <ul *ngIf="item.areas">
              <node  *ngFor="let subitem of item.areas" [parent]="parent" [item]="subitem"></node>
        </ul>
	</div>
</li>
`
})
export class MNode {
    @Input() item:any;
    @Input() parent:any;
    IsExpanded:boolean = true;
    toggle() {
        this.IsExpanded = !this.IsExpanded;


    }
    select(item){
        this.parent.select(item);
    }

}

@Component({
    selector: 'tree',
    template: `
<ul>
		<node *ngFor="let item of data"   [parent]="parent" [item]="item"></node>
</ul>
`
})
export class MTree {
    @Input() data:any[];
    @Input() parent:any;


}