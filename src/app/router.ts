import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {LoggedGuardService} from "./services/logged-guard.service";
import {AuthGuardService} from "./services/auth-guard.service";

import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ProjectsComponent} from "./components/home/projects/projects.component";
import {UsersComponent} from "./components/home/users/users.component";

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
                component: ProjectsComponent
            },
            {
                path: 'users',
                component: UsersComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedGuardService]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);