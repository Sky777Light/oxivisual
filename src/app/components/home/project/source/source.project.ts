import {Component} from '@angular/core';
import * as PROJ from "../../../../entities/Project";

declare var alertify: any;

@Component({
    selector: 'app-projects-source',
    templateUrl: './source.project.html',
    styleUrls: ['./source.project.sass']
})
export class SourceProject{
    protected project: PROJ.IProject;

    constructor(){
    }


}