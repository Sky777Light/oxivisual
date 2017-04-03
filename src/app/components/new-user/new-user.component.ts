import {Component, HostListener} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {ShareService} from "../../services/share.service";
import {Resol} from "../../interfaces/resol.interface";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent {

  private tempNewUser: User = {
    email: '',
    firstName: '',
    secondName: '',
    avatar: '',
    role: '',
    created: '',
    password: '',
    passwordRepeat: '',
    projects: [],
    users: [],
    active: true,
    newUser: true
  };

  private resol: Resol = {
    firstName: true,
    secondName: true,
    email: true,
    password: true,
    passwordRepeat: true,
    role:true
  };

  constructor(
      private shareService: ShareService,
      private userService: UserService
  ){ }


//photo change
  loadPhoto($event){
    let fr = new FileReader();
    try{
      fr[ 'readAsDataURL' ]( $event.target.files[0] );
      fr.onload = ()=>{
        this.tempNewUser.avatar = fr.result;
      };
    } catch( err ){
      console.log('load photo err: ',err);
    }
  }
  
  removePhoto(){
    this.tempNewUser.avatar = '';
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
    if(!this.userService.resolUser(this.resol, this.tempNewUser)) return false;

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
    this.tempNewUser.created = dd+'.'+mm+'.'+yyyy;
    this.tempNewUser.newUser = true;
    
    this.shareService.changeShareSubject(this.tempNewUser);
  }

  cancel(){
    this.tempNewUser.newUser = false;
    this.shareService.changeShareSubject(this.tempNewUser);
  }
  
}
