import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent{

  private titleTemp: string;

  @Output() titleNameChange = new EventEmitter();

  constructor(){

  }

  @Input()
  get titleName() {
    return this.titleTemp;
  }

  set titleName(val) {
    this.titleTemp = val;
    this.titleNameChange.emit(this.titleTemp);
  }

  change(){
    this.titleName = 'hhhh';
  }

}
