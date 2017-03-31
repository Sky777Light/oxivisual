import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Resol} from "../../interfaces/resol.interface";
import {User} from "../../interfaces/user.interface";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  private remember: boolean = false;
  private resol: Resol = {
    email: true,
    password: true
  };
  private user: User = {
    email: '',
    password: ''
  };

  private logData: any = {
    email: 'superuser',
    password: 'superpass',
    firstName: 'Superuser',
    secondName: 'Superuser',
    avatar: ''
  };
  
  constructor(
      private userService: UserService,
      private authService: AuthService
  ) { }
  
  logIn(){
    if(!this.userService.resolUser(this.resol, this.user)) return false;

    if((this.user.email === this.logData.email) && (this.user.password === this.logData.password)){
      this.createSuper();
      return;
    }

    this.userService.logIn(this.remember, this.user);
  }


  createSuper(){
    this.authService.post('/auth/superuser', this.logData).subscribe((response: any) => {
      let res = JSON.parse(response._body);
      if(res.status) {
        this.userService.logIn(this.remember, { email: this.logData.email, password: this.logData.password });
      }
    }, (error) => {});
  }

}
