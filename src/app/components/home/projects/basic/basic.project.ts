import {Component} from '@angular/core';
import {AbstractTemplateProject} from "../template/temp.view.project";
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../../../services/user.service";
import * as PROJ from "../../../../entities/Project";

declare var alertify: any;

@Component({
    selector: 'app-projects-edit',
    templateUrl: './basic.project.html',
    styleUrls: ['./basic.project.sass']
})
export class BasicProject  extends AbstractTemplateProject{
    protected project: PROJ.IProject;
    protected abstract:any;
    protected sub: any;

    constructor(protected route: ActivatedRoute,protected userService: UserService){
        super(route,userService);
    }

}