import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHabit } from 'src/app/interfaces/habit';

@Injectable({
  providedIn: 'root'
})
export class HabitStoreService {

  readonly habitsSource = new BehaviorSubject<IHabit[]>([]);
  readonly habits$ = this.habitsSource.asObservable();

  constructor() { }

  get habits(): IHabit[] {
    return this.habitsSource.getValue();
  }

  set habits(value: IHabit[]) {
    this.habitsSource.next(value);
  }

}
