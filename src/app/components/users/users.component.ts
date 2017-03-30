import {Component, SimpleChange, SimpleChanges} from '@angular/core';
import {User} from "../../interfaces/user";
import {Subscription} from "rxjs/Rx";
import {ShareService} from "../../services/share.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
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

//users list
  private users: User[] = [
    {
      email: 'asd',
      firstName: 'first',
      secondName: 'first',
      avatar: './assets/img/1.jpg',
      status: 'client-admin',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'second',
      secondName: 'second',
      avatar: './assets/img/1.jpg',
      status: 'super-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: './assets/img/1.jpg',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    }
  ];

//create new user
  private createNewUser: boolean = false;
  private subNewUser:Subscription;


  constructor(
      private shareService: ShareService
  ) { }

  ngOnInit() {
    this.subNewUser = this.shareService.shareListener
        .subscribe((user: User) => {
          console.log(123);
          if(user){
            this.createNewUser = false;
          }
        })
  }
  ngOnDestroy() {
    this.subNewUser.unsubscribe();
  }



//pop-up functions

  deactivateUser(user: any){
    // not any ===> User
    // send to db changed user
    user.active = !user.active;
  }

  deleteUser(user: any){
    // not any ===> User
    // send to db changed user
    user.active = !user.active;
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
