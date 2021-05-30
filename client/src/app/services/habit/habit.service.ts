import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHabit } from 'src/app/interfaces/habit';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  habits: IHabit[];
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

  update(habit: IHabit): Observable<IHabit> {
    return this.http.patch<IHabit>(`/api/habit/${habit._id}`, habit);
  }

  delete(habit: IHabit): Observable<string> {
    return this.http.delete<string>(`/api/habit/${habit._id}`);
  }
}
