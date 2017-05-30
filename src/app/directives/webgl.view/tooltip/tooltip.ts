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
    dataSource:any;
    parser:any;

    constructor(private authService:AuthService) {
        super();
    }

    ngOnInit() {

        if (!this.modelData || !this.modelData.dataSource)return alertify.error('Data source is not defined');
        this.authService.post(this.modelData.dataSource, null, {hasAuthHeader: false}).subscribe((res:any)=> {
            console.log('re');
            try {
                this.dataSource = JSON.parse(res._body);
            } catch (e) {
                alertify.error(e);
            } finally {

                if(this.htmlTemplate){
                    this.initParser();
                }else{
                    this.callbacks.push(()=> {
                       this.initParser();
                    });
                }

                super.ngOnInit();

            }
        }, (res)=> {
            alertify.error(res && res.message ? res.message : res);
        });

    }
    private initParser(){
        try {
            console.log('re');
            this.parser = Function("return " + this.htmlTemplate)();
            this.parser();
            console.log(this);
        } catch (e) {
            alertify.error(e)
        }
    }
}