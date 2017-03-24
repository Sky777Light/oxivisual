import { Component } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass']
})
export class AsideComponent {

  private user: any;

  constructor(
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute
  ) {
    route.data.subscribe((data: any) => {
      this.user = data.user;
    });
  }


  logOut(){
    this.userService.logOut();
  }

}
