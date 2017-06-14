import {Input,ViewChild,Component,OnInit } from '@angular/core';
import * as ENTITY from '../../entities/entities';


@Component({
    selector: 'app-project-webgl-changes-view'
})
export class AbstractChangesView implements OnInit  {

    @ViewChild("tempLoad")
        tempLoad:any;
    @Input() htmlTemplate:any;
    @Input() modelData:any;
    @Input() htmlUrl:any;
    @Input() cssUrl:any;
    @Input() parent:any;

    private DIR:any;
    private ProjClasses:any;
    protected callbacks:Array<Function>;
    constructor( ) {
        this.DIR = ENTITY.Config.FILE.DIR;
        this.ProjClasses = ENTITY.ProjClasses;
        this.callbacks = [];
    }


    ngOnInit() {
        if(this.htmlTemplate){

        }else{
            if(this.tempLoad){
                this.tempLoad.callbacks.push(()=>{
                    //this.cssUrl =  this.tempLoad.cssUrl;
                    this.htmlTemplate = this.tempLoad.htmlTemplate;
                    for (let i = 0; i < this.callbacks.length; i++) {
                        this.callbacks[i]();
                    }
                });
            }else{
                for (let i = 0; i < this.callbacks.length; i++) {
                    this.callbacks[i]();
                }
            }
        }
        if(this.parent && this.parent.onLoadTemplate)setTimeout(()=>this.parent.onLoadTemplate(this.constructor.name.toLowerCase()),100);
    }

    updateAfterInput(){

    }
}

