import {Component, Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import * as USER from "../../../../interfaces/user.interface";
import {Resol} from "../../../../interfaces/resol.interface";
import {UserService} from "../../../../services/user.service";
import {AuthService} from "../../../../services/auth.service";

declare var alertify: any;

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass']
})
export class UserCardComponent {

  @Input() canEdit;
  @Input() user;
  @Output() userChange = new EventEmitter();

  private resol: Resol = {
    firstName: true,
    secondName: true,
    email: true
  };
  private message: string = '';

  private User: USER.IUser;
  private tempUser = new USER.User();
  
  //popup menu
  private openMenu: boolean = false;

  constructor(
      private userService: UserService,
      private authService: AuthService
  ) { }

  ngOnInit(){
    this.User = this.userService.getUser();
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    if(changes['user'] && changes['user'].currentValue){
      let user = changes['user'].currentValue;
      this.switchUser(user);
    }
  }

  switchUser(user: any){
    this.authService.get('/api/users/user/' + user._id).subscribe((res: any) => {
      res = res.json();
        if(res.status) {
          user.users = res.res.users;
          user.projects = res.res.projects;
        }
      this.tempUser = Object.assign({}, user);
    }, (error) => {});
  }

//photo change
  loadPhoto($event){
    let fr = new FileReader();
    try{
      fr[ 'readAsDataURL' ]( $event.target.files[0] );
      fr.onload = ()=>{
        this.tempUser.avatar = fr.result;
      };
    } catch( err ){
      console.log('load photo err: ',err);
    }
  }

  removePhoto(){
    this.tempUser.avatar = '';
  }

//popup functions
  deactivate(){
    this.tempUser.active = !this.tempUser.active;
    this.authService.put('/api/users/user', this.tempUser).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        this.user.active = this.tempUser.active;
      }
      alertify.success(res.message);
    }, (error) => {});
  }

  delete(){
    this.authService.delete('/api/users/user', this.user).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        let idx = this.User.users.indexOf(this.user);
        this.User.users.splice(idx, 1);
        this.userChange.emit(null);
      }
      alertify.success(res.message);
    }, (error) => {});
  }

//change user
  changeUser(){
    if(!this.userService.resolUser(this.resol, this.tempUser)) return false;

    this.authService.put('/api/users/user', this.tempUser).subscribe((res: any) => {
      res = res.json();
      if(res.status) {
        this.user.firstName = this.tempUser.firstName;
        this.user.secondName = this.tempUser.secondName;
        this.user.email = this.tempUser.email;
        this.user.active = this.tempUser.active;
        this.user.avatar = res.res.avatar;
      } else {
        if(res.email)
          this.message = res.message;
      }
      
      alertify.success(res.message);
    }, (error) => {});

  }

  reset(){
    this.tempUser = Object.assign({}, this.user);
  }


}
