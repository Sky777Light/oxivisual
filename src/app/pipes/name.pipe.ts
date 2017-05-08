import {Pipe, Injectable, PipeTransform} from "@angular/core";
import {ShareService} from "../services/share.service";

@Pipe({
    name: 'namefilter'
})

@Injectable()
export class NamePipe implements PipeTransform {
    private filteredList: any;

    constructor(
        private shareService: ShareService
    ){  }

    transform(items: any[], name: string, sortType: string): any {
        if(!name){
            return this.sort(items, sortType);
        }


        if(items){
           this.filteredList = items.filter(item => {
               if(item.firstName)
                   return ((item.firstName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1) || (item.secondName.toUpperCase().indexOf(name.toUpperCase(), 0) > -1));

               return (item.title.toUpperCase().indexOf(name.toUpperCase(), 0) > -1);
            });
            return this.sort(this.filteredList, sortType);
        }

    }

    sort(array: any, type: string){
        if(type == 'A-Z'){
            array.sort((a: any, b: any) => {
                if (((a.firstName+a.secondName) || a.title) < ((b.firstName+b.secondName) || b.title)) {
                    return -1;
                } else if (((a.firstName+a.secondName) || a.title) > ((b.firstName+b.secondName) || b.title)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if(type == 'Z-A'){
            array.sort((a: any, b: any) => {
                if (((a.firstName+a.secondName) || a.title) > ((b.firstName+b.secondName) || b.title)) {
                    return -1;
                } else if (((a.firstName+a.secondName) || a.title) < ((b.firstName+b.secondName) || b.title)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if(type == 'Newest to older'){
            array.sort((a: any, b: any) => {
                if (a.created < b.created) {
                    return -1;
                } else if (a.created > b.created) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if(type == 'Older to newest'){
            array.sort((a: any, b: any) => {
                if (a.created > b.created) {
                    return -1;
                } else if (a.created < b.created) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }

        this.shareService.setHeaderArr(array.length);
        return array;
    }
    
}