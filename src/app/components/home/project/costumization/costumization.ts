import {ViewChild,Component,OnInit,OnChanges,AfterViewInit,Input,Output,EventEmitter} from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import {ProjectService,AuthService} from "../../../../services/services";
import {Config} from "../../../../entities/constant.data";
import * as ENTITY from "../../../../entities/entities";
import {WControls,Preloader} from "../../../../directives/directives";

declare var alertify:any;
declare var CodeMirror:any;

@Component({
    selector: 'app-project-costumization',
    templateUrl: './costumization.html',
    styleUrls: ['./costumization.sass']
})
export class Costumization implements OnInit,AfterViewInit {

    private menuList:any;
    private tabList:any;
    private project:any;
    private cssUrl:any;
    private curItem:any;
    private curNameSpace:Costumization;
    private curTemplate:string;
    @ViewChild("cssCode")
        cssCode:HTMLElement;
    @ViewChild("htmlCode")
        htmlCode:HTMLElement;
    @ViewChild("preloader")
        preloader:Preloader;
    @ViewChild("wcontrols")
        wcontrols:WControls;

    constructor(private projectService:ProjectService, private authService:AuthService, private sanitizer:DomSanitizer) {
        //let editor = CodeMirror.fromTextArea(myTextarea, {
        //    lineNumbers: true
        //});

        this.curNameSpace = this;
        this.menuList = [
            {title: 'Corporate style', active: true},
            {title: 'Tooltip'},
            {title: 'Pre-loader'}
        ];

        this.tabList = [];
        for (let i = 0; i < this.menuList.length; i++) {
            this.tabList.push(new CodeConfig(this).config);
        }
    }

    ngOnInit() {

        this.project = this.projectService.getProject();
        if (this.project.model && this.project.model.data && this.project.model.data.length) {
            this.loadTemplates();
        } else {
            this.project.select = (p)=> {
                this.loadTemplates();
                delete this.project['select'];
            }
        }


        //for(let i =0,arr:any=[this.cssCode,this.htmlCode];i<arr.length;i++){
        //    let editor = CodeMirror.fromTextArea(arr[i].nativeElement, {
        //        lineNumbers: true,keyMap:'sublime',mode:'css',value:'.tes {     width:10px; }',theme:'dracula'
        //    });
        //}

    }

    private loadTemplates() {
        let model = this.project.model,
            _DIR = ENTITY.Config.FILE.DIR;

        for (let u = 0, types = _DIR.PROJECT_TEMPLATE.TYPES; u < types.length; u++) {
            let _template = _DIR.PROJECT_TEMPLATE.NAME + _DIR.PROJECT_TEMPLATE.TYPES[u],
                htmlUrl = _template + _DIR.PROJECT_TEMPLATE.HTML,
                cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;
            if (model.data[0].templates.indexOf(u) > -1) {
                _template = ENTITY.Config.PROJ_LOC + model.link + _DIR.DELIMETER + _template.replace('assets/', '');
                htmlUrl = _template + _DIR.PROJECT_TEMPLATE.HTML;
                cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;
            }
            for (let i = 0, arr = [cssUrl, htmlUrl]; i < arr.length; i++) {
                this.authService.get(arr[i]).subscribe((res:any)=> {
                    this.tabList[u][i].value =   res._body;
                    setTimeout(()=>{
                        this.tabList[u][i].oninit();
                    });
                    setTimeout(()=>{
                        this.tabList[u][1].active = false
                    },111);

                    this.tabList[u].active = false;
                    if (u === 0 && i == 1) {
                        this.curItem = this.tabList[u];
                        this.curItem.active = true;
                    }
                });
            }
        }


    }

    ngAfterViewInit() {
        //for (let i = 0, arr = this.tabList; i < arr.length; i++) {
        //    arr[i][1].active = false;
        //}
    }

    /*  ngAfterViewChecked(){
     for (let i = 0, arr = this.tabList; i < arr.length; i++) {
     if(arr[i][1].active || arr[i][0].active){
     arr[i][0].oninit();
     arr[i][1].oninit();
     }
     }
     }*/

    codeChange() {
        if (this.curItem && this[this.curTemplate]) {
            this.curItem[0].value = (this.curItem[0].html.getValue());
            this.curItem[1].value = (this.curItem[1].html.getValue());
            this[this.curTemplate].tempLoad.updateCss(this.curItem[0].value);
        }
    }

    onLoadTemplate(template) {
        this.curTemplate = template;
        this.codeChange();
    }

    private saveChanges() {

        let self = this,
            model = this.project.model,
            data = model.data[0],
            _FILE = ENTITY.Config.FILE,
            _DIR = _FILE.DIR,
            _form = new FormData();

        _form.append('dir', ENTITY.Config.FILE.DIR.DELIMETER);
        _form.append('_id', self.project._id);

        for (let u = 0, types = [_FILE.STORAGE.CONTROLS, _FILE.STORAGE.TOOLTIP, _FILE.STORAGE.PRELOADER]; u < types.length; u++) {
            for (let i = 0, arr = this.tabList[u]; i < arr.length; i++) {
                _form.append(types[u], new File([new Blob([this.tabList[u][i].value], {type: 'text/*'})], i == 0 ? _DIR.PROJECT_TEMPLATE.CSS : _DIR.PROJECT_TEMPLATE.HTML));
            }
        }

        self.authService.post("/api/projects/project/template/update", _form).subscribe((res:any) => {
            res = res.json();
            if (res.status) {
                alertify.success(res.message);
            } else {
                alertify.error(res.message);
            }
        });
    }

    private selectCurItem(item, list, index) {
        for (let i = 0; i < list.length; i++) {
            list[i].active = false;
        }
        item.active = !item.active;
        if (!isNaN(index)) {
            this.curItem = this.tabList[index];
        }
    }
}


@Component({
    selector: 'app-project-text-code-mirror',
    template: '<textarea #txtarea (change)="change()" [innerText]="config.value"></textarea>'
})
export class TextAr implements OnInit,AfterViewInit {
    @Input() config:any;
    @ViewChild("txtarea")
        txtarea:HTMLElement;
    constructor(){

    }
    change(){
        console.log("change");
    }
    ngOnInit(){

    }
    ngAfterViewInit(){
        this.config.html = (this.txtarea['nativeElement']);
    }
}
class CodeConfig {
    config:Array<any>;

    constructor(cons:Costumization) {

        this.config = [
            {
                title: 'Css Code',
                active: true,
                oninit: function (elem) {
                    this.html = CodeMirror.fromTextArea(this.html, {
                        lineNumbers: true,
                        matchBrackets: true,
                        mode: 'css',
                        indentUnit: 4,
                        theme: 'ambiance'
                    });
                    this.html.on('change',()=>{
                        cons.codeChange();
                    });
                },
                config: {
                    autoFocus: true,
                    addModeClass: true,
                    language: 'css',
                    rtl: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: 'css',
                    indentUnit: 4,
                    theme: 'ambiance',
                    //mode: {name: 'javascript', json: true},
                    value: ''
                }
            },
            {
                title: 'HTML Code',
                active: true,
                oninit: function (e) {
                    this.html = CodeMirror.fromTextArea(this.html, {

                        lineNumbers: true,
                        matchBrackets: true,
                        mode: 'htmlmixed',
                        indentUnit: 4,
                        theme: 'ambiance',
                        autoFocus: true
                    });
                    this.html.on('change',()=>{
                        cons.codeChange();
                    });
                },
                config: {lineNumbers: true, theme: 'ambiance', mode: 'text/html', value: ''}
            }
        ];
        for (let i = 0; i < this.config.length; i++) {
            //this.config[i].id = 'codeMirror' + ENTITY.Config.randomInteger();
        }

    }

    private getAttr() {
        let html = document.createElement('textarea');
        html.className = 'cos-code';
        //html.setAttribute('[(ngModel)]',"mtab.config.value");
        return html;
    }
}