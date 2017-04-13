import {Component, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";
import {Resol} from "../../../../interfaces/resol.interface";
import * as PROJ from "../../../../entities/Project";
import {ShareService} from "../../../../services/share.service";
import {AuthService} from "../../../../services/auth.service";

declare var alertify;

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.sass']
})
export class NewProjectComponent {

  @Input() project: PROJ.IProject;
  @Input()  title:string;
  @Input() openedState: boolean;
  @Output() openedStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private User:User;

  private resol:Resol = {
    title: true,
    link: true
  };

  constructor(
      protected userService:UserService,
      protected shareService:ShareService,
      protected authService:AuthService
  ) {
    this.User = this.userService.getUser();
    this.project = new PROJ.Project();
  }


//photo change
  loadPhoto($event) {
    let fr = new FileReader();
    try {
      fr['readAsDataURL']($event.target.files[0]);
      fr.onload = ()=> {
        this.project.image = fr.result;
      };
    } catch (err) {
      console.log('load photo err: ', err);
    }
  }

  removePhoto() {
    this.project.image = '';
  }

  //user save accept/cancel
  @HostListener('window:keydown', ['$event'])
  keyDown(event:KeyboardEvent) {
    if (event.keyCode == 13) {
      this.accept();
    } else if (event.keyCode == 27) {
      this.cancel();
    }
  }

  accept() {
    if (!this.userService.resolUser(this.resol, this.project)) return false;

    this.authService.post('/api/projects/project', this.project).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        this.User.projects.push(res.res);
      }
      alertify.success(res.message);
    }, (error) => {});

    this.cancel();
  }

  cancel() {
    this.openedState = false;
    this.openedStateChange.emit(this.openedState);
  }


}
