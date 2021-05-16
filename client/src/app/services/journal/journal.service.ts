import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient) { }

  create(entry: IJournalEntry): Observable<IJournalEntry> {
    return this.http.post<IJournalEntry>('/api/journal', entry);
  }

  update(entry: IJournalEntry): Observable<IJournalEntry> {
    return this.http.patch<IJournalEntry>(`/api/journal/${entry._id}`, entry);
  }

  getAllEntriesById(id: string): Observable<IJournalEntry[]> {
    return this.http.get<IJournalEntry[]>(`/api/journal/${id}`);
  }

  getById(id: string, idRecording: string): Observable<IJournalEntry> {
    return this.http.get<IJournalEntry>(`/api/journal/${id}/${idRecording}`);
  }

  delete(entry: IJournalEntry): Observable<any> {
    return this.http.delete<any>(`/api/journal/${entry._id}`);
  }
}
