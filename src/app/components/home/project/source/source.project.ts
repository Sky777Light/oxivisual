import {ViewChild,Component,OnChanges,AfterViewInit} from '@angular/core';
import { NgForm} from '@angular/forms';
//import {AbstractTemplateProject} from "../template/temp.view.project";
import { ActivatedRoute } from '@angular/router';
import {UserService,AuthService,ProjectService} from "../../../../services/services";
import * as ENTITY from "../../../../entities/entities";
import {MTree} from "../../../../directives/tree";

declare var alertify:any;

@Component({
    selector: 'app-projects-source',
    templateUrl: './source.project.html',
    styleUrls: ['./source.project.sass']
})
export class SourceProject implements AfterViewInit,OnChanges{
    private project:ENTITY.IProject;
    selectedChild:ENTITY.ModelStructure;
    tempNewChild:ENTITY.ModelStructure;
    editview:boolean=false;

    @ViewChild("modelObj")
        modelObj:HTMLElement;
    @ViewChild("framesObj")
        framesObj:HTMLElement;

    constructor(private projectService:ProjectService, private authService:AuthService) {}

    ngOnChanges(changes) {
        console.log(changes);
    }
    ngAfterViewInit() {
        setTimeout(()=>{this.editview = true;},200);
    }
    ngOnInit() {
        this.project = this.projectService.getProject();
        this.tempNewChild = new ENTITY.ModelStructure();
        setTimeout(()=>{
            if(this.project.model.data)this.select(this.project.model.data[0]);
        },200);
        console.log(this);
    }


    create(form:NgForm) {

        if (form.invalid)return alertify.error('Please fill all inputs correctly');

        let myForm = new FormData(),
            fileReader = new FileReader(),
            filesUpload = [{a: this.modelObj, n: 'model[]'}, {a: this.framesObj, n: 'frames[]'}];
        myForm.append('name', this.project.model.name);
        myForm.append('id_project', this.project._id);

        for (let f = 0; f < filesUpload.length; f++) {
            let types = filesUpload[f];
            if (!types.a['files'] || !types.a['files'].length) return alertify.error('Please upload all files');
            for (var i = 0; i < types.a['files'].length; i++) {
                var file = types.a['files'][i];
                myForm.append(types.n, file, file.name);
            }
        }

        this.authService.post("/api/projects/project/model/create", myForm).subscribe((res:any) => {
            res = res.json();
            if (res.status) {
                this.project.model.link = res.model.link;
                this.project.model.data = [new ENTITY.ModelStructure(res.model.data)];
                this.select(this.project.model.data[0]);
                alertify.success(res.message);
            } else {
                alertify.error(res.message);
            }

        }, (error) => {
        });
    }

    createChild(form:NgForm){

    }

    select(child:any){
        this.selectedChild = child;
    }
}
export class ProjTabs{

    private source:SourceProject;
    private classes:Array<string>;
    constructor(source:SourceProject){
        this.source = source;
        this.classes = ['hide'];
    }
    toggle(elem:any){
        elem.className = elem.className.match(this.classes[0])? elem.className.replace(this.classes[0],''):elem.className+" "+this.classes[0];
    }
}
