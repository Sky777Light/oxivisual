import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {LoggedGuardService} from "./services/logged-guard.service";
import {AuthGuardService} from "./services/auth-guard.service";

import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ProjectsComponent} from "./components/home/projects/projects.component";
import {UsersComponent} from "./components/home/users/users.component";

import {BasicProject} from "./components/home/projects/basic/basic.project";
import {SourceProject} from "./components/home/projects/source/source.project";

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/users',
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
                component: ProjectsComponent,
                children: [
                    ]
            },
            {
                path: 'projects/:id',
                redirectTo: '/projects/:id/basic',
                pathMatch: 'full'
            },
            {
                path: 'projects/:id',
                children:[
                    {
                        path: 'basic',
                        component: BasicProject
                    } ,{
                        path: 'source',
                        component: SourceProject
                    }
                ]
            },
            {
                path: 'users',
                component: UsersComponent
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
        redirectTo:'/'
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);