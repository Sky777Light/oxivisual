import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent{

  @Input() header;

  @Input() searchRes;
  @Output() searchResChange = new EventEmitter();

  @Input() sortType;
  @Output() sortTypeChange = new EventEmitter();

  constructor(){

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
