import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryStatistics } from 'src/app/interfaces/category-statistics';
import { IHabit } from 'src/app/interfaces/habit';
import { HabitStatistics } from 'src/app/interfaces/habit-statistics';
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
}
