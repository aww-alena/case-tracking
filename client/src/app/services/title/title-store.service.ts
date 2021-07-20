import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleStoreService {

  today = moment();
  readonly titleSource = new BehaviorSubject<string>('dashboard');
  readonly title = this.titleSource.asObservable();

  readonly dateTitleSource = new BehaviorSubject<string>(this.today.format('DD.MM.YYYY dddd'));
  readonly dateTitle = this.dateTitleSource.asObservable();

  constructor() { }

  updateTitle(value: string, dateTitle?: string): void {
    if (value && value.length) {
      this.titleSource.next(value);
    }

    if(dateTitle) {
      this.dateTitleSource.next(dateTitle);
    }
  }
}
