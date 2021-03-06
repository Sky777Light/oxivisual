import { Component,OnInit,Input,AfterViewChecked } from '@angular/core';
import * as ENTITY from '../../entities/entities';
import {AuthService} from '../../services/auth.service';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';


declare var alertify:any;

@Component({
    selector: 'app-template-loader',
    template: '<p></p>'
})
export class TemplatesLoader implements OnInit  {
    @Input() model:any;
    @Input() templateType:any;
    cssUrl:any;
    htmlTemplate:any;
    callbacks:Array<Function>=[];
    private cssElement:any;

    constructor(private authService:AuthService ){
        let
            cssId = ('cssInject'+ENTITY.Config.randomInteger()),
            cssEl = document.getElementById(cssId);
        if (!cssEl) {
            cssEl = document.createElement('style');
            cssEl.id = cssId;
            cssEl.setAttribute('type', 'text/css');
            document.head.appendChild(cssEl);
        }
        this.cssElement = cssEl;
    }

    ngOnInit() {
        let model = this.model,
            _DIR = ENTITY.Config.FILE.DIR;


        if(!model || isNaN(this.templateType) )return  ;

        let
            fileType = /*this.templateType ==_DIR.PROJECT_TEMPLATE._TYPE.TOOLTIP?_DIR.PROJECT_TEMPLATE.JS:*/_DIR.PROJECT_TEMPLATE.HTML,
            _template = _DIR.PROJECT_TEMPLATE.NAME + _DIR.PROJECT_TEMPLATE.TYPES[this.templateType],
            htmlUrl = _template + fileType,
            cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;

        if (model.templates.indexOf(this.templateType) > -1 && model.projFilesDirname) {
            _template = ENTITY.Config.PROJ_LOC + model.projFilesDirname + _DIR.DELIMETER + _template.replace('assets/','');
            let newT = '?time='+Date.now();
            htmlUrl = _template + fileType+newT;
            cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS+newT;
        }
        //this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cssUrl);
        for (let i = 0, arr = [{link:htmlUrl,_f:'htmlTemplate'},{link:cssUrl,_f:'cssUrl'}]; i < arr.length; i++) {
            this.authService.get(arr[i].link).subscribe((res:any)=> {
               this[arr[i]._f] = res._body;
                if(arr[i]._f==arr[1]._f)this.updateCss( res._body);
                if(this[arr[0]._f] && this[arr[1]._f] ){
                    for (let i = 0; i < this.callbacks.length; i++) {
                        this.callbacks.shift()();
                    }
                }
            });
        }
    }
    updateCss(value){
        if(value) this.cssElement.innerText = value;
    }
    ngOnDestroy(){
        this.cssElement.parentNode.removeChild(this.cssElement);
    }


}