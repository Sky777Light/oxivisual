import { Component ,ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Resol} from "../../interfaces/resol.interface";
import * as USER from "../../interfaces/user.interface";
import * as ENTITY from "../../entities/entities";

declare var alertify:any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent {

    private remember:boolean = true;
    private submitted:boolean = false;
    private message:string = '';
    private config:any;
    private resol:Resol = {
        email: true,
        password: true
    };
    private user = new USER.User();

    constructor(private userService:UserService) {
        this.config = ENTITY.Config;
    }

    logIn(invalid) {
        this.submitted = true;
        if (invalid) return alertify.error('please fill all inputs correctlly');

        this.userService.logIn(this.remember, this.user, (message:string) => {
            this.message = message;
        });
    }

    keyDown($event, invalid) {
        if ($event.keyCode == 13) {
            this.logIn(invalid);
        }
    }

}
