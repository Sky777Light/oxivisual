import {ViewChild,Component,OnChanges,Input} from '@angular/core';
import { NgForm} from '@angular/forms';
import {UserService,AuthService,ProjectService} from "../../../../../services/services";
import * as ENTITY from "../../../../../entities/entities";
import {WebglView} from "../../../../../directives/directives";

declare var alertify:any;

@Component({
    selector: 'app-project-edit-view',
    templateUrl: './edit.view.html',
    styleUrls: ['./edit.view.sass']
})

export class EditView {

    @Input() modelStructure:any;

    pattrns:any;
    constructor(){
        this.pattrns={
            URL: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
        };
    }

}