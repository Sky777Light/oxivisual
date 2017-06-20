import {ViewChild,Component,OnChanges,AfterViewInit,Output,EventEmitter} from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import {ProjectService} from "../../../../services/services";
import {Config} from "../../../../entities/constant.data";

declare var alertify:any;

@Component({
    selector: 'app-project-preview',
    templateUrl: './project.preview.html',
    styleUrls: ['./project.preview.sass']
})
export class PreviewProject {
    private dataSrc:SafeResourceUrl;
    private urlC:string;
      data:any={};
    @ViewChild("textAr")
      textAr:HTMLElement;
    @ViewChild("ifrm")
      ifrm:HTMLElement;

    constructor(private projectService:ProjectService, private sanitizer:DomSanitizer) {
    }


    ngOnInit() {
        let project = this.projectService.getProject(),
            _self = this,
            link  = "preview?scene=" + project._id;
        this.dataSrc = project._id ? this.sanitizer.bypassSecurityTrustResourceUrl(link) : null;
        if( this.dataSrc){
            var chekIfIframeCreated = setInterval(()=>{
                if(this.ifrm){
                    clearInterval(chekIfIframeCreated);
                    this.ifrm['nativeElement'].onload = function () {
                        _self.urlC = this.contentWindow.location.href;
                        _self.data = {
                            ifr:"<iframe width=\"720\" height=\"405\" src="+(_self.urlC)+" frameborder=0 allowfullscreen ></iframe>",
                            link:_self.urlC
                        };
                    }
                }
            },100);

        }
    }

    copyUrl() {
        let copyTextarea = this.textAr['nativeElement'];
        copyTextarea.select();
        try {
            alertify.success("Url copied was " + (document.queryCommandEnabled('copy') && document.queryCommandSupported('copy') && document.execCommand('copy')  ? 'successful' : 'unsuccessful'));
        } catch (err) {
            alertify.error("Oops, unable to copy");
        }
    }
}