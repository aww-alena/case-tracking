import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleStoreService {

  readonly titleSource = new BehaviorSubject<string>('Dashboard');
  readonly title = this.titleSource.asObservable();

  constructor() { }

  updateTitle(value: string): void {
    if (value && value.length) {
      this.titleSource.next(value);
    }
  }
}
