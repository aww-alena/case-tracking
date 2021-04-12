import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHabit } from 'src/app/interfaces/habit';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<IHabit[]> {
    return this.http.get<IHabit[]>('/api/habit');
  }

  create(habit: IHabit): Observable<IHabit> {
    return this.http.post<IHabit>('/api/habit', habit);
  }

  getById(id: string): Observable<IHabit> {
    return this.http.get<IHabit>(`/api/habit/${id}`);
  }
}
