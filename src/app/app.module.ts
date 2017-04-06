import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import {routing} from "./router";

import {AuthService} from "./services/auth.service";
import {StorageService} from "./services/storage.service";
import {UserService} from "./services/user.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoggedGuardService} from "./services/logged-guard.service";
import {ShareService} from "./services/share.service";

import { AppComponent } from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AsideComponent} from "./components/home/aside/aside.component";
import {UsersComponent} from "./components/home/users/users.component";

import {SortPipe} from "./pipes/sort.pipe";
import {NamePipe} from "./pipes/name.pipe";
import {SlimScroll} from './directives/slimscroll.directive';
import {ProjectsComponent} from "./components/home/projects/projects.component";
import {HeaderComponent} from "./components/home/header/header.component";
import {UserCardComponent} from "./components/home/users/user-card/user-card.component";
import {NewUserComponent} from "./components/home/users/new-user/new-user.component";
import {NewProjectComponent} from "./components/home/projects/new-project/new-project.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    HomeComponent,
    AsideComponent,
    HeaderComponent,
    UsersComponent,
    SortPipe,
    NamePipe,
    UserCardComponent,
    SlimScroll,
    NewUserComponent,
    NewProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    routing
  ],
  providers: [
    AuthService,
    StorageService,
    AuthGuardService,
    LoggedGuardService,
    UserService,
    ShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
