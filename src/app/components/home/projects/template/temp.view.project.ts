import {Component, OnInit, OnDestroy} from '@angular/core';
import * as PROJ from "../../../../entities/Project";
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../../../services/user.service";


declare var alertify: any;

@Component({
    selector: 'app-projects-template',
    template:'<p>Abstract Class</p>'
})
export class AbstractTemplateProject  implements OnInit,OnDestroy {

    protected project: PROJ.IProject;
    protected sub: any;

    constructor(protected route: ActivatedRoute,protected userService: UserService){

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.getUser().projects.forEach((project)=>{
                if(project._id == params['id']){
                    this.project = project;
                }
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}