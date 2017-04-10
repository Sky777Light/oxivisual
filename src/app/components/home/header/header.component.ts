import { Component } from '@angular/core';
import {ShareService} from "../../../services/share.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent{

  private sortActive: boolean = false;
  private headerData: any;

  constructor(
      private shareService: ShareService
  ){}

  ngOnInit(){
    this.headerData = this.shareService.getHeader();
  }

  changeHeaderData(val, key){
    this.sortActive = false;
    this.headerData[key] = val;
  }

}
