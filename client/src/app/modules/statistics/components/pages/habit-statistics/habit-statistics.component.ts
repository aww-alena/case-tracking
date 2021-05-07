import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { Subscription } from 'rxjs';
import { IHabit } from 'src/app/interfaces/habit';
import { HabitStatistics, MainJournalData } from 'src/app/interfaces/habit-statistics';
import { HabitService } from 'src/app/services/habit/habit.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-habit-statistics',
  templateUrl: './habit-statistics.component.html',
  styleUrls: ['./habit-statistics.component.css']
})
export class HabitStatisticsComponent implements OnInit, OnDestroy {

  habits: IHabit[] = [];
  statisticsData: {idHabit: string; events: CalendarEvent[]; viewDates: Date[]; journalData: MainJournalData[] }[] = [];

  events: CalendarEvent[] = [];
  entries: MainJournalData[];
  habit: IHabit;
  viewDates: Date[] = [new Date()];

  subscriptions: Subscription = new Subscription();

  constructor(private habitService: HabitService,
              private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getHabits();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getHabits(): void {
    this.subscriptions.add(this.habitService.fetch().subscribe((habits) => {
      this.habits = habits;
      this.getStatisticsForFirstHabit();
    }));
  }

  getStatisticsForFirstHabit(): void {

    const firstHabit = this.habits[0];

    if (firstHabit) {
      this.subscriptions.add(this.statisticsService.getHabitStatistics(firstHabit).subscribe((statisticsData: HabitStatistics) => {
        this.habit = firstHabit;
        this.initStatisticDataAndSave(firstHabit._id, statisticsData.events, statisticsData.viewDates, statisticsData.journalData);
      }));

    }
  }

  showHabitsStatistic(habit: any): void {
    if (this.hasEvents(habit._id)) {

      this.events = this.getEvents(habit._id);
      this.viewDates = this.getViewDates(habit._id);
      this.entries =  this.getJournalData(habit._id);
      this.habit = habit;

    } else {
      this.subscriptions.add(this.statisticsService.getHabitStatistics(habit).subscribe((statisticsData: HabitStatistics) => {
        this.habit = habit;
        this.initStatisticDataAndSave(habit._id, statisticsData.events, statisticsData.viewDates, statisticsData.journalData);
      }));
    }
  }

  initStatisticDataAndSave(idHabit: string, events: CalendarEvent[], viewDates: Date[], journalData: MainJournalData[]): void {
    this.events = [];
    events.forEach((item: CalendarEvent) => {
      if(item.color) {
        this.events.push(this.initCalendarEvent(item.start, item.title, item.color));
      }
    });

    this.viewDates = [];
    viewDates.forEach((item) => {
      this.viewDates.push(new Date(item));
    });

    this.entries = journalData;

    this.saveEntry(idHabit, this.events, this.viewDates, journalData);
  }

  saveEntry(idHabit: string, events: CalendarEvent[], viewDates: Date[], journalData: MainJournalData[]): void {
    this.statisticsData.push({idHabit, events, viewDates, journalData});
  }

  getEvents(id: string): CalendarEvent[] {
    const finedObj = this.statisticsData.find(obj => obj.idHabit === id);
    return (finedObj !== undefined) ? finedObj.events : [];
  }

  getJournalData(id: string): MainJournalData[] {
    const finedObj = this.statisticsData.find(obj => obj.idHabit === id);
    return (finedObj !== undefined) ? finedObj.journalData : [];
  }

  getViewDates(id: string): Date[] {
    const finedObj = this.statisticsData.find(obj => obj.idHabit === id);
    return (finedObj !== undefined) ? finedObj.viewDates : [];
  }

  hasEvents(id: string): boolean {
    const finedObj = this.statisticsData.find(obj => obj.idHabit === id);
    return (finedObj !== undefined) ? true : false;
  }

  initCalendarEvent(date: Date, title: string, color: any): CalendarEvent {
    const calendarEntry: CalendarEvent = {
      start: startOfDay(new Date(date)),
      title,
      color
    };

    return calendarEntry;
  }
}
