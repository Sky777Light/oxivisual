import {Component} from '@angular/core';
import {AbstractTemplateProject} from "../template/temp.view.project";
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../../../services/user.service";
import * as PROJ from "../../../../entities/Project";

declare var alertify: any;

@Component({
    selector: 'app-projects-source',
    templateUrl: './source.project.html',
    styleUrls: ['./source.project.sass']
})
export class SourceProject  extends AbstractTemplateProject{
    protected project: PROJ.IProject;
    protected abstract:any;
    protected sub: any;

    constructor(protected route: ActivatedRoute,protected userService: UserService){
        super(route,userService);
    }


}