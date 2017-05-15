import { Component,Injectable } from '@angular/core';
import { CanActivate }  from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

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
        console.log(this);
        console.log(this.location.path());
    }

    ngOnInit() {
        let remote:any = this.location.path().split("?")[1];
        if(!remote)return alertify.error('couldn`t find the project');
        remote = remote.split("=");
        //this.authService.get(ENTITY.Config.PROJ_LOC+this.model.link + ENTITY.Config.SITE_STRUCTURE).subscribe((res:any) => {
        //    this.model.data = [];
        //    for(let _data = res.json(),i =0;i<_data.length;i++){
        //        this.model.data.push(ENTITY.ProjMain.inject(_data[i]));
        //    }
        //});
    }
}

@Injectable()
export class PreviewSceneService{


    canActivate():boolean {
        return true;
    }


}