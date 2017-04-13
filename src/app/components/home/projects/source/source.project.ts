import {Component} from '@angular/core';
import { NgForm} from '@angular/forms';
import {AbstractTemplateProject} from "../template/temp.view.project";
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../../../services/user.service";
import * as ENTITY from "../../../../entities/entities";

declare var alertify:any;

@Component({
    selector: 'app-projects-source',
    templateUrl: './source.project.html',
    styleUrls: ['./source.project.sass']
})
export class SourceProject extends AbstractTemplateProject {

    constructor(protected route:ActivatedRoute, protected userService:UserService) {
        super(route, userService);

    }
    ngOnInit(){
        super.ngOnInit();
        if (!(this.project.model instanceof  ENTITY.ProjectModel)) {
            this.project.model = new ENTITY.ProjectModel(this.project.model);
        }
    }
    create(form: NgForm){

        if(form.invalid)return alert('Please fill all inputs correctly');

        //let form = new FormData(),
        //    fileReader = new FileReader();
        //form.append('name',this.project.model.name);
        //
        //fileReader.onload((e)=>{
        //    form.append('model',this.project.model.name);
        //});
        //fileReader.readAsArrayBuffer( document.querySelector('input[accept=".obj"]').files[0]);

    }
    cancel(){

    }

}