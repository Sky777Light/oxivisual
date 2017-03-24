import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserLog} from "../../interfaces/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  private remember: boolean = false;
  private user: UserLog = {
    username: '',
    password: '',
    nameResol: true,
    passResol: true
  };

  
  constructor(
      private userService: UserService
  ) { }

  checkResol(){
    this.user.nameResol = this.user.username ? true : false;
    this.user.passResol = this.user.password ? true : false;
    return this.user.nameResol && this.user.passResol;
  }
  
  logIn(){
    if(!this.checkResol()) return false;

    this.userService.logIn(this.remember, this.user);
  }
  
}
