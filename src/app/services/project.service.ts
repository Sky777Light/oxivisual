import { Injectable } from '@angular/core';
import * as PROJ from "../entities/Project";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";

declare var alertify;

@Injectable()
export class ProjectService {

  private Project: PROJ.IProject;

  constructor(
      private authService: AuthService,
      private userService: UserService
  ) { }

  setProject(project: any): void {
    this.Project = project;
  }

  getProject(){
    return this.Project;
  }

  createProject(project: PROJ.IProject){
    let link = '/api/projects/project';

    this.authService.post(link, project).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        let user = this.userService.getUser();
        user.projects.push(res.res);
      }
      alertify.success(res.message);
    }, (error) => {});
  }
  
  changeProject(project: any){
    let link = '/api/projects/project';

    this.authService.put(link, project).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        for(let key in res.res){
          this.Project[key] = res.res[key];
        }
      }
      alertify.success(res.message);
    }, (error) => {});
  }

  deleteProject(project: PROJ.IProject){
    let link = '/api/projects/project';
    
    this.authService.delete(link, project).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        let user = this.userService.getUser();
        let idx = user.projects.indexOf(project);
        user.projects.splice(idx, 1);
      }
      alertify.success(res.message);
    }, (error) => {});
  }
}
