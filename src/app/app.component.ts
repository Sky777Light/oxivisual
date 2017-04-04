import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  host: {'window:beforeunload':'beforeClose'}
})
export class AppComponent {

  constructor(
      
  ){}


}
