import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IAim } from 'src/app/interfaces/aim';
import { TitleStoreService } from 'src/app/services/title/title-store.service';

@Component({
  selector: 'app-weekly-performance',
  templateUrl: './weekly-performance.component.html',
  styleUrls: ['./weekly-performance.component.css']
})
export class WeeklyPerformanceComponent implements OnInit, OnChanges {

  @Input() aim: IAim;
  @Input() today: string;
  numberWeeksInPeriod: number;
  periods: Array<{start: moment.Moment; end: moment.Moment}> = [];
  stateOfWeek: Array<string> = [];
  statisticOfWeeksByTasks: Array<{id: string | undefined; amount: number}[]> = [];
  statisticOfWeeks: Array<number> = [];
  targetValueForWeek = 0;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges() {
    this.calcData();
  }

  calcData(): void {
    this.getPeriods();
    this.getStateOfWeek();
    this.countNumberExecutions();
    this.getStatistics();
    this.getTargetValue();
    this.countPerformance();
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

  getStateOfWeek(): void {

    this.periods.forEach(item => {
      const currentWeek = moment(this.today).isBetween(item.start, item.end);

      if (currentWeek) {
        this.stateOfWeek.push('current');
      } else if (!currentWeek && (item.end.diff(moment(this.today), 'day') > 0)){
        this.stateOfWeek.push('future');
      } else {
        this.stateOfWeek.push('old');
      }
    });
  }

  countNumberExecutions(): void {
    this.stateOfWeek.forEach((item, index) => {
      if (item !== 'future') {
        const start = this.periods[index].start;
        const end = this.periods[index].end;
        this.statisticOfWeeksByTasks.push([]);

        this.aim.tasks.forEach(task => {

          let numberExecutions = 0;

          task.completion?.forEach(date => {
            if (moment(date.done).isBetween(start, end)) {
              numberExecutions++;
            }
          });

          this.statisticOfWeeksByTasks[index].push({
            id: task._id,
            amount: numberExecutions
          });
        });
      }
    });
  }

  getStatistics(): void {

    this.statisticOfWeeksByTasks.forEach(week => {
      let amount = 0;
      week.forEach(task => {
        amount += task.amount;
      });

      this.statisticOfWeeks.push(amount);
    });
  }

  getTargetValue(): void {
    this.aim.tasks.forEach(task => {
      this.targetValueForWeek += task.numberPerWeek;
    });
  }

  countPerformance(): void {
    this.statisticOfWeeks.forEach((item, index) => {
      const performance = 100 / (this.targetValueForWeek / item);
      let state = '';

      switch (true) {
        case (performance >= 80):
          state = 'good';
          break;
        case (performance < 80 &&  performance >= 50):
          state = 'normal';
          break;
        default:
          state = 'bad';
          break;
      }

      this.stateOfWeek[index] = state;
    });

  }

}
