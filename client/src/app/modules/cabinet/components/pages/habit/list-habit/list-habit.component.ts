import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    this.subscriptions.add(this.habitService.fetch().subscribe((habits) => {
      this.habits = habits;
      this.initRecords();
      this.getEntries();
    }));
  }

  private initRecords(): void {

    this.habits.forEach(habit => {
      const habitRecording: IHabitRecording = new HabitRecording(habit);
      this.habitRecords.push(habitRecording);
    });
  }

  private getEntries(): void {

    this.habitRecords.forEach(record => {

      this.subscriptions.add(this.journalService.getById(record.habit._id, record.id).subscribe((findEntry: any) => {
        if (findEntry[0] !== undefined) {
          record.entry.parseEntry(findEntry[0]);
        }
      }));

    });
  }
}
