import {Component} from '@angular/core';
import {User} from "../../../interfaces/user.interface";
import {UserService} from "../../../services/user.service";
import {ShareService} from "../../../services/share.service";

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
    sortType: 'A-Z'
  };


//new project
  private createNewProject: boolean = false;

//user
  private User: User;

  constructor(
      private userService: UserService,
      private shareService: ShareService
  ){
    this.User = this.userService.getUser();
  }

  ngOnInit() {
    this.shareService.changeHeaderSubject(this.header);
  }

}
