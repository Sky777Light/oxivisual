import {ViewChild,Component,OnChanges,AfterViewInit,Output,EventEmitter} from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import {ProjectService} from "../../../../services/services";
import {Config} from "../../../../entities/constant.data";
declare var alertify:any;

@Component({
    selector: 'app-project-preview',
    template: '<iframe  *ngIf="dataSrc" [src]="dataSrc" frameborder=0 outline=0><h1 *ngIf="!dataSrc">Still had nothing created!!!</h1>',
    styleUrls: ['./project.preview.sass']
})
export class PreviewProject   {
    private dataSrc:SafeResourceUrl;

    constructor(private projectService:ProjectService,private sanitizer: DomSanitizer) {
    }


    ngOnInit() {
       let project = this.projectService.getProject();
        this.dataSrc = project.model? this.sanitizer.bypassSecurityTrustResourceUrl("preview?scene="+project.model.link):null;
    }

}