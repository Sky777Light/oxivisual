import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {LoggedGuardService} from "./services/logged-guard.service";
import {AuthGuardService} from "./services/auth-guard.service";

import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ProjectsComponent} from "./components/home/projects/projects.component";
import {UsersComponent} from "./components/home/users/users.component";
import {ProjectComponent} from "./components/home/project/project.component";
import {BasicProject} from "./components/home/project/basic/basic.project";
import {SourceProject} from "./components/home/project/source/source.project";

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService],
        resolve: {
            user: AuthGuardService
        },
        children: [
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'project/:id',
                component: ProjectComponent,
                children:[
                    {
                        path: '',
                        redirectTo: 'source',
                        pathMatch: 'full'
                    },
                    {
                        path: 'basic',
                        component: BasicProject
                    },
                    {
                        path: 'source',
                        component: SourceProject
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        component:  LoginComponent,
        canActivate: [LoggedGuardService]
    },
    {
        path:"**",
        redirectTo:'/users'
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);