import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {UserLog} from "../interfaces/user-log.interface";

@Injectable()
export class UserService {

  private User: any;

  constructor(
      private storageService: StorageService,
      private authService: AuthService,
      private router: Router
  ) {}

  logIn(remember: boolean, user: UserLog): void {
    this.authService.post('/auth/login', user).subscribe((response: any) => {
      let res = JSON.parse(response._body);
      if(res.status) {
        remember ? this.storageService.set('token', res.token) : this.storageService.tempToken = res.token;
        this.router.navigate(['/']);
      }
    }, (error) => {});
  }

  logOut(): void {
    this.storageService.remove('token');
    this.storageService.tempToken = null;
    this.authService.post('/auth/logout', {}).subscribe((response: any) => {
      let res = JSON.parse(response._body);
      if(res.status) {
        this.User = {};
      }
      this.router.navigate(['/login']);
    }, (error) => {});
  }
  
  setUser(user: any): void {
    this.User = user;
  }

  getUser(){
    return Object.assign({}, this.User);
  }
  

}
