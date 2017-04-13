import { Injectable } from '@angular/core';
import * as PROJ from "../entities/Project";

@Injectable()
export class ProjectService {

  private Project: PROJ.IProject;

  constructor() { }


  setProject(project: any): void {
    this.Project = project;
  }

  getProject(){
    return this.Project;
  }

}
