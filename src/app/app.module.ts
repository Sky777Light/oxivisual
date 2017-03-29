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

import { AppComponent } from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {HomeComponent} from "./components/home/home.component";
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import {UsersComponent} from "./components/users/users.component";
import { UserCardComponent } from './components/user-card/user-card.component';

import {SortPipe} from "./pipes/sort.pipe";
import {NamePipe} from "./pipes/name.pipe";
import {SlimScroll} from './directives/slimscroll.directive';


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
    SlimScroll
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
