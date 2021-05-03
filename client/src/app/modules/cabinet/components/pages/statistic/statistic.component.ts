import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay, isEqual } from 'date-fns';
import { Subscription } from 'rxjs';
import { IHabit } from 'src/app/interfaces/habit';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';
import { HabitService } from 'src/app/services/habit/habit.service';
import { JournalService } from 'src/app/services/journal/journal.service';
import { TitleStoreService } from 'src/app/services/title/title-store.service';

const colors: any = {
  red: {
    primary: '#6453d1',
    secondary: '#6453d1',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  }

};
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit, OnDestroy {

  events: CalendarEvent[] = [];
  viewDates: Date[] = [new Date()];

  habits: IHabit[];
  habitEntries: {id: string; events: CalendarEvent[]; viewDates: Date[]}[] = [];

  subscriptions: Subscription = new Subscription();

  constructor(private habitService: HabitService,
              private journalService: JournalService,
              private titleService: TitleStoreService) { }

  ngOnInit(): void {
    this.setTitle();
    this.getHabits();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getHabits(): void {
    this.subscriptions.add(this.habitService.fetch().subscribe((habits) => {
      this.habits = habits;
      this.showHabitsStatistic(this.habits[0]);
    }));
  }

  showHabitsStatistic(habit: IHabit): void {

    if (this.hasEvents(habit._id)) {

      this.events = this.getEvents(habit._id);
      this.viewDates = this.getViewDates(habit._id);

    } else {
      this.subscriptions.add(this.journalService.getAllHabitsById(habit._id).subscribe((entries: IJournalEntry[]) => {

        this.resetCalendarInputData();

        entries.forEach(entry => {

          if (entry.done) {
            this.setViewDates(entry.date);
            this.addEvent(this.initCalendarEvent(entry.date, entry.comment, habit.color));
          }
        });

        this.saveEntry(habit._id, this.events, this.viewDates);
      }));
    }
  }

  initCalendarEvent(date: Date, title: string, color: string): CalendarEvent {
    const calendarEntry: CalendarEvent = {
      start: startOfDay(new Date(date)),
      color: {primary: color, secondary: color},
      title
    };

    return calendarEntry;
  }

  resetCalendarInputData(): void {
    this.events = [];
    this.viewDates = [];
  }

  setViewDates(date: Date): void {
    if (!this.hasDate(date)) {
      this.viewDates = [
        ...this.viewDates,
        this.getDateFromString(date)
      ];
    }
  }

  addEvent(event: CalendarEvent): void {
    this.events = [
      ...this.events,
      event,
    ];
  }

  saveEntry(id: string, events: CalendarEvent[], viewDates: Date[]): void {
    this.habitEntries.push({id, events, viewDates});
  }

  getEvents(id: string): CalendarEvent[] {
    const finedObj = this.habitEntries.find(obj => obj.id === id);
    return (finedObj !== undefined) ? finedObj.events : [];
  }

  getViewDates(id: string): Date[] {
    const finedObj = this.habitEntries.find(obj => obj.id === id);
    return (finedObj !== undefined) ? finedObj.viewDates : [];
  }

  getDateFromString(date: Date): Date {
    const dateObj = new Date(date);
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1, 0, 0, 0);
  }

  hasEvents(id: string): boolean {
    const finedObj = this.habitEntries.find(obj => obj.id === id);
    return (finedObj !== undefined) ? true : false;
  }

  hasDate(date: Date): boolean {
    const indexFound = this.viewDates.findIndex((i) => isEqual(new Date(i), this.getDateFromString(date)));
    return (indexFound !== -1) ? true : false;
  }

  private setTitle(): void {
    this.subscriptions.add(this.titleService.updateTitle('Statistics'));
  }

}
