import { Component,OnInit,Input } from '@angular/core';
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

    constructor(private authService:AuthService, private sanitizer:DomSanitizer){}

    ngOnInit() {
        let model = this.model,
            _DIR = ENTITY.Config.FILE.DIR;

        if(!model  )return;
        let _template = _DIR.PROJECT_TEMPLATE.NAME + _DIR.PROJECT_TEMPLATE.TYPES[this.templateType],
            htmlUrl = _template + _DIR.PROJECT_TEMPLATE.HTML,
            cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;

        if (model.templates.indexOf(this.templateType) > -1) {
            _template = ENTITY.Config.PROJ_LOC + model.projFilesDirname + _DIR.DELIMETER + _template.replace('assets/','');
            let newT = '?time='+Date.now();
            htmlUrl = _template + _DIR.PROJECT_TEMPLATE.HTML+newT;
            cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS+newT;
        }

        this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cssUrl);
        this.authService.get(htmlUrl).subscribe((res:any)=> {
            this.htmlTemplate = res._body;
            for (let i = 0; i < this.callbacks.length; i++) {
                this.callbacks[i]();
            }
        });
    }
}