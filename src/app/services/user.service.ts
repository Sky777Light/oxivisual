import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Resol} from "../interfaces/resol.interface";
import {User} from "../interfaces/user.interface";

declare var alertify: any;

@Injectable()
export class UserService {

  private User: User = {
    _id: '',
    email: '',
    firstName: '',
    secondName: '',
    avatar: '',
    status: '',
    created: '',
    projects: [],
    users: [],
    active: true
  };

  constructor(
      private storageService: StorageService,
      private authService: AuthService,
      private router: Router
  ) {}

  logIn(remember: boolean, user: any): void {
    this.authService.post('/auth/login', user).subscribe((response: any) => {
      let res = JSON.parse(response._body);
      if(res.status) {
        remember ? this.storageService.set('token', res.token) : this.storageService.tempToken = res.token;
        this.router.navigate(['/']);
      }
      alertify.success(res.message);
    }, (error) => {});
  }

  logOut(): void {
    this.storageService.remove('token');
    this.storageService.tempToken = null;
    this.authService.post('/auth/logout', {}).subscribe((response: any) => {
      let res = JSON.parse(response._body);
      if(res.status) {
        this.User = null;
      }
      alertify.success(res.message);
      this.router.navigate(['/login']);
    }, (error) => {});
  }
  
  setUser(user: any): void {
    for(let i in this.User){
      if(user[i]){
        this.User[i] = user[i];
      }
    }
  }

  getUser(){
    return this.User;
  }

  resolUser(resol: Resol, user: User ){
    let resolFlag: boolean = true;
    for(let i in resol){
      resol[i] = user[i] ? true : false;
      if(!resol[i])
        resolFlag = false;
    }
    return resolFlag;
  }
  
}
