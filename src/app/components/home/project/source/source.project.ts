import {ViewChild,Component,OnChanges,AfterViewInit,Output,EventEmitter} from '@angular/core';
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
export class SourceProject implements AfterViewInit,OnChanges {
    public instance:SourceProject;
    private project:any;
    selectedChild:any;
    tempNewChild:ENTITY.ModelStructure;
    uploadChild:any ;
    editview:boolean = false;

    @ViewChild("modelObj")
        modelObj:HTMLElement;
    @ViewChild("framesObj")
        framesObj:HTMLElement;

    constructor(private projectService:ProjectService, private authService:AuthService) {
        this.instance = this;
    }

    ngOnChanges(changes) {
        console.log(changes);
    }

    ngAfterViewInit() {
        setTimeout(()=> {
            this.editview = true;
        }, 200);
    }

    ngOnInit() {
        this.project = this.projectService.getProject();
        this.tempNewChild = new ENTITY.ModelStructure();
        setTimeout(()=> {
            if (this.project.model.data) {
                this.select(this.project.model.data[0]);
            }

        }, 200);
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
    update(form:NgForm){
        if (form.invalid)return alertify.error('Please fill all inputs correctly');

        let data = this.project.model.data[0],
            self = this;
        this.uploadStructure(data,function(){
            console.log(data.clone());
            self.authService.post("/api/projects/project/model/update", {dir:data.projFilesDirname,structure:JSON.stringify([data.clone()])}).subscribe((res:any) => {
                console.log("finish update");
            });
        },data.projFilesDirname);
    }
    private uploadStructure(area,callback,dirStartFrom){
        let _self = this,
            siteStructure=[];

        if(area){
            let _form =  new FormData(),
                filesUpload = [{a: area.destination, n: 'model[]'}, {a: area.images, n: 'frames[]'}];
            _form.append('dir',dirStartFrom);

            for (let f = 0; f < filesUpload.length; f++) {
                let types = filesUpload[f];
                if (!(types.a instanceof Array)|| !types.a.length ) continue;
                for (var i = 0; i < types.a.length; i++) {
                    var file = types.a[i].file;
                    if(file instanceof File)_form.append(types.n, file, file.name);
                }
            }
            _self.authService.post("/api/projects/project/model/update", _form).subscribe((res:any) => {
                res = res.json();
                if (res.status) {
                    alertify.success(res.message);

                    area.projFilesDirname = dirStartFrom;
                    if(area.destination instanceof Array)area.destination = area.destination[0].name;
                    for (let f = 0; area.images && f < area.images.length; f++) {
                          if(area.images[f].file)area.images[f]= area.images[f].file.name;
                    }
                } else {
                    alertify.error(res.message);
                }

                if(area.areas){
                    var startAt =0,
                        uploadChild =  function(_ar){
                            if(!_ar)return callback();
                            _self.uploadStructure(_ar,function(res){
                                uploadChild(area.areas[startAt++]);
                            }, _ar.projFilesDirname || (dirStartFrom +"/"+ _ar.name))
                        };

                    uploadChild(area.areas[startAt++]);
                }else{
                    callback();
                }

            });
        }else{
            callback();
        }
    }


    select(child:any) {
        if (this.selectedChild && this.selectedChild.app)this.selectedChild.app = null;
        this.selectedChild = child;
        child._app = this;
    }
}
export class ProjTabs {

    private source:SourceProject;
    private classes:Array<string>;

    constructor(source:SourceProject) {
        this.source = source;
        this.classes = ['hide'];
    }

    toggle(elem:any) {
        elem.className = elem.className.match(this.classes[0]) ? elem.className.replace(this.classes[0], '') : elem.className + " " + this.classes[0];
    }
}
