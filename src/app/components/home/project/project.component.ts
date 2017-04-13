import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ShareService} from "../../../services/share.service";
import {UserService} from "../../../services/user.service";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent{
  protected sub: any;

  constructor(
      private shareService: ShareService,
      private route: ActivatedRoute,
      private userService: UserService,
      private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userService.getUser().projects.forEach((project)=>{
        if(project._id == params['id']){
          this.shareService.changeHeaderSubject(project);
          this.projectService.setProject(project);
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
