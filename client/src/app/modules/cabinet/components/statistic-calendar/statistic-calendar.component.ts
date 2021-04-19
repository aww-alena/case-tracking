import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import * as moment from 'moment';

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
  selector: 'app-statistic-calendar',
  templateUrl: './statistic-calendar.component.html',
  styleUrls: ['./statistic-calendar.component.css']
})
export class StatisticCalendarComponent implements OnInit {

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Wow date',
      color: colors.red
    }
  ];

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
  }

}
