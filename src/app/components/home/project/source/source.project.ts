import {ViewChild,Component,OnChanges,AfterViewInit,Output,EventEmitter} from '@angular/core';
import { NgForm} from '@angular/forms';
//import {AbstractTemplateProject} from "../template/temp.view.project";
import { ActivatedRoute } from '@angular/router';
import {UserService,AuthService,ProjectService} from "../../../../services/services";
import * as ENTITY from "../../../../entities/entities";
import {MTree} from "../../../../directives/tree/tree";

declare var alertify:any;

@Component({
    selector: 'app-projects-source',
    templateUrl: './source.project.html',
    styleUrls: ['./source.project.sass']
})
export class SourceProject   {
    public instance:SourceProject;
    private project:any;
    selectedChild:any;
    _CONFIG:any;
    tempNewChild:ENTITY.ModelStructure;
    uploadChild:any ;
    editview:boolean = false;

    @ViewChild("modelObj")
        modelObj:HTMLElement;
    @ViewChild("framesObj")
        framesObj:HTMLElement;

    constructor(private projectService:ProjectService, private authService:AuthService) {
        this.instance = this;
        this._CONFIG = ENTITY.Config;
    }

    ngOnChanges(changes) {
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.project = this.projectService.getProject();
        //this.tempNewChild = new ENTITY.ModelStructure();
        this.project.select=(p)=>{
            if (p.data)this.select(p.data[0]);
            delete this.project['select'];
        }
        if(this.project.model && this.project.model.data && this.project.model.data.length)this.project.select(this.project.model);
    }

    create(form:NgForm) {

        if (form.invalid)return alertify.error('Please fill all inputs correctly');

        let myForm = new FormData(),
            fileReader = new FileReader(),
            filesUpload = [{a: this.modelObj, n: ENTITY.Config.FILE.STORAGE.MODEL_OBJ }, {a: this.framesObj, n: ENTITY.Config.FILE.STORAGE.PREVIEW_IMG }];
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
            let _form =  new FormData();
            _form.append('dir',ENTITY.Config.FILE.DIR.DELIMETER);
            _form.append('_id',self.project._id);
            _form.append(ENTITY.Config.FILE.STORAGE.SITE_STRUCTURE,new Blob([JSON.stringify([data.clone()])],{type:'text/json'}));

            self.authService.post("/api/projects/project/model/update", _form).subscribe((res:any) => {
                res = res.json();
                if (res.status) {
                    alertify.success(res.message);
                }else{
                    alertify.error(res.message);
                }
            });
        },data.projFilesDirname);
    }

    private uploadStructure(area:any,callback,dirStartFrom){
        let _self = this,
            siteStructure=[];

        if(area){
            let _form =  new FormData(),
                filesUpload = [
                    {a: area.destination, n: ENTITY.Config.FILE.STORAGE.MODEL_OBJ },
                    {a: area.alignImages, n: ENTITY.Config.FILE.STORAGE.ALIGN_IMG },
                    {a: area.images, n: ENTITY.Config.FILE.STORAGE.PREVIEW_IMG }
                ];
            _form.append('dir',dirStartFrom);
            _form.append('destination',area.destination);
            _form.append('_id',this.project._id);

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
                    area.projFilesDirname = dirStartFrom;
                    area.hasChanges = false;
                    if(area.destination instanceof Array)area.destination = area.destination[0].name;

                    ['alignImages','images'].forEach((field)=>{
                        for (let f = 0; area[field] && f < area[field].length; f++) {
                            if(area[field][f] instanceof ENTITY.ProjFile || area[field][f].file )area[field][f]= area[field][f].name;
                        }
                    });
                } else {
                    alertify.error(res.message);
                }

                if(area.areas){
                    var startAt =0,
                        uploadChild =  function(_ar){
                            if(!_ar)return callback();
                            _self.uploadStructure(_ar,function(res){
                                uploadChild(area.areas[startAt++]);
                            }, _ar.projFilesDirname || (dirStartFrom +ENTITY.Config.FILE.DIR.DELIMETER+ _ar._id))
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
        if(this.selectedChild && this.selectedChild._id == child._id)return;
        if (this.selectedChild ){
            this.selectedChild._selected = !this.selectedChild._selected;
            if(this.selectedChild.glApp)this.selectedChild.glApp = null;
        }
        this.selectedChild = child;
        child.sourcesApp = this;
        child.canEdit = true;
        child._selected = !child._selected;
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
