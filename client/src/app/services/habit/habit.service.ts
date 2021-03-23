import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habit } from 'src/app/interfaces/habit';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Habit[]> {
    return this.http.get<Habit[]>('/api/habit');
  }

  create(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>('/api/habit', habit);
  }

  getById(id: string): Observable<Habit> {
    return this.http.get<Habit>(`/api/habit/${id}`);
  }
}
