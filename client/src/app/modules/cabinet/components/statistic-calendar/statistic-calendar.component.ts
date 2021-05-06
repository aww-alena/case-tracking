import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import * as moment from 'moment';
import { CalandarEvent } from 'src/app/interfaces/habit-statistics';


@Component({
  selector: 'app-statistic-calendar',
  templateUrl: './statistic-calendar.component.html',
  styleUrls: ['./statistic-calendar.component.css']
})
export class StatisticCalendarComponent implements OnInit {

  @Input() habitEvents: CalandarEvent[];
  @Input() viewDates: Date[];

  events: CalendarEvent[] = [];
  dates: Date[] = [];
  today = new Date();

  view: CalendarView = CalendarView.Month;

  constructor() { }

  ngOnInit(): void {
    this.initEventsAndDate();
  }

  initEventsAndDate(): void {
    this.habitEvents.forEach((item) => {
      this.events.push(this.initCalendarEvent(item.start, item.title, item.color));
    });

    this.viewDates.forEach((item) => {
      this.dates.push(new Date(item));
    });
  }

  initCalendarEvent(date: Date, title: string, color: string): CalendarEvent {
    const calendarEntry: CalendarEvent = {
      start: startOfDay(new Date(date)),
      title,
      color: {primary: color, secondary: color}
    };

    return calendarEntry;
  }
}
