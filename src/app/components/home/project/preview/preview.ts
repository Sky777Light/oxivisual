import {ViewChild,Component,OnChanges,AfterViewInit,Output,EventEmitter} from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import {ProjectService} from "../../../../services/services";
import {Config} from "../../../../entities/constant.data";
declare var alertify:any;

@Component({
    selector: 'app-project-preview',
    templateUrl: './project.preview.html',
    styles: ['iframe{width:100%;height:100%}']
})
export class PreviewProject   {
    private dataSrc:SafeResourceUrl;

    constructor(private projectService:ProjectService,private sanitizer: DomSanitizer) {
    }


    ngOnInit() {
       let project = this.projectService.getProject();
        this.dataSrc = project.model && project.model.link? this.sanitizer.bypassSecurityTrustResourceUrl("preview?scene="+project.model.link):null;
    }

}