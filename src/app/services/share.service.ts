import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareService {

  private shareSubject = new BehaviorSubject<any>(undefined);
  shareListener = this.shareSubject.asObservable();
  private headerSubject = new BehaviorSubject<any>(undefined);
  headerListener = this.headerSubject.asObservable();


  changeShareSubject(val: any) {
    this.shareSubject.next(val);
  }

  changeHeaderSubject(val: any) {
    this.headerSubject.next(val);
  }
  
  setHeaderArr(length: number){
    this.headerSubject.value.arrLength = length;
  }
  
}