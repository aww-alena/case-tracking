import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { JournalEntry } from 'src/app/classes/journal-entry';
import { IHabit } from 'src/app/interfaces/habit';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';
import { HabitService } from 'src/app/services/habit/habit.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-condensed-statistics',
  templateUrl: './condensed-statistics.component.html',
  styleUrls: ['./condensed-statistics.component.css']
})

export class CondensedStatisticsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() today: string;

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];

  habits: IHabit[];
  journalRecords: IJournalEntry[] = [];

  dataReceived = false;
  subscriptions: Subscription = new Subscription();

  constructor(private statisticsService: StatisticsService, private habitService: HabitService) { }

  ngOnInit(): void {
    this.getHabits();
    this.getJournalRecord();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isMonthChange(changes)) {
      this.resetData();
      this.getJournalRecord();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  resetData(): void {
    this.journalRecords = [];
    this.lineChartData  = [];
    this.lineChartLabels = [];
    this.dataReceived = false;
  }

  getHabits(): void {
    this.subscriptions.add(this.habitService.fetch().subscribe(habits => {
      this.habits = habits;
      this.habitService.habits = habits;
    }));
  }

  getJournalRecord(): void {
    const date = new Date(this.today);
    const dateSeconds = (date .getTime() / 1000).toString();

    this.subscriptions.add(
      this.statisticsService.getJournalStatisticsForMonth(dateSeconds).subscribe((journalRecords: IJournalEntry[]) => {
        this.initAndSaveJournalEntries(journalRecords, date);
        this.createDataForChart();
      })
    );
  }

  initAndSaveJournalEntries(journalRecords: IJournalEntry[], date: Date): void {

    journalRecords.forEach((entry) => {
      const journalEntry: IJournalEntry = new JournalEntry(entry.habit, entry.idRecording, date );
      journalEntry.parseEntry(entry, date);

      this.journalRecords.push(journalEntry);
    });
  }

  createDataForChart(): void {
    this.initChartDataSet();
    this.loadAllChartData();
  }

  initChartDataSet(): void {
      this.lineChartData.push({data: [], label: 'Rating'});
      this.lineChartData.push({data: [], label: 'Time'});
      this.lineChartData.push({data: [], label: 'Number'});
  }

  loadAllChartData(): void {
    const date = moment(this.today);
    const daysInMonth = date.daysInMonth();
    const countedData = this.countTimeRatingAmount();

    const ratingByDay = countedData.rating;
    const timeByDay = countedData.time;
    const amountByDay = countedData.amount;

    for (let index = 1; index <= daysInMonth; index++) {
      const day = ('00'+ index).slice(-2);
      this.lineChartLabels.push(`${day}`);

      this.pushRatingToChartData(ratingByDay, index);
      this.pushTimeToChartData(timeByDay, index);
      this.pushAmountToChartData(amountByDay, index);
    }

    this.dataReceived = true;
  }

  private pushRatingToChartData(ratingArray: {[key: string]: Array<number>}, index: number): void {
    if (this.lineChartData[0].data) {
      if(ratingArray[index]) {
        const average = this.getAvarageRating(ratingArray[index]);
        this.lineChartData[0].data.push(average);
      } else {
        this.lineChartData[0].data.push(0);
      }
    }
  }

  private pushTimeToChartData(timeArray: {[key: string]: number}, index: number): void {
    if (this.lineChartData[1].data) {
      if (timeArray[index]) {
        const hours = Number(moment.utc(timeArray[index]*1000).format('HH.mm'));
        this.lineChartData[1].data.push(hours);
      } else {
        this.lineChartData[1].data.push(0);
      }
    }
  }

  private pushAmountToChartData(amountArray: {[key: string]: number}, index: number): void {
    if (this.lineChartData[2].data) {
      if (amountArray[index]) {
        this.lineChartData[2].data.push(amountArray[index]);
      } else {
        this.lineChartData[2].data.push(0);
      }
    }
  }

  private countTimeRatingAmount(): {
    time: {[key: string]: number};
    rating: {[key: string]: Array<number>};
    amount: {[key: string]: number};} {

    const timeByDay: {[key: string]: number} = {0: 0};
    const rating: {[key: string]: Array<number>} = {0: [0]};
    const amountByDay: {[key: string]: number} = {0: 0};

    if (this.habits) {

      this.journalRecords.forEach((entry) => {

        const day = moment(entry.date).format('D');

        const ratingValue = this.getRatingForEntry(entry);
        amountByDay[day] = (amountByDay[day]) ? amountByDay[day] + 1 : 1;
        timeByDay[day] = (timeByDay[day]) ? (timeByDay[day]) + this.getTimeForEntry(entry) : this.getTimeForEntry(entry);


        if (rating[day]) {
          rating[day].push(ratingValue);
        } else {
          rating[day] = [];
          rating[day].push(ratingValue);
        }
      });
      delete rating[0];
      delete timeByDay[0];
      delete amountByDay[0];
    }

    return {time: timeByDay, rating, amount: amountByDay};
  }

  private getRatingForEntry(entry: IJournalEntry): number {

    let ratingValue = 0;

    if (this.isHabitHasRating(entry.habit)) {
      ratingValue = (entry.rating) ? entry.rating : 0;
    }
    return ratingValue;

  }

  private getTimeForEntry(entry: IJournalEntry): number {

    let time = 0;

    if(this.isHabitHasTimer(entry.habit)) {
      time = entry.timer.countTimePassed();
    }

    return time;
  }

  private getAvarageRating(ratingArray: Array<number>): number {
    let average = 0;

    if(ratingArray && ratingArray.length) {
      average = Number((ratingArray.reduce((a, b) => (a + b)) / ratingArray.length).toFixed(1));
    }

    return average;
  }

  private isHabitHasRating(id: string): boolean {
    const found = this.habits.find((habit) => habit._id === id);
    const hasRating = (found?.hasRating) ? true : false;

    return hasRating;
  }

  private isHabitHasTimer(id: string): boolean {
    const found = this.habits.find((habit) => habit._id === id);
    const hasTimer = (found?.hasTimer) ? true : false;

    return hasTimer;
  }

  private isMonthChange(changes: SimpleChanges): boolean {
    let isChange = false;
    if (changes.today) {

      const currentToday = changes.today.currentValue;
      const previousToday = changes.today.previousValue;

      if (previousToday) {
        const currentMonth = moment(currentToday).format('MM');
        const previousMonth = moment(previousToday).format('MM');

        isChange = (currentMonth === previousMonth) ? false : true;
      }
    }

    return isChange;
  }
}
