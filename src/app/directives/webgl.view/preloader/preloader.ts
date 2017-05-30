import {Input,ViewChild,Component,OnInit} from '@angular/core';
import * as ENTITY from '../../../entities/entities';
import {Location} from '@angular/common';
import {Confirm,Prompt} from '../../dialogs/dialog';
import {AuthService} from '../../../services/auth.service';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import {AbstractChangesView} from '../abstract.changes.view';

declare var alertify:any;
declare var THREE:any;
declare var Pace:any;

@Component({
    selector: 'app-project-preloader',
    templateUrl: './preloader.html',
    styleUrls: ['./preloader.sass']
})
export class Preloader extends AbstractChangesView {

    @ViewChild("prevImg")
        prevImg:HTMLElement;
    @ViewChild("preloader")
        preloader:HTMLElement;

    @Input() preview:any;
    private progressB:any;
    private isActive:boolean=false;

    constructor() {
        super();
    }

    onPreloaderLoad() {
        this.preloader['nativeElement'].className += ' active';
    }

    onUpdatePreloaderStatus(value) {
        if (!this.progressB)this.progressB = document.querySelector('.pre-progress-bar>.pre-progress-status');
        if (this.progressB)this.progressB.style.width = (this.progressB.parentNode.clientWidth * value) + 'px';
    }

}