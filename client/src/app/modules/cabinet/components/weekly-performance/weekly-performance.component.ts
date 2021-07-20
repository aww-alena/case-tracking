import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IAim } from 'src/app/interfaces/aim';

@Component({
  selector: 'app-weekly-performance',
  templateUrl: './weekly-performance.component.html',
  styleUrls: ['./weekly-performance.component.css']
})
export class WeeklyPerformanceComponent implements OnInit {

  @Input() aim: IAim;
  numberWeeksInPeriod: number;
  weekArray: Array<number>;
  periods: Array<{start: moment.Moment; end: moment.Moment}> = [];

  constructor() { }

  ngOnInit(): void {
    this.calcData();
  }

  calcData(): void {
    this.getPeriods();
  }

  getPeriods(): void {

    let startDate = moment(this.aim.startDate);
    const endPeriod = moment(this.aim.endDate);

    let diff = endPeriod.diff(startDate, 'day');

    while (diff > 0) {

      let startWeek: moment.Moment;
      let endWeek: moment.Moment;

      if (startDate === moment(this.aim.startDate)) {
        startWeek = moment(this.aim.startDate);
        endWeek = moment(this.aim.startDate).locale('ru').endOf('week');
      } else {
        startWeek = moment(startDate.toDate()).add(1, 'days');
        endWeek = moment(startWeek.toDate()).locale('ru').endOf('week');
      }

      startDate = endWeek;
      diff = endPeriod.diff(startDate, 'day');
      endWeek = (diff <= 0) ? endPeriod : endWeek;

      this.periods.push({
        start: startWeek,
        end: endWeek
      });
    }
  }

}
