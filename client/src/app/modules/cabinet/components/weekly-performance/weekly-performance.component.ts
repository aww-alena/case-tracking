import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Output() getNumberExecutions: EventEmitter<Array<{id: string; amount: number}>> = new EventEmitter();
  numberWeeksInPeriod: number;
  periods: Array<{start: moment.Moment; end: moment.Moment}> = [];
  stateOfWeek: Array<string> = [];
  statisticOfWeeksByTasks: Array<{id: string; amount: number}[]> = [];
  statisticOfWeeks: Array<number> = [];
  targetValueForWeek = 0;
  oldToday: string;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
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

    const dateStartISO = new Date(this.aim.startDate).toISOString();
    const dateEndISO = new Date(this.aim.endDate).toISOString();

    let startDate = moment(dateStartISO);
    const endPeriod = moment(dateEndISO);
    let diff = endPeriod.diff(startDate, 'day');

    while (diff > 0) {

      let startWeek: moment.Moment;
      let endWeek: moment.Moment;

      if (startDate === moment(dateStartISO)) {
        startWeek = moment(dateStartISO);
        endWeek = moment(dateStartISO).locale('ru').endOf('week');
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

    const todayDateISO = new Date(this.today).toISOString();

    this.periods.forEach(item => {

      const start = item.start.toISOString().substring(0, 10);
      const end = item.end.toISOString().substring(0, 10);
      const currentWeek = moment(todayDateISO).isBetween(start, end, undefined, '[]');

      if (currentWeek) {
        this.stateOfWeek.push('current');
      } else if (!currentWeek && (item.end.diff(moment(todayDateISO), 'day') > 0)){
        this.stateOfWeek.push('future');
      } else {
        this.stateOfWeek.push('old');
      }
    });
  }

  countNumberExecutions(): void {
    this.stateOfWeek.forEach((item, index) => {
      if (item !== 'future') {
        const start = this.periods[index].start.toISOString().substring(0, 10);
        const end = this.periods[index].end.toISOString().substring(0, 10);
        this.statisticOfWeeksByTasks.push([]);

        this.aim.tasks.forEach(task => {
          let numberExecutions = 0;

          task.completion?.forEach(date => {
            const dateISO = new Date(date.done).toISOString();

            if (moment(dateISO).isBetween(start, end, undefined, '[]')) {
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

    const currentWeek = this.statisticOfWeeksByTasks.length - 1;

    this.getNumberExecutions.emit(this.statisticOfWeeksByTasks[currentWeek]);
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

    const targetValueForCurrentWeek = Math.round((this.targetValueForWeek / 7) * moment(this.today).isoWeekday());

    this.statisticOfWeeks.forEach((item, index, arr) => {

      let performance = 0;
      if (Object.is(arr.length - 1, index)) {
        performance = 100 / (targetValueForCurrentWeek / item);
      } else {
        performance = 100 / (this.targetValueForWeek / item);
      }

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
