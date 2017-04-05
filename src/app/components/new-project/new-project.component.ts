import {Component, HostListener} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user.interface";
import {Resol} from "../../interfaces/resol.interface";
import {Project} from "../../interfaces/project.interface";
import {ShareService} from "../../services/share.service";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.sass']
})
export class NewProjectComponent {

  private User: User;
  
  private tempNewProject: Project = {
    title: '',
    link: '',
    image: '',
    created: '',
    newProject: true
  };

  private resol: Resol = {
    title: true,
    link: true
  };
  
  constructor(
      private userService: UserService,
      private shareService: ShareService
  ) {
    this.User = this.userService.getUser();
  }



//photo change
  loadPhoto($event){
    let fr = new FileReader();
    try{
      fr[ 'readAsDataURL' ]( $event.target.files[0] );
      fr.onload = ()=>{
        this.tempNewProject.image = fr.result;
      };
    } catch( err ){
      console.log('load photo err: ',err);
    }
  }

  removePhoto(){
    this.tempNewProject.image = '';
  }

  //user save accept/cancel
  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent){
    if(event.keyCode == 13){
      this.accept();
    } else if (event.keyCode == 27){
      this.cancel();
    }
  }

  accept(){
    if(!this.userService.resolUser(this.resol, this.tempNewProject)) return false;

    //user's create date
    let today = new Date();
    let dd:any = today.getDate();
    let mm:any = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd
    }

    if(mm<10) {
      mm='0'+mm
    }
    this.tempNewProject.created = dd+'.'+mm+'.'+yyyy;
    this.tempNewProject.newProject = true;

    this.shareService.changeShareSubject(this.tempNewProject);
  }

  cancel(){
    this.tempNewProject.newProject = false;
    this.shareService.changeShareSubject(this.tempNewProject);
  }

}
