import {Component} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent {

  private title: string = 'Projects';
  private projects: any = [
    {
      title: 'first',
      number: 1
    },
    {
      title: 'second',
      number: 2
    },
    {
      title: 'third',
      number: 3
    }
  ];

  constructor(){
    
  }


}
