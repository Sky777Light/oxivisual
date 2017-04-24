import { Component } from '@angular/core';
import {ShareService} from "../../../services/share.service";
import {Subscription} from "rxjs/Rx";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent{

  private sortActive: boolean = false;
  private headerData: any = {};
  private subHeaderData:Subscription;
  private headerSettings: boolean = false;

  constructor(
      private shareService: ShareService,
      private projectService: ProjectService

  ){}

  ngOnInit() {
    this.subHeaderData = this.shareService.headerListener.subscribe((data: any) => {
      if(data){
        this.headerData = data;
      }
    })
  }
  ngOnDestroy() {
    this.subHeaderData.unsubscribe();
  }

  deactivate(){
    let id = this.headerData._id;
    let temp = {
      _id: id,
      published: !this.headerData.published
    };
    this.projectService.changeProject(temp);
  }

  delete(){
    this.projectService.deleteProject(this.headerData);
  }


}
