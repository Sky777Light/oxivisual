import {Pipe, Injectable, PipeTransform} from "@angular/core";

@Pipe({
    name: 'namefilter',
    pure: false
})

@Injectable()
export class NamePipe implements PipeTransform {
    private filteredList: any;

    constructor( ){  }

    transform(items: any[], args: any): any {

        if(!args)
            return items;

        if(items){
           this.filteredList = items.filter(item => {
               if(item.firstName)
                   return ((item.firstName.toUpperCase().indexOf(args.toUpperCase(), 0) > -1) || (item.secondName.toUpperCase().indexOf(args.toUpperCase(), 0) > -1));

               return (item.title.toUpperCase().indexOf(args.toUpperCase(), 0) > -1);
            });

            return this.filteredList;
        }

    }
    
}