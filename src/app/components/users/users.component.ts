import {Component} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {Subscription} from "rxjs/Rx";
import {ShareService} from "../../services/share.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

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
    arrLength: 0
  };
  private searchName: string;
  private sortType: string = 'A-Z';

//data work with user-card
  private selectedUser: User;
  private canEdit: boolean = false;

//show user settings popup in list
  private settingsUser: User;

//create new user
  private createNewUser: boolean = false;
  private subNewUser:Subscription;


  constructor(
      private shareService: ShareService,
      private userService: UserService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.User = this.userService.getUser();

    this.subNewUser = this.shareService.shareListener.subscribe((user: User) => {
      if(user != undefined){
        this.createNewUser = false;
        if(user.newUser){
          this.authService.post('/api/users/user', user).subscribe((res: any) => {
            res = res.json();
            if(res.status) {
              this.User.users.push(res.res);
            }
            alertify.success(res.message);
          }, (error) => {});
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
  };

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
