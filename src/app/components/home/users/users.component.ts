import {Component} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {User} from "../../../interfaces/user.interface";
import {ShareService} from "../../../services/share.service";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

declare var alertify: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {

  private User: User;

//data work with header
  private header: any = {
    title: 'Users',
    arrLength: 0,
    searchName: '',
    sortType: 'A-Z'
  };

//data work with user-card
  private selectedUser: User;
  private canEdit: boolean = false;

//show user settings popup in list
  private settingsUser: User;

//create new user
  private createNewUser: boolean = false;
  private subNewUser:Subscription;
  private message: any = {
    email: '',
    password: ''
  };


  constructor(
      private shareService: ShareService,
      private userService: UserService,
      private authService: AuthService
  ) {
    this.User = this.userService.getUser();
  }

  ngOnInit() {
    this.shareService.changeHeaderSubject(this.header);

    this.subNewUser = this.shareService.shareListener.subscribe((user: any) => {
      if(user != undefined){
        if(user.newUser){
          this.authService.post('/api/users/user', user).subscribe((res: any) => {
            res = res.json();
            if(res.status) {
              this.User.users.push(res.res);
              this.createNewUser = false;
            }else{
              if(res.email)
                this.message.email = res.message;
            }
            alertify.success(res.message);
          }, (error) => {});
        } else {
          this.createNewUser = false;
        }
      }
    })
  }
  ngOnDestroy() {
    this.subNewUser.unsubscribe();
  }

//pop-up functions

  deactivateUser(user: any){
    let temp = Object.assign({}, user);
    temp.active = !temp.active;
    this.authService.put('/api/users/user', temp).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        user.active = !user.active;
      }
      alertify.success(res.message);
    }, (error) => {});
  }

  deleteUser(user: any){
    this.authService.delete('/api/users/user', user).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        let idx = this.User.users.indexOf(user);
        this.User.users.splice(idx, 1);
      }
      alertify.success(res.message);
    }, (error) => {});
  }

// change user card
  selectUser(user: User, edit: boolean){
    if(this.selectedUser === user) {
      if(edit){
        this.canEdit = edit;
      }
      return;
    }
    this.canEdit = edit;
    this.selectedUser = user;
  }


}
