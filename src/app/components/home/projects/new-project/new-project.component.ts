import {Component, Input, Output, EventEmitter, HostListener,ViewChild} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../interfaces/user.interface";
import {Resol} from "../../../../interfaces/resol.interface";
import * as ENTITY from "../../../../entities/entities";
import {ProjectService} from "../../../../services/project.service";

declare var alertify;

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.sass']
})
export class NewProjectComponent {

  @ViewChild("createViewForm")
      createViewForm:HTMLElement;
  @Input() project:any;
  @Input() title: string;
  @Input() Create: boolean;
  @Input() openedState: boolean;
  @Output() openedStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private User:User;
  private _CONFIG:any;
  private tempProject: any;

  private resol:Resol = {
    title: true,
    link: true
  };

  constructor(
      protected userService: UserService,
      protected projectService: ProjectService
  ) {
    this.User = this.userService.getUser();
    this.project = new ENTITY.Project();

    this._CONFIG = ENTITY.Config;
    this.Create = true;
  }


  ngOnInit(){
    this.tempProject = Object.assign({}, this.project);
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
    if (event.keyCode == 13 && this.Create) {
      this.accept(this.createViewForm);
    } else if (event.keyCode == 27 && this.Create) {
      this.cancel();
    }
  }

  accept(form:any) {
    form.clicked = true;
    if (form.invalid || !this.userService.resolUser(this.resol, this.project)) return false;

    !this.project._id ? this.projectService.createProject(this.project) : this.projectService.changeProject(this.project);

    this.cancel();
  }

  cancel() {
    this.openedState = false;
    this.openedStateChange.emit(this.openedState);
  }

  reset(){
    this.project.image = this.tempProject.image;
    this.project.link = this.tempProject.link;
    this.project.title = this.tempProject.title;
  }

}
