import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass']
})
export class AsideComponent {

  private User: any;
  private user: any;

  @Input() menu;
  @Output() menuChange = new EventEmitter();

  constructor(
      private userService: UserService,
      private route: ActivatedRoute
  ) {
    route.data.subscribe((data: any) => {
      this.User = data.user;
      if(!this.User || typeof this.User=="boolean")this.User = data.user = {};
      if(!data.user.projects)data.user.projects=[];
      if(!data.user.users)data.user.users=[];
      for(let i = 0; i < data.user.users.length; i++){
        if(data.user.users[i]._id == data.user._id ){
          this.user = data.user.users[i];
          break;
        }
      }
    });
  }

  closeMenu(){
    this.menu = 'out';
    this.menuChange.emit(this.menu);
  }

  logOut(){
    this.userService.logOut();
  }

}
