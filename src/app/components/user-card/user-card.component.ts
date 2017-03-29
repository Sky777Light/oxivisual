import {Component, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../interfaces/user";

declare var alertify: any;

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass']
})
export class UserCardComponent {

  @Input() edited;
  @Input() user;

  private tempUser: User;
  private openMenu: boolean = false;

  constructor() { }

  ngOnChanges(changes: any) {
    if(changes.user){
      this.tempUser = Object.assign({}, changes.user.currentValue);
    }
  }


  changeUser(){
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
