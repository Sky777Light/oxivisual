import {Input,ViewChild,Component,OnInit,ViewContainerRef} from '@angular/core';
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

    constructor(private authService:AuthService,public vc: ViewContainerRef) {
        super();

        this.dataElem=[];
    }

    ngOnInit() {

        if (!this.modelData || !this.modelData.dataSource)return alertify.error('Data source is not defined');
        this.authService.get(this.modelData.dataSource, {hasAuthHeader: false}).subscribe((res:any)=> {
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
            alertify.error("Incorrect dataSource: "+res && res.message ? res.message : res);
        });
    }

    private  onEventPrevent(event) {
        event.preventDefault();
        return false;
    }
    private initParser(value:any=null) {
        let val = value;
        try {
            if(!value)val= this.htmlTemplate;
            this.parser = this.authService.safeJS(val);
            let _data= this.parser({dataSource: this.dataSource});
            _data.forEach((el,i)=>{
                if (this.isEdit && i==0) {
                    el.tooltip.active = el.active = true;
                    el._left = 160 + 'px';
                    el._top = 220 + 'px';
                }
                el.onclick = ()=>{};
            });

            this.dataElem = _data;

        } catch (e) {
            alertify.error("Incorrect dataSource: "+e)
        }
    }

    updateAfterInput(value:any = null) {
        if (value) {
            this.initParser(value);
        }
    }
}
