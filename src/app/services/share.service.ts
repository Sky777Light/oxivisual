import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareService {

  private shareSubject = new BehaviorSubject<any>(undefined);

  shareListener = this.shareSubject.asObservable();

  changeShareSubject(val: any) {
    this.shareSubject.next(val);
  }

}