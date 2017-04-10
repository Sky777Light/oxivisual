import {Component} from '@angular/core';
import {User} from "../../../interfaces/user.interface";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs/Rx";
import {ShareService} from "../../../services/share.service";
import {AuthService} from "../../../services/auth.service";

declare var alertify: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent {

//data work with header
  private header: any = {
    title: 'Projects',
    arrLength: 0,
    searchName: '',
    sortType: 'A-Z',
    type: 'projects'
  };


//new project
  private createNewProject: boolean = false;
  private subNewProject:Subscription;

//user
  private User: User;

  constructor(
      private userService: UserService,
      private shareService: ShareService,
      private authService: AuthService
  ){
    this.User = this.userService.getUser();
  }

  ngOnInit() {
    this.header = this.shareService.setHeader(this.header);

    this.subNewProject = this.shareService.shareListener.subscribe((project: any) => {
      if(project != undefined){
        this.createNewProject = false;
        if(project.newProject){
          this.authService.post('/api/projects/project', project).subscribe((res: any) => {
            res = res.json();
            if(res.status) {
              this.User.projects.push(res.res);
            }
            alertify.success(res.message);
          }, (error) => {});
        }
      }
    })
  }

  ngOnDestroy() {
    this.subNewProject.unsubscribe();
  }

}
