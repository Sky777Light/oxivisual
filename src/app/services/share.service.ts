import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareService {

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

  //listen array for header(only users, projects)
  private sortArrSubject = new BehaviorSubject<number>(0);

  sortArrListener = this.sortArrSubject.asObservable();

  changeSortArrSubject(val: number) {
    this.sortArrSubject.next(val);
  }
}