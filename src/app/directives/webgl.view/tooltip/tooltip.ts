import {Input,ViewChild,Component,OnInit,ViewContainerRef} from '@angular/core';
import * as ENTITY from '../../../entities/entities';
import {AbstractChangesView} from '../abstract.changes.view';
import {AuthService} from "../../../services/services";
import 'rxjs/add/operator/map';
declare var alertify:any;

@Component({
    selector: 'app-project-webgl-tooltip',
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.sass']
})
export class WTooltip extends AbstractChangesView implements OnInit {
    @ViewChild('scripts')
        scripts;
    HTMLElement;
    @Input() isEdit:any;
    dataSource:any;
    private dataSourceLoaded:boolean = false;
    private parser:any;
    dataElem:any;

    constructor(private authService:AuthService, public vc:ViewContainerRef) {
        super();

        this.dataElem = [];
    }

    ngOnInit() {

        let onfinish = ()=> {
            setTimeout(()=> {
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
        if (!this.modelData || !this.modelData.dataSource) {
            onfinish();
            return console.error('Data source is not defined');
        }
        this.authService.post("public/model/remote", {dataUrl: this.modelData.dataSource}, {
            hasAuthHeader: false,
            isCross: true
        }).subscribe((res:any)=> {
            res = res.json();
            if (res.status) {
                try {
                    this.dataSource = JSON.parse(res.data);
                    this.dataSourceLoaded = true;
                } catch (e) {
                    console.error(e);
                } finally {
                    onfinish();
                }
            } else {
                onfinish();
            }

        }, (res)=> {
            onfinish();
            console.error("Incorrect dataSource: " + res && res.message ? res.message : res);
        });
    }

    private  onEventPrevent(event) {
        event.preventDefault();
        return false;
    }

    private initParser(value:any = null) {
        let val = value;
        try {
            if (!value)val = this.htmlTemplate;
            this.parser = this.authService.safeJS(val);
            let _data = this.parser({dataSource: this.dataSource});
            _data.forEach((el:any, i)=> {
                if (this.isEdit && i == 0) {
                    el.tooltip.active = el.active = true;
                    el._left = 160 + 'px';
                    el._top = 220 + 'px';
                }
                el.onclick = ()=> {};
            });

            this.dataElem = _data;

        } catch (e) {
            console.error("Incorrect dataSource: " + e)
        }
    }

    updateAfterInput(value:any = null) {
        if (value) {
            this.initParser(value);
        }
    }
}
