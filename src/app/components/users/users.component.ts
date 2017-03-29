import {Component} from '@angular/core';
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  
  private header: any = {
    title: 'Users',
    arrLength: 0
  };
  private searchName: string;
  private sortType: string = 'A-Z';

  private settingsUser: User;
  private selectedUser: User;
  private canEdit: boolean = false;

  private users: User[] = [
    {
      email: 'asd',
      firstName: 'first',
      secondName: 'first',
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
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
      avatar: 'asd',
      status: 'client-user',
      created: '15.02.2017',
      projects: [],
      users: [],
      active: true,
      newUser: true
    }
  ];

  constructor() { }

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

  selectUser(user: User, edit: boolean){
    if(this.selectedUser === user) return;
    this.canEdit = edit;
    this.selectedUser = user;
  }


}
