import { Component } from '@angular/core';
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  
  private header: any = {
    title: 'Users',
    length: 0
  };
  private searchName: string;
  private sortType: string = 'A-Z';

  private users: User[] = [
    {
      email: 'asd',
      firstName: 'first',
      secondName: 'first',
      avatar: 'asd',
      status: 1,
      active: true
    },
    {
      email: 'asd',
      firstName: 'second',
      secondName: 'second',
      avatar: 'asd',
      status: 1,
      active: true
    },
    {
      email: 'asd',
      firstName: 'third',
      secondName: 'third',
      avatar: 'asd',
      status: 1,
      active: true,
      newUser: true
    }
  ];
  private settingsUser: User;

  constructor() { }


  deactivateUser(user: any){
    // not any ===> User
    // send to db changed user
    user.active = !user.active;
  }


}
