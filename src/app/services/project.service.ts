import { Injectable } from '@angular/core';
import * as ENTITY from "../entities/entities";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";

declare var alertify;

@Injectable()
export class ProjectService {

    private Project:ENTITY.IProject;

    constructor(private authService:AuthService,
                private userService:UserService) {
        this.Project = new ENTITY.Project();
    }

    setProject(project:any):void {
        this.Project = new ENTITY.Project(project);
        if (!(this.Project.model instanceof  ENTITY.ProjectModel)) {
            this.Project.model = new ENTITY.ProjectModel(this.Project.model);
        }
        if (this.Project.model.link) {
            if (!(this.Project.model.data instanceof  Array)) {
                this.authService.get(ENTITY.Config.PROJ_LOC+this.Project.model.link + ENTITY.Config.SITE_STRUCTURE).subscribe((res:any) => {
                    this.Project.model.data = [new ENTITY.ModelStructure(res.json()[0])];
                });

            }
        }
    }

    getProject() {
        return this.Project;
    }

    createProject(project:ENTITY.IProject) {
        let link = '/api/projects/project';

        this.authService.post(link, project).subscribe((res:any) => {
            res = res.json();
            if (res.status) {
                let user = this.userService.getUser();
                user.projects.push(res.res);
            }
            alertify.success(res.message);
        }, (error) => {
        });
    }

    changeProject(project:any) {
        let link = '/api/projects/project';

        this.authService.put(link, project).subscribe((res:any) => {
            res = res.json();
            if (res.status) {
                this.setProject(res.res);
                //for(let key in res.res){
                //  this.Project[key] = res.res[key];
                //}
            }
            alertify.success(res.message);
        }, (error) => {
        });
    }

    deleteProject(project:ENTITY.IProject) {
        let link = '/api/projects/project';

        this.authService.delete(link, project).subscribe((res:any) => {
            res = res.json();
            if (res.status) {
                let user = this.userService.getUser();
                let idx = user.projects.indexOf(project);
                user.projects.splice(idx, 1);
            }
            alertify.success(res.message);
        }, (error) => {
        });
    }
}
