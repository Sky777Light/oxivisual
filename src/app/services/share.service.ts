import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareService {
  private headerData: any = {};

  private shareSubject = new BehaviorSubject<any>(undefined);

  shareListener = this.shareSubject.asObservable();

  changeShareSubject(val: any) {
    this.shareSubject.next(val);
  }

  setHeader(val: any){
    for(let i in val){
      this.headerData[i] = val[i];
    }
    return this.headerData;
  }
  getHeader(){
    return this.headerData;
  }
  
}