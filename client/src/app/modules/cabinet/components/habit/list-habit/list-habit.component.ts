import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Habit } from 'src/app/interfaces/habit';
import { HabitService } from 'src/app/services/habit/habit.service';

@Component({
  selector: 'app-list-habit',
  templateUrl: './list-habit.component.html',
  styleUrls: ['./list-habit.component.css'],
})
export class ListHabitComponent implements OnInit, OnDestroy {
  habits: Habit[];

  habitsSubscribe: Subscription;

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.getHabits();
  }

  ngOnDestroy(): void {
    if (this.habitsSubscribe) {
      this.habitsSubscribe.unsubscribe();
    }
  }

  getHabits(): void {
    this.habitsSubscribe = this.habitService.fetch().subscribe((habits) => {
      this.habits = habits;
      console.log(this.habits);
    });
  }
}
