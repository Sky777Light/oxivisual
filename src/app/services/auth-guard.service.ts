import { Injectable }     from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve}  from '@angular/router';

import {Observable} from "rxjs/Rx";

import {StorageService} from "./storage.service";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";

@Injectable()
export class AuthGuardService implements CanActivate,  Resolve<any> {

  constructor(
      private router: Router,
      private storageService: StorageService,
      private authService: AuthService,
      private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if (this.storageService.get("token") ||  this.storageService.tempToken) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.authService.get('/api/users').map((res: any) => {
      res = res.json();
      if(res.status) {
        this.userService.setUser(res.res);
        return res.res;
      }
      this.userService.logOut();
      return false;
    });
  }

}