import {Pipe, Injectable, PipeTransform} from "@angular/core";
import {ShareService} from "../services/share.service";

@Pipe({
    name: 'namefilter',
    pure: false
})

@Injectable()
export class NamePipe implements PipeTransform {
    private filteredList: any;

    constructor(
        private shareService: ShareService
    ){  }

    transform(items: any[], name: string): any {

        if(!name){
            this.shareService.changeSortArrSubject(items.length);
            return items;
        }


        if(items){
           this.filteredList = items.filter(item => {
               if(item.firstName)
                   return ((item.firstName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1) || (item.secondName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1));

               return (item.title.toUpperCase().indexOf(name.toUpperCase(), 0) > -1);
            });
            this.shareService.changeSortArrSubject(this.filteredList.length);
            return this.filteredList;
        }

    }
    
}