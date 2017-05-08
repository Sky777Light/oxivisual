import {
    Component,
    Input,
    //CORE_DIRECTIVES,
    OnInit
} from  '@angular/core';

@Component({
    selector: 'node',
    template: `
<li>
	<a class ="iconButton" (click)="toggle()"> <i class="material-icons">add</i>{{item.name}},{{IsExpanded}}</a>
	<div *ngIf="IsExpanded">
  	<ul *ngIf="item.areas">
  		<template  *ngFor="let subitem of item.areas" >
  			<node [item]="subitem"></node>
  		</template>
  	</ul>
	</div>
</li>
`
})
export class MNode {
    @Input() item:any;
    IsExpanded:boolean = false;

    toggle() {
        this.IsExpanded = !this.IsExpanded;
        console.log(this.item);

    }
}

@Component({
    selector: 'tree',
    template: `
<ul>
		<node *ngFor="let item of data" [item]="item"></node>
</ul>
`
})
export class MTree {
    @Input() data:any[];
}