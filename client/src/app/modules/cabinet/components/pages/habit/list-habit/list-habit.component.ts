import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Habit } from 'src/app/classes/habit';
import { HabitRecording } from 'src/app/classes/habit-recording';
import { IHabit } from 'src/app/interfaces/habit';
import { IHabitRecording } from 'src/app/interfaces/habit-recording';
import { HabitService } from 'src/app/services/habit/habit.service';
import { JournalService } from 'src/app/services/journal/journal.service';
@Component({
  selector: 'app-list-habit',
  templateUrl: './list-habit.component.html',
  styleUrls: ['./list-habit.component.css'],
})

export class ListHabitComponent implements OnInit, OnDestroy {
  habits: IHabit[];
  habitRecords: IHabitRecording[] = [];

  subscriptions: Subscription = new Subscription();

  constructor(private habitService: HabitService,
              private journalService: JournalService) {}

  ngOnInit(): void {
    this.getHabits();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getHabits(): void {
    this.subscriptions.add(this.habitService.fetch().pipe(
      mergeMap((habits: IHabit[]): IHabitRecording[] => {
        this.habits = habits;
        return this.initRecords(habits);
      }))
      .subscribe((habitRecording) => this.habitRecords.push(habitRecording)));
      console.log(this.habitRecords);
  }

  getMatchSchedule(habitRecords: IHabitRecording[]): IHabitRecording[] {

    const day = moment().isoWeekday().toString();
    const doneRecords = habitRecords.filter(item => (item.habit.schedule.includes(day) || item.habit.schedule === 'everyday'));

    return doneRecords;
  }

  private initRecords(habitRecordings: IHabit[]): IHabitRecording[] {

    const habitRecords: IHabitRecording[] = [];

    habitRecordings.forEach(habit => {
      const habitRecording: IHabitRecording = new HabitRecording(habit);

      this.subscriptions.add(this.journalService.getById(habitRecording.habit._id, habitRecording.id).subscribe((foundEntry: any) => {
        const entry = foundEntry[0];
        if (entry) {
          habitRecording.entry.parseEntry(entry);
        }
      }));

      habitRecords.push(habitRecording);

    });

    const doneRecords = this.getMatchSchedule(habitRecords);
    return doneRecords;
  }


}
