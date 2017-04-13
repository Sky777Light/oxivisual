import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareService {
  private headerData: any;

  private shareSubject = new BehaviorSubject<any>(undefined);
  shareListener = this.shareSubject.asObservable();
  changeShareSubject(val: any) {
    this.shareSubject.next(val);
  }

  private headerSubject = new BehaviorSubject<any>(undefined);
  headerListener = this.headerSubject.asObservable();
  changeHeaderSubject(val: any) {
    this.headerSubject.next(val);
  }
  
  setHeaderArr(length: number){
    this.headerSubject.value.arrLength = length;
  }
  
}