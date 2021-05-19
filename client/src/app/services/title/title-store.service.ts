import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleStoreService {

  readonly titleSource = new BehaviorSubject<string>('Dashboard');
  readonly title = this.titleSource.asObservable();

  readonly dateTitleSource = new BehaviorSubject<string>('Dashboard');
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
