/*
import {Component, OnInit, OnDestroy} from '@angular/core';
import * as PROJ from "../../../../entities/Project";
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../../../services/user.service";
import {NewProjectComponent} from "../new-project/new-project.component";
import {ShareService} from "../../../../services/share.service";


declare var alertify: any;

@Component({
    selector: 'app-projects-template',
    template:'<p>Abstract Class</p>'
})
export class AbstractTemplateProject  implements OnInit,OnDestroy {

    protected project: PROJ.IProject;
    protected abstract:any;
    protected sub: any;

    constructor(protected route: ActivatedRoute,protected userService: UserService){

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.getUser().projects.forEach((project)=>{
                if(project._id == params['id']){
                    this.project = new PROJ.Project(project);
                }
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}*/
