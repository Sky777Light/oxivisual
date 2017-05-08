import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Resol} from "../../interfaces/resol.interface";
import * as USER from "../../interfaces/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  private remember: boolean = true;
  private message: string = '';
  private resol: Resol = {
    email: true,
    password: true
  };
  private user = new USER.User();
  
  constructor(
      private userService: UserService
  ) { }
  
  logIn(){
    if(!this.userService.resolUser(this.resol, this.user)) return false;

    this.userService.logIn(this.remember, this.user, (message: string) => {
      this.message = message;
    });
  }

  keyDown($event){
    if($event.keyCode == 13) {
      this.logIn();
    }
  }

}
