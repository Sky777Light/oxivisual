import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { CodemirrorModule } from 'ng2-codemirror';
import {DynamicComponentModule} from 'angular2-dynamic-component/index';


import {routing} from "./router";

import {AuthService} from "./services/auth.service";
import {StorageService} from "./services/storage.service";
import {UserService} from "./services/user.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoggedGuardService} from "./services/logged-guard.service";
import {ShareService} from "./services/share.service";

import {NamePipe} from "./pipes/name.pipe";

import { AppComponent } from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AsideComponent} from "./components/home/aside/aside.component";
import {UsersComponent} from "./components/home/users/users.component";
import {ProjectsComponent} from "./components/home/projects/projects.component";
import {HeaderComponent} from "./components/home/header/header.component";
import {UserCardComponent} from "./components/home/users/user-card/user-card.component";
import {NewUserComponent} from "./components/home/users/new-user/new-user.component";
import {NewProjectComponent} from "./components/home/projects/new-project/new-project.component";
import {ViewProject} from "./components/home/projects/view/view.project";
import {EditProject} from "./components/home/projects/edit/edit.project";
//import {AbstractTemplateProject} from "./components/home/projects/template/temp.view.project";
import {ProjectComponent} from "./components/home/project/project.component";
import {SourceProject} from "./components/home/project/source/source.project";
import {BasicProject} from "./components/home/project/basic/basic.project";
import {Costumization,TextAr} from "./components/home/project/costumization/costumization";
import {PreviewProject} from "./components/home/project/preview/preview";
import {ProjectService} from "./services/project.service";
import {WebglView,WTooltip,WControls,WebGLService,UploadFile,MNode,MTree,SlimScroll,Preloader,TemplatesLoader,HtmlDirective} from "./directives/directives";
import {EditView} from "./components/home/project/source/edit.view/edit.view";
import {PreviewSceneComponent,PreviewSceneService} from "./components/preview/preview.project";

declare var webpack:any;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    HomeComponent,
    AsideComponent,
    HeaderComponent,
    UsersComponent,
    NamePipe,
    UserCardComponent,
    SlimScroll,
    NewUserComponent,
    UploadFile,
    EditProject,
    EditView,
    WebglView,
    WControls,
    WTooltip,
    TextAr,
    PreviewSceneComponent,
    PreviewProject,
    Costumization,
    Preloader,
    HtmlDirective,
    TemplatesLoader,
    //AbstractTemplateProject,

    NewProjectComponent,
    MTree,
    MNode,
    ViewProject,
    SourceProject,
    BasicProject,
    ProjectComponent

  ],
  imports: [
    CodemirrorModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    DynamicComponentModule,
    routing
  ],
  providers: [
    AuthService,
    StorageService,
    AuthGuardService,
    LoggedGuardService,
    UserService,
    ShareService,
    WebGLService,
    PreviewSceneService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
