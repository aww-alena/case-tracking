import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { JournalEntry } from 'src/app/classes/journal-entry';
import { IHabit } from 'src/app/interfaces/habit';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';
import { HabitService } from 'src/app/services/habit/habit.service';
import { JournalService } from 'src/app/services/journal/journal.service';
import { ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective, Label, ThemeService } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-time-statistics',
  templateUrl: './time-statistics.component.html',
  styleUrls: ['./time-statistics.component.css']
})
export class TimeStatisticsComponent implements OnInit {

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        fontColor: '#fff'

      }
    },
    plugins: {
      datalabels: {
        formatter: (value: number, ctx) => {

          let title: any;
          if(ctx !== undefined && ctx.chart !== undefined && ctx.chart.data !== undefined && ctx.chart.data.labels !== undefined) {
            title = ctx.chart.data.labels[ctx.dataIndex];
          }
          //${this.formatSecond(value)}
          const label = `${this.formatSecond(value)}`;
          return label;
        },
      },
    }
  };

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  colors: string[] = [];
  pieChartColors = [{ backgroundColor: this.colors, borderColor: '#434967', borderWidth: 0}];

  habits: IHabit[];
  habitsEntries: {habit: IHabit; entriesInfo: {entry: Date; time: string; rating: number}[]; time: string}[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private habitService: HabitService,
              private journalService: JournalService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.getHabits();
  }

  getHabits(): void {
    this.subscriptions.add(this.habitService.fetch().subscribe((habits) => {
      this.habits = habits;
      this.habits.forEach(habit => {
        this.getHabitEntries(habit);
      });

      this.chart.chart.update();
    }));
  }

  getHabitEntries(habit: IHabit): void {

    this.subscriptions.add(this.journalService.getAllHabitsById(habit._id).subscribe((entries: IJournalEntry[]) => {

      const entriesArray: IJournalEntry[] = [];
      const entriesInfoArray: {entry: Date; time: string; rating: number}[] = [];

      if (habit.hasTimer) {

        entries.forEach((entry: IJournalEntry) => {
          if (entry.done) {
            const newEntry = new JournalEntry(habit._id, this.getIdRecording(habit._id));
            newEntry.parseEntry(entry);

            const rating: number = (newEntry.rating !== undefined) ? newEntry.rating : 0;
            entriesArray.push(newEntry);

            entriesInfoArray.push({
              entry: newEntry.date,
              time: this.formatSecond(newEntry.timer.countTimePassed()),
              rating
            });
          }
        });

        const time: number = (habit.hasTimer) ? this.getPassedTime(entriesArray): 0;
        const color: string = (habit.color !== undefined  && habit.color !== '' && habit.color !== null) ? habit.color : '#755afe';

        this.habitsEntries.push({
          habit,
          entriesInfo: entriesInfoArray,
          time: this.formatSecond(time)
        });

        this.pieChartLabels.push(habit.name);
        this.pieChartData.push(Number(time));
        this.pieChartColors[0].backgroundColor.push(color);
      }

    }));
  }

  getPassedTime(entries: IJournalEntry[]): number {
    let seconds = 0;
    entries.forEach(entry => {
      seconds += entry.timer.countTimePassed();
    });

    return seconds;
  }

  formatSecond(seconds: number): string {
    return moment.utc(seconds*1000).format('HH:mm:ss');
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  private initJournalEntry(id: string, entries: IJournalEntry[]): IJournalEntry[] {

    const tempJournalEntry: IJournalEntry[] = [];

    entries.forEach(entry => {
      const newJournalEntry: IJournalEntry = new JournalEntry(id, this.getIdRecording(id));
      tempJournalEntry.push(newJournalEntry);
    });

    return tempJournalEntry;
  }

  private getIdRecording(id: string): string {
    return moment().format('YYYYMMDD') + id;
  }

}


