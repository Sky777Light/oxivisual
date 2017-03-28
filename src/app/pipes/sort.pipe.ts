import {Pipe, Injectable, PipeTransform} from "@angular/core";

@Pipe({
    name: 'sortfilter',
    pure: false
})

@Injectable()
export class SortPipe implements PipeTransform {
    private filteredList: any;

    constructor( ){  }

    transform(items: any[], args: any): any {
        if(!args)
            return items;

        if(items){
            if(args == 'A-Z'){
                items.sort((a: any, b: any) => {
                    if (((a.firstName+a.secondName) || a.title) < ((b.firstName+b.secondName) || b.title)) {
                        return -1;
                    } else if (((a.firstName+a.secondName) || a.title) > ((b.firstName+b.secondName) || b.title)) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                return items;
            } else if(args == 'Z-A'){
                items.sort((a: any, b: any) => {
                    if (((a.firstName+a.secondName) || a.title) > ((b.firstName+b.secondName) || b.title)) {
                        return -1;
                    } else if (((a.firstName+a.secondName) || a.title) < ((b.firstName+b.secondName) || b.title)) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                return items;
            }
        }
    }
    
}