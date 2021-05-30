import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryStatistics } from 'src/app/interfaces/category-statistics';
import { IHabit } from 'src/app/interfaces/habit';
import { HabitStatistics } from 'src/app/interfaces/habit-statistics';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';
import { LineChartStatistics } from 'src/app/interfaces/line-chart-statistics';
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getHabitStatistics(habit: IHabit): Observable<HabitStatistics> {
    const color = (habit.color) ?  habit.color.slice(1) : '4660b6';
    return this.http.get<HabitStatistics>(`/api/statistics/habit/${habit._id}?color=${color}`);
  }

  getCategoryStatistics(): Observable<CategoryStatistics> {
    return this.http.get<CategoryStatistics>(`/api/statistics/category`);
  }

  getJournalStatisticsForMonth(date: string): Observable<IJournalEntry[]> {
    return this.http.get<IJournalEntry[]>(`/api/statistics/journal/month?date=${date}`);
  }
}
