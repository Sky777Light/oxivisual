import {Component,Input,ViewChild,OnInit} from '@angular/core';
import * as ENTITY from '../../entities/entities';

@Component({
    selector: 'app-file-upload',
    template: '<input type="file" accept="{{accept}}"   [(ngModel)]="filesModel" #filesModels="ngModel" class="hidden" #fileUpload>' +
    ' <label [class.full-op]="filesModels.invalid"  [hidden] = "filesModels.valid">{{title}} is required</label> ' +
    '<div #btnFile class="btn-def">{{title}}</div>  <div class="list-files" *ngIf="files" [innerHTML]="files.toString()"></div>',
    styleUrls: ['./upload.file.sass']
})
export class UploadFile implements OnInit {
    @Input() accept:string = '';
    @Input() category:any;
    @Input() multiple:string;
    @Input() required:string;
    @Input() title:string;
    @Input() inject:any;
    @Input() files:Array<any>;
    @ViewChild("fileUpload")
        fileUpload:HTMLElement;
    @ViewChild("btnFile")
        btnFile:HTMLElement;
    abstract:any;
    filesModel:any;

    constructor() {

    }

    ngOnInit() {
        let fileTag =  this.fileUpload['nativeElement'];

        fileTag.addEventListener('change', (e)=> {
            let files = e.target.files;
            if(!files.length)return;
            this.files = [];

            for (let i = 0; i < files.length; i++) {
                if(this.category) {
                    if(this.category instanceof Array){
                        let _fType = files[i].name.split(".");
                        _fType = _fType[_fType.length-1];
                        files[i].category = this.category = ENTITY.Config.FILE.STORAGE.SVG_FILE.match(_fType)?ENTITY.Config.FILE.TYPE.MODEL_SVG:ENTITY.Config.FILE.TYPE.MODEL_OBJ;

                    }else{
                        files[i].category = this.category;
                    }

                }

                let _multiaC = this.accept.split(",");
                if(_multiaC.length > 1){
                    _multiaC.forEach((e)=>{
                        if (files[i].name.match(e) || files[i].type.match(e))this.files.push(files[i]);
                    });
                }else{
                    if (files[i].name.match(this.accept) || files[i].type.match(this.accept))this.files.push(files[i]);
                }
            }

            if (!this.files.length || !this.inject || !this.inject.onFilesSelected)return;

            this.inject.onFilesSelected(this.files);

        });

        this.btnFile['nativeElement'].addEventListener('click', (e)=> {
            fileTag.click();
        });

        if(this.multiple) fileTag.setAttribute('multiple','');
        if(this.required) {
            fileTag.setAttribute('name','fileTag'+Math.random());
            fileTag.setAttribute('required',true);
        }

    }
}