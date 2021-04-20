import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import * as moment from 'moment';


@Component({
  selector: 'app-statistic-calendar',
  templateUrl: './statistic-calendar.component.html',
  styleUrls: ['./statistic-calendar.component.css']
})
export class StatisticCalendarComponent implements OnInit {

  @Input() habitEvents: CalendarEvent[];
  @Input() viewDates: Date[];

  view: CalendarView = CalendarView.Month;

  constructor() { }

  ngOnInit(): void {
    console.log('calendar: ', this.habitEvents);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
  }

}
