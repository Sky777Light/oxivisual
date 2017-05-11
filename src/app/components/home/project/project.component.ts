import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
      private router: Router,
      private userService: UserService,
      private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let selectedProject = null;
      this.userService.getUser().projects.forEach((project)=>{
        if(project._id == params['id']){
          selectedProject = project;
        }
      });

      if(selectedProject){
        this.projectService.setProject(selectedProject);
        this.shareService.changeHeaderSubject(this.projectService.getProject());
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
