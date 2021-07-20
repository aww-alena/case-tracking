import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAim } from 'src/app/interfaces/aim';

@Injectable({
  providedIn: 'root'
})
export class AimService {

  constructor(private http: HttpClient) {}

  fetch(): Observable<IAim[]> {
    return this.http.get<IAim[]>('/api/aim');
  }

  create(aim: IAim): Observable<IAim> {
    return this.http.post<IAim>('/api/aim', aim);
  }

  getById(id: string): Observable<IAim> {
    return this.http.get<IAim>(`/api/aim/${id}`);
  }

  update(aim: IAim): Observable<IAim> {
    return this.http.patch<IAim>(`/api/aim/${aim._id}`, aim);
  }
}
