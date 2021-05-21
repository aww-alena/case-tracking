import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/modules/statistics/components/statistic-calendar/custom-date-formatter.provider';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})
export class CalendarComponent implements OnInit {

  @Output() setDate = new EventEmitter<any>();

  view: CalendarView = CalendarView.Month;
  calendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  chosen: CalendarEvent;
  locale = 'ru';
  weekStartsOn = DAYS_OF_WEEK.MONDAY;

  constructor() {}

  ngOnInit(): void {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.deleteEvent(this.chosen);
    this.addChosenDate(date);
    this.setDate.emit(date);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setToday(): void {
    this.deleteEvent(this.chosen);
    this.viewDate = new Date();
    this.setDate.emit(this.viewDate);
    this.refresh.next();
  }

  addChosenDate(date: Date): void {
    this.chosen = {
      start: date,
      title: 'Chosen',
      color: {primary: '#4660b6', secondary: '#4660b6'}
    };

    this.events.push(this.chosen);
    this.refresh.next();
  }
}
