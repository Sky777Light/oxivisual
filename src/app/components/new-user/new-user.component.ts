import {Component} from '@angular/core';
import {User} from "../../interfaces/user";
import {ShareService} from "../../services/share.service";
import {Resol} from "../../interfaces/resol.interface";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent {

  private tempNewUser: User = {
    email: 'asdasd',
    firstName: '',
    secondName: '',
    avatar: '',
    status: '',
    created: '',
    password: '',
    passwordRepeat: '',
    projects: [],
    users: [],
    active: true,
    newUser: false
  };

  private resol: Resol = {
  firstName: true,
  secondName: true,
  email: true,
  pass: true,
  passRep: true
};

  constructor(
      private shareService: ShareService
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

  accept(){
    this.shareService.changeShareSubject(this.tempNewUser);
  }

  cancel(){
    this.shareService.changeShareSubject(this.tempNewUser);
  }
  
}
