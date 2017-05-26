import {ViewChild,Component,OnInit,OnChanges,AfterViewInit,Output,EventEmitter} from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import {ProjectService,AuthService} from "../../../../services/services";
import {Config} from "../../../../entities/constant.data";
import * as ENTITY from "../../../../entities/entities";

declare var alertify:any;
//declare var CodeMirror:any;

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
    private cssElement:any;
    @ViewChild("cssCode")
        cssCode:HTMLElement;
    @ViewChild("htmlCode")
        htmlCode:HTMLElement;

    constructor(private projectService:ProjectService, private authService:AuthService, private sanitizer:DomSanitizer) {
        //let editor = CodeMirror.fromTextArea(myTextarea, {
        //    lineNumbers: true
        //});
        let
            cssId = 'cssInject',
            cssEl = document.getElementById(cssId);
        if (!cssEl) {
            cssEl = document.createElement('style');
            cssEl.id = cssId;
            cssEl.setAttribute('type', 'text/css');
            document.head.appendChild(cssEl);
        }
        this.cssElement = cssEl;
        this.menuList = [
            {title: 'Corporate style', active: true },
            {title: 'Tooltip' },
            {title: 'Pre-loader' }
        ];
        this.tabList = [
            [
                {
                    title: 'Css Code',
                    active: true,
                    config: {
                        autoFocus: true,
                        addModeClass: true,
                        language: 'css',
                        rtl: true,
                        lineNumbers: true,
                        theme: 'ambiance',
                        mode: {name: 'javascript', json: true},
                        value: ''
                    }
                },
                {
                    title: 'HTML Code',
                    active: true,
                    config: {lineNumbers: true, theme: 'ambiance', mode: 'text/html', value: ''}
                }
            ],
            [
                {
                    title: 'Css Code',
                    active: true,
                    config: {
                        autoFocus: true,
                        addModeClass: true,
                        language: 'css',
                        rtl: true,
                        lineNumbers: true,
                        theme: 'ambiance',
                        mode: {name: 'javascript', json: true},
                        value: ''
                    }
                },
                {
                    title: 'HTML Code',
                    active: true,
                    config: {lineNumbers: true, theme: 'ambiance', mode: 'text/html', value: ''}
                }
            ],
            [
                {
                    title: 'Css Code',
                    active: true,
                    config: {
                        autoFocus: true,
                        addModeClass: true,
                        language: 'css',
                        rtl: true,
                        lineNumbers: true,
                        theme: 'ambiance',
                        mode: {name: 'javascript', json: true},
                        value: ''
                    }
                },
                {
                    title: 'HTML Code',
                    active: true,
                    config: {lineNumbers: true, theme: 'ambiance', mode: 'text/html', value: ''}
                }
            ]
        ];
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
                    this.tabList[u][i].config.value = res._body;
                });
            }
        }


    }

    ngAfterViewInit() {
        for (let i = 0, arr = this.tabList; i < arr.length; i++) {
            arr[i][1].active = false;
        }
    }

    private codeChange() {
       if(this.curItem) this.cssElement.innerText = this.curItem[0].config.value;
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

        for (let u = 0, types = [_FILE.STORAGE.CONTROLS, _FILE.STORAGE.TOOLTIP,_FILE.STORAGE.PRELOADER]; u < types.length; u++) {
            for (let i = 0, arr = this.tabList[u]; i < arr.length; i++) {
                _form.append(types[u], new File([new Blob([this.tabList[u][i].config.value], {type: 'text/*'})], i == 0 ? _DIR.PROJECT_TEMPLATE.CSS : _DIR.PROJECT_TEMPLATE.HTML));
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

    private selectCurItem(item, list,index) {
        for (let i = 0; i < list.length; i++) {
            list[i].active = false;
        }
        item.active = !item.active;
        if (!isNaN(index)) {
            this.curItem =  this.tabList[index];
            this.cssElement.innerText = this.curItem[0].config.value;
        }
    }
}