import {Input,ViewChild,Component,OnInit} from '@angular/core';
import * as ENTITY from '../../../entities/entities';
import {AbstractChangesView} from '../abstract.changes.view';
import {AuthService} from "../../../services/services";

declare var alertify:any;

@Component({
    selector: 'app-project-webgl-tooltip',
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.sass']
})
export class WTooltip extends AbstractChangesView implements OnInit {
    @Input() isEdit:any;
    dataSource:any;
    private dataSourceLoaded:boolean=false;
    private parser:any;
      dataElem:any;

    constructor(private authService:AuthService) {
        super();
    }

    ngOnInit() {

        if (!this.modelData || !this.modelData.dataSource)return alertify.error('Data source is not defined');
        this.authService.post(this.modelData.dataSource, null, {hasAuthHeader: false}).subscribe((res:any)=> {
            try {
                this.dataSource = JSON.parse(res._body);
                this.dataSourceLoaded = true;
            } catch (e) {
                alertify.error(e);
            } finally {

                setTimeout(()=>{
                    if (this.htmlTemplate) {
                        this.initParser();
                    } else {
                        this.callbacks.push(()=> {
                            this.initParser();
                        });
                    }

                    super.ngOnInit();
                });
            }
        }, (res)=> {
            alertify.error(res && res.message ? res.message : res);
        });
    }

    private initParser(value:any=null) {
        let val = value;
        try {
            if(!value)val= this.htmlTemplate;
            this.parser = this.authService.safeJS(val);
            this.dataElem = this.parser({dataSource: this.dataSource});
            if (this.isEdit) {
                this.dataElem[0].tooltip.active = this.dataElem[0].active = true;
                this.dataElem[0]._left = 160 + 'px';
                this.dataElem[0]._top = 220 + 'px';
            }
            this.dataElem.forEach((el)=>{
                el.onclick = ()=>{};
            });
        } catch (e) {
            alertify.error(e)
        }
    }

    updateAfterInput(value:any = null) {
        if (value) {
            this.initParser(value);
        }
    }
}
