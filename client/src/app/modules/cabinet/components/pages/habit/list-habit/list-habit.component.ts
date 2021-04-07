import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Habit } from 'src/app/interfaces/habit';
import { HabitRecording } from 'src/app/interfaces/habit-recording';
import { JournalEntry } from 'src/app/interfaces/journalEntry';
import { HabitService } from 'src/app/services/habit/habit.service';
import { JournalService } from 'src/app/services/journal/journal.service';

@Component({
  selector: 'app-list-habit',
  templateUrl: './list-habit.component.html',
  styleUrls: ['./list-habit.component.css'],
})
export class ListHabitComponent implements OnInit, OnDestroy {
  habits: Habit[];
  habitRecords: HabitRecording[] = [];

  habitsSubscribe: Subscription;

  constructor(private habitService: HabitService,
              private journalService: JournalService) {}

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
      this.initRecords();
      this.getEntries();
      console.log(this.habitRecords);
    });
  }

  private initRecords(): void {

    this.habits.forEach(habit => {

      const idRecording = this.getIdRecording(habit._id);

      const habitRecording = {
        habit,
        id: idRecording,
        isDone: false,
        entry: this.createJournalEntry(habit._id, idRecording)
      };

      this.habitRecords.push(habitRecording);

    });
  }

  private createJournalEntry(habitID: string, id: string): JournalEntry {

    const entry: JournalEntry = {
      done: false,
      idRecording: id,
      habit: habitID,
      date: moment().toDate(),
      rate: 0
    };

    return entry;
  }

  private getIdRecording(id: string): string {
    return moment().format('YYYYMMDD') + id;
  }

  private getEntries(): void {

    this.habitRecords.forEach(record => {

      this.journalService.getById(record.habit._id, record.id).subscribe((findEntry: any) => {
        if (findEntry[0] !== undefined) {
          record.entry = findEntry[0];
        }
        console.log(record);
      });

    });
  }
}
