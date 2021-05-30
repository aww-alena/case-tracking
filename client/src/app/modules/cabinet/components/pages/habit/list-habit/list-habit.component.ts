import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Habit } from 'src/app/classes/habit';
import { HabitRecording } from 'src/app/classes/habit-recording';
import { IHabit } from 'src/app/interfaces/habit';
import { IHabitRecording } from 'src/app/interfaces/habit-recording';
import { DateService } from 'src/app/services/date/date.service';
import { HabitService } from 'src/app/services/habit/habit.service';
import { JournalService } from 'src/app/services/journal/journal.service';
@Component({
  selector: 'app-list-habit',
  templateUrl: './list-habit.component.html',
  styleUrls: ['./list-habit.component.css'],
})

export class ListHabitComponent implements OnInit, OnDestroy, OnChanges {

  @Input() today: string;
  @Input() dayNumber: string;

  habits: IHabit[];
  habitRecords: IHabitRecording[] = [];
  doneOpen = false;


  subscriptions: Subscription = new Subscription();

  constructor(private habitService: HabitService,
              private journalService: JournalService,
              private dateService: DateService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.doneOpen = false;
    this.habits = [];
    this.habitRecords = [];
    this.getHabits();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getHabits(): void {
    if (this.habitService.habits) {
      this.habits = this.habitService.habits;
      this.habitRecords = this.initRecords(this.habits);
    } else {
      this.subscriptions.add(this.habitService.fetch().pipe(
        mergeMap((habits: IHabit[]): IHabitRecording[] => {
          this.habits = habits;
          this.habitService.habits = habits;
          return this.initRecords(habits);
        }))
        .subscribe((habitRecording) => this.habitRecords.push(habitRecording)));
    }
  }

  getMatchSchedule(habitRecords: IHabitRecording[]): IHabitRecording[] {
    const doneRecords = habitRecords.filter(item => (item.habit.schedule.includes(this.dayNumber) || item.habit.schedule === 'everyday'));

    return doneRecords;
  }

  tabIsChange(event: any): void {
    if(event.tab.textLabel === 'Done') {
      this.doneOpen = true;
    } else {
      this.doneOpen = false;
    }
  }

  private initRecords(habits: IHabit[]): IHabitRecording[] {

    const habitRecords: IHabitRecording[] = [];
    const dateFormated = moment(this.today).format('YYYYMMDD').toString();

    habits.forEach(habit => {
      const habitRecording: IHabitRecording = new HabitRecording(habit, dateFormated);

      this.subscriptions.add(this.journalService.getById(habitRecording.habit._id, habitRecording.id).subscribe((foundEntry: any) => {
        const entry = foundEntry[0];
        if (entry) {
          habitRecording.entry.parseEntry(entry, this.dateService.getDate(this.today));
        }
      }));

      habitRecords.push(habitRecording);

    });

    const doneRecords = this.getMatchSchedule(habitRecords);
    return doneRecords;
  }
}
