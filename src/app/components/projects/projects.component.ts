import {Component} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent {

//data work with header
  private header: any = {
    title: 'Projects',
    arrLength: 0
  };
  private searchName: string;
  private sortType: string = 'A-Z';

  constructor(){
    
  }


}
