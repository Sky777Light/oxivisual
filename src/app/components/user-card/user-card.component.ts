import {Component, Input, SimpleChange} from '@angular/core';
import {User} from "../../interfaces/user";
import {Resol} from "../../interfaces/resol.interface";

declare var alertify: any;

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass']
})
export class UserCardComponent {

  @Input() canEdit;
  @Input() user;

  private resol: Resol = {
    firstName: true,
    secondName: true,
    email: true,
    pass: true,
    passRep: false
  };
  
  private tempUser: User;
  private openMenu: boolean = false;

  constructor() { }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    if(changes['user']){
      this.tempUser = Object.assign({}, changes['user'].currentValue);
    }
  }

//photo change
  loadPhoto($event){
    let fr = new FileReader();
    try{
      fr[ 'readAsDataURL' ]( $event.target.files[0] );
      fr.onload = ()=>{
        this.tempUser.avatar = fr.result;
      };
    } catch( err ){
      console.log('load photo err: ',err);
    }
  }

  removePhoto(){
    this.tempUser.avatar = '';
  }


//check inputs
  checkResol(){
    this.resol.email = this.tempUser.email ? true : false;
    this.resol.firstName = this.tempUser.firstName ? true : false;
    this.resol.secondName = this.tempUser.secondName ? true : false;
    return this.resol.email && this.resol.firstName && this.resol.secondName;
  }

//change user
  changeUser(){

    if(!this.checkResol()) return false;
    // request to bd and on success do lines below
    this.user.firstName = this.tempUser.firstName;
    this.user.secondName = this.tempUser.secondName;
    this.user.email = this.tempUser.email;
    this.user.active = this.tempUser.active;
    this.user.avatar = this.tempUser.avatar;
    alertify.success("User has been changed");

  }

  reset(){
    this.tempUser = Object.assign({}, this.user);
  }

}
