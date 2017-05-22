import { Injectable } from '@angular/core';
import * as ENTITY from "../entities/entities";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";

declare var alertify;

@Injectable()
export class ProjectService {

    private Project:any;

    constructor(private authService:AuthService,
                private userService:UserService) {
        this.Project = new ENTITY.Project();
    }

    setProject(project:any):void {

        if (!(project instanceof  ENTITY.Project)) {
            this.Project = new ENTITY.Project(project);
        } else {
            this.Project = project;
        }
        if (!(this.Project.model instanceof  ENTITY.ProjectModel)) {
            this.Project.model = new ENTITY.ProjectModel(this.Project.model);
        }
        if (this.Project.model.link) {
            if (!(this.Project.model.data instanceof  Array)) {
                this.authService.get(ENTITY.Config.PROJ_LOC + this.Project.model.link + ENTITY.Config.SITE_STRUCTURE).subscribe((res:any) => {
                    this.Project.model.data = [];
                    for (let _data = res.json(), i = 0; i < _data.length; i++) {
                        this.Project.model.data.push(ENTITY.ProjMain.inject(_data[i]));
                    }
                    if (this.Project.select)this.Project.select(this.Project.model);
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
                alertify.success(res.message);
                //this.setProject(res.res);
                for (let key in project) {
                    this.Project[key] = project[key];
                }
            } else {
                alertify.error(res.message);
            }

        }, (error) => {
        });
    }

    deleteProject(project:any,callback=null) {
        let link = '/api/projects/project';

        this.authService.delete(link, project).subscribe((res:any) => {
            res = res.json();
            if (res.status) {
                let user = this.userService.getUser();
                for (let i = 0; i < user.projects.length; i++) {
                    if (user.projects[i]._id == project._id) {
                        user.projects.splice(i, 1);
                        break;
                    }
                }
                if(callback)callback();
            }
            alertify.success(res.message);
        }, (error) => {
        });
    }
}
