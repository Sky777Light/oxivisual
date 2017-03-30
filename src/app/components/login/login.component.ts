import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Resol} from "../../interfaces/resol.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  private remember: boolean = false;
  private resol: Resol = {
    firstName: false,
    secondName: false,
    email: true,
    pass: true,
    passRep: false
  };
  private user: any = {
    username: '',
    password: ''
  };

  
  constructor(
      private userService: UserService
  ) { }

  checkResol(){
    this.resol.email = this.user.username ? true : false;
    this.resol.pass = this.user.password ? true : false;
    return this.resol.email && this.resol.pass;
  }
  
  logIn(){
    if(!this.checkResol()) return false;

    this.userService.logIn(this.remember, this.user);
  }
  
}
