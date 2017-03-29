import {Pipe, Injectable, PipeTransform} from "@angular/core";

@Pipe({
    name: 'namefilter',
    pure: false
})

@Injectable()
export class NamePipe implements PipeTransform {
    private filteredList: any;

    constructor( ){  }

    transform(items: any[], name: string, moreParams:any ): any {

        if(!name){
            moreParams.arrLength = items.length;
            return items;
        }


        if(items){
           this.filteredList = items.filter(item => {
               if(item.firstName)
                   return ((item.firstName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1) || (item.secondName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1));

               return (item.title.toUpperCase().indexOf(name.toUpperCase(), 0) > -1);
            });
            moreParams.arrLength = this.filteredList.length;
            return this.filteredList;
        }

    }
    
}