import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView } from 'angular-calendar';
import { DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
@Component({
  selector: 'app-statistic-calendar',
  templateUrl: './statistic-calendar.component.html',
  styleUrls: ['./statistic-calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})
export class StatisticCalendarComponent implements OnInit {

  @Input() events: CalendarEvent[];
  @Input() viewDates: Date[];

  view: CalendarView = CalendarView.Month;
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  locale = 'ru';

  constructor() { }

  ngOnInit(): void {}
}
