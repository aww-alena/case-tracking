import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IHabit } from 'src/app/interfaces/habit';
import { HabitStatistics } from 'src/app/interfaces/habit-statistics';
import { HabitService } from 'src/app/services/habit/habit.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-habit-statistics',
  templateUrl: './habit-statistics.component.html',
  styleUrls: ['./habit-statistics.component.css']
})
export class HabitStatisticsComponent implements OnInit, OnDestroy {

  habits: IHabit[] = [];
  statisticsData: {habit: IHabit; statistics: HabitStatistics}[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private habitService: HabitService,
              private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getHabits();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getHabits(): void {
    this.subscriptions.add(this.habitService.fetch().subscribe((habits) => {
      this.habits = habits;
      this.getStatistics();
    }));
  }

  getStatistics(): void {
    this.habits.forEach((habit: IHabit) => {

      this.subscriptions.add(this.statisticsService.getHabitStatistics(habit).subscribe((statisticsData: HabitStatistics) => {

        const stData = {
          habit,
          statistics: statisticsData
        };

        this.statisticsData.push(stData);
        console.log(this.statisticsData);
      }));

    });
  }

  showHabitsStatistic(habit: any): void {
    console.log(habit);
  }

}
