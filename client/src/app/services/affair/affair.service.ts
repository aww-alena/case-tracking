import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Affair } from 'src/app/interfaces/affair';

@Injectable({
  providedIn: 'root'
})
export class AffairService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Affair[]> {
    return this.http.get<Affair[]>('/api/affair');
  }

  create(affair: Affair): Observable<Affair> {
    return this.http.post<Affair>('/api/affair', affair);
  }

  getById(id: string): Observable<Affair> {
    return this.http.get<Affair>(`/api/affair/${id}`);
  }

}
