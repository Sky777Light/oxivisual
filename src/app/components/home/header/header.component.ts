import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ShareService} from "../../../services/share.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent{
  
  private headerSub: Subscription;
  @Input() headerData;

  @Input() searchRes;
  @Output() searchResChange = new EventEmitter();

  @Input() sortType;
  @Output() sortTypeChange = new EventEmitter();

  constructor(
      private shareService: ShareService
  ){}

  ngOnInit() {
    this.headerSub = this.shareService.headerListener.subscribe((data: any) => {
      
    })
  }

  ngOnDestroy() {
    this.headerSub.unsubscribe();
  }
  
  changeSearchRes(val){
    this.searchRes = val;
    this.searchResChange.emit(this.searchRes);
  }

  changeSortType(val){
    this.sortType = val;
    this.sortTypeChange.emit(this.sortType);
  }

}
