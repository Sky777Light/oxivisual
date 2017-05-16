import { Component,Injectable,ViewChild } from '@angular/core';
import { CanActivate }  from '@angular/router';
import {Location} from '@angular/common';

import {AuthService} from "../../services/services";
import *as ENTITY from "../../entities/entities";

declare var alertify:any;

@Component({
    selector: 'app-project-scene-preview',
    templateUrl: './project.preview.html',
    styleUrls: ['./project.preview.sass']
})
export class PreviewSceneComponent{
    private model:any;


    structure:any;
    selected:any;
    constructor( private authService:AuthService,private location: Location) {
        this.model = new ENTITY.Project();
    }

    ngOnInit() {
        //let remote:any = this.location.path().split("?")[1];
        //if(!remote)return alertify.error('couldn`t find the project');
        //remote = remote.split("&");
        let dmens = ENTITY.Config.PROJ_DMNS,
            areas = this.location.path().split(dmens[0]),
            main:any = areas[0];

        main = main.split(dmens[1])[1];
        if(!main)return alertify.error("No project scene exist");
        this.authService.get(ENTITY.Config.PROJ_LOC+main + ENTITY.Config.SITE_STRUCTURE).subscribe((res:any) => {
            if(!res.status || res._body.match('!doctype html')){
                alertify.error("No project found");
            }else{
                this.model.data = [];
                for(let _data = res.json(),i =0;i<_data.length;i++){
                    this.model.data.push(ENTITY.ProjMain.inject(_data[i]));
                    if(areas.length>1){
                        let curIArea = areas[areas.length-1].split(dmens[1])[1];
                        if(!curIArea)return alertify.error("Something went wrong");
                        this.checkChild(this.model.data[i],curIArea,(c)=>this.select(c));
                    }else if(i==0)this.select(this.model.data[i]);
                }
            }

        },(e)=>{
            console.log(e);
        },()=>{
        });
    }
    private checkChild(child,curIArea,calback){
        if(child.projFilesDirname.indexOf(curIArea)>-1){
            calback(child);
        }else if(child.areas){
            for(let d=0;d<child.areas.length;d++){
                this.checkChild(child.areas[d],curIArea,calback)
            }
        }
    }
    private select(child:ENTITY.ProjMain){
        this.selected = child;
        console.log(child);
    }

}

@Injectable()
export class PreviewSceneService{


    canActivate():boolean {
        return true;
    }


}