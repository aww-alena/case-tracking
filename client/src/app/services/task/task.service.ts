import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  fetch(): Observable<ITask[]> {
    return this.http.get<ITask[]>('/api/task');
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>('/api/task', task);
  }

  getById(id: string): Observable<ITask> {
    return this.http.get<ITask>(`/api/task/${id}`);
  }

  update(task: ITask): Observable<ITask> {
    return this.http.patch<ITask>(`/api/task/${task._id}`, task);
  }

  delete(habit: ITask): Observable<string> {
    return this.http.delete<string>(`/api/task/${habit._id}`);
  }
}
