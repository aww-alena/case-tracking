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
      display: true
    },
    plugins: {
      datalabels: {
        formatter: (value: number, ctx) => {

          let title: any;
          if(ctx !== undefined && ctx.chart !== undefined && ctx.chart.data !== undefined && ctx.chart.data.labels !== undefined) {
            title = ctx.chart.data.labels[ctx.dataIndex];
          }
          //${this.formatSecond(value)}
          const label = `${title}`;
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
  pieChartColors = [{ backgroundColor: this.colors}];

  habits: IHabit[];
  habitsEntries: {habit: IHabit; entries: IJournalEntry[]; time: string}[] = [];
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
      console.log(this.pieChartLabels, this.pieChartData, this.pieChartColors[0].backgroundColor);

    }));
  }

  getHabitEntries(habit: IHabit): void {

    this.subscriptions.add(this.journalService.getAllHabitsById(habit._id).subscribe((entries: IJournalEntry[]) => {

      const entriesArray: IJournalEntry[] = [];

      entries.forEach((entry: IJournalEntry) => {
        const newEntry = new JournalEntry(habit._id, this.getIdRecording(habit._id));
        newEntry.parseEntry(entry);
        entriesArray.push(newEntry);
      });

      if (habit.hasTimer) {
        const time: number = (habit.hasTimer) ? this.getPassedTime(entriesArray): 0;
        const color: string = (habit.color !== undefined  && habit.color !== '' && habit.color !== null) ? habit.color : 'red';
        this.habitsEntries.push({ habit, entries: entriesArray, time: this.formatSecond(time) });

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


