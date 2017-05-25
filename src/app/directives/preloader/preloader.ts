import {Input,ViewChild,Component,OnInit} from '@angular/core';
import * as ENTITY from '../../entities/entities';
import {Location} from '@angular/common';
import {Confirm,Prompt} from '../dialogs/dialog';
import {AuthService} from '../../services/auth.service';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

declare var alertify:any;
declare var THREE:any;
declare var Pace:any;

@Component({
    selector: 'app-project-preloader',
    templateUrl: './preloader.html',
    styleUrls: ['./preloader.sass']
})
export class Preloader implements OnInit {

    @ViewChild("prevImg")
        prevImg:HTMLElement;
    @ViewChild("preloader")
        preloader:HTMLElement;

    @Input() preview:any;
    @Input() modelData:any;
    @Input() htmlUrl:any;
    @Input() cssUrl:any;
    private progressB:any;
    htmlTemplate:any;
    callbacks:Array<Function> = [];

    constructor(private authService:AuthService, private sanitizer:DomSanitizer) {
    }

    onPreloaderLoad() {
        this.preloader['nativeElement'].className += ' active';
    }

    ngOnInit() {
        let model = this.modelData,
            _DIR = ENTITY.Config.FILE.DIR;

            let _template = _DIR.PROJECT_TEMPLATE.NAME + _DIR.PROJECT_TEMPLATE.TYPES[_DIR.PROJECT_TEMPLATE._TYPE.PRELOADER],
                htmlUrl = _template + _DIR.PROJECT_TEMPLATE.HTML,
                cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;

            if (model.templates.indexOf(_DIR.PROJECT_TEMPLATE._TYPE.PRELOADER) > -1) {
                _template = ENTITY.Config.PROJ_LOC + model.projFilesDirname + _DIR.DELIMETER + _template.replace('assets/','');
                htmlUrl = _template + _DIR.PROJECT_TEMPLATE.HTML;
                cssUrl = _template + _DIR.PROJECT_TEMPLATE.CSS;
            }

        this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cssUrl);

        this.authService.get(htmlUrl).subscribe((res:any)=> {
            this.htmlTemplate = res._body;
            for (let i = 0; i < this.callbacks.length; i++) {
                this.callbacks[i]();
            }
        });

    }

    onUpdatePreloaderStatus(value) {
        if (!this.progressB)this.progressB = document.querySelector('.pre-progress-bar>.pre-progress-status');
        if (this.progressB)this.progressB.style.width = (this.progressB.parentNode.clientWidth * value) + 'px';
    }

}