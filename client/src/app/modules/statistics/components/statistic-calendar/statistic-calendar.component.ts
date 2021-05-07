import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-statistic-calendar',
  templateUrl: './statistic-calendar.component.html',
  styleUrls: ['./statistic-calendar.component.css']
})
export class StatisticCalendarComponent implements OnInit {

  @Input() events: CalendarEvent[];
  @Input() viewDates: Date[];

  view: CalendarView = CalendarView.Month;

  constructor() { }

  ngOnInit(): void {}
}
