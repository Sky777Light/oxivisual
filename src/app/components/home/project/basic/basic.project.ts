import {Component} from '@angular/core';
import * as PROJ from "../../../../entities/Project";
import {ProjectService} from "../../../../services/project.service";

declare var alertify: any;

@Component({
    selector: 'app-basic-project',
    templateUrl: './basic.project.html',
    styleUrls: ['./basic.project.sass']
})
export class BasicProject {
    private project: PROJ.IProject;

    constructor(private projectService: ProjectService){
    }

    ngOnInit(){
        this.project = this.projectService.getProject();
    }

}