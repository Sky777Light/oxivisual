import {Input,Component} from '@angular/core';
import * as PROJ from "../../../../entities/Project";

declare var alertify: any;

@Component({
    selector: 'app-project-view',
    templateUrl: './view.project.html',
    styleUrls: ['./view.project.sass']
})
export class ViewProject{
    @Input()  project:PROJ.IProject;
    @Input()  noEdite:string;
    constructor(){
    }
}