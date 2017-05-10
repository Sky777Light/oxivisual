import {Component,Input,ViewChild,OnInit} from '@angular/core';

@Component({
    selector: 'app-file-upload',
    template: '<input type="file" accept="{{accept}}"   [(ngModel)]="filesModel" #filesModels="ngModel" class="hidden" #fileUpload>' +
    ' <label [class.full-op]="filesModels.invalid"  [hidden] = "filesModels.valid">{{title}} is required</label> ' +
    '<div #btnFile class="btn-def">{{title}}</div>  <div class="list-files" [innerHTML]="files.toString()"></div>',
    styleUrls: ['./upload.file.sass']
})
export class UploadFile implements OnInit {
    @Input() accept:string = '';
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
            this.files = [];

            for (let i = 0; i < files.length; i++) {
                if (files[i].name.match(this.accept) || files[i].type.match(this.accept))this.files.push(files[i]);
            }

            if (!this.files.length || !this.inject || !this.inject.onFilesSelected)return;

            console.log(this.inject);
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

    OnInit() {

    }
}