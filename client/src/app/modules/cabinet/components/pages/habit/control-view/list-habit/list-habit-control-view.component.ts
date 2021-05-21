import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Habit } from 'src/app/classes/habit';
import { IHabit } from 'src/app/interfaces/habit';
import { HabitService } from 'src/app/services/habit/habit.service';
import { TitleStoreService } from 'src/app/services/title/title-store.service';

@Component({
  selector: 'app-list-habit-control-view',
  templateUrl: './list-habit-control-view.component.html',
  styleUrls: ['./list-habit-control-view.component.css']
})
export class ListHabitControlViewComponent implements OnInit, OnDestroy {

  habits: IHabit[] = [];

  subscriptions: Subscription = new Subscription();

  constructor(private habitService: HabitService, private titleService: TitleStoreService) { }

  ngOnInit(): void {
    this.setTitle();
    this.getHabits();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getHabits(): void {
    this.subscriptions.add(this.habitService.fetch().pipe(
      mergeMap((habits: IHabit[]) => this.initHabits(habits))
      )
      .subscribe(habit => {
        this.habits.push(habit);
      })
    );
  }

  onDeleteHabit(id: string): void {
    this.habits = this.habits.filter(item => item._id !== id);
  }

  private setTitle(): void {
    this.subscriptions.add(this.titleService.updateTitle('habits'));
  }

  private initHabits(habits: IHabit[]): IHabit[] {

    const tempTask: IHabit[] = [];
    habits.forEach(habit => {
      const newHabit: IHabit = new Habit(habit);
      tempTask.push(newHabit);
    });

    return tempTask;
  }

}
