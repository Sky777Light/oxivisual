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
    @ViewChild("tempLoad")
        tempLoad:any;

    @Input() htmlTemplate:any;
    @Input() preview:any;
    @Input() modelData:any;
    @Input() htmlUrl:any;
    @Input() cssUrl:any;
    private progressB:any;
    private DIR:any;
    callbacks:Array<Function> = [];

    constructor() {
        this.DIR = ENTITY.Config.FILE.DIR;

    }

    onPreloaderLoad() {
        this.preloader['nativeElement'].className += ' active';
    }

    ngOnInit() {
        if(this.htmlTemplate){

        }else{
            this.tempLoad.callbacks.push(()=>{
                this.cssUrl =  this.tempLoad.cssUrl;
                this.htmlTemplate = this.tempLoad.htmlTemplate;
                for (let i = 0; i < this.callbacks.length; i++) {
                    this.callbacks[i]();
                }
            });
        }
    }

    onUpdatePreloaderStatus(value) {
        if (!this.progressB)this.progressB = document.querySelector('.pre-progress-bar>.pre-progress-status');
        if (this.progressB)this.progressB.style.width = (this.progressB.parentNode.clientWidth * value) + 'px';
    }

}