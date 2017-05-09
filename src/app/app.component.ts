import {Component,enableProdMode} from '@angular/core';

//enableProdMode(); // for production mode
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  host: {'window:beforeunload':'beforeClose'}
})
export class AppComponent {

  constructor(
      
  ){
  }


}
