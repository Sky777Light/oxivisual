import { Component } from '@angular/core';
import {ShareService} from "../../../services/share.service";
import {Subscription} from "rxjs/Rx";

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
      private shareService: ShareService
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

  deactivate(published: boolean){
    this.headerData.published = published;
  }

  delete(){
  }
}
