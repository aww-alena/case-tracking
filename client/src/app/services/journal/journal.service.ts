import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JournalEntry } from 'src/app/interfaces/journalEntry';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient) { }

  create(entry: JournalEntry): Observable<JournalEntry> {
    return this.http.post<JournalEntry>('/api/journal', entry);
  }

  update(entry: JournalEntry): Observable<JournalEntry> {
    return this.http.patch<JournalEntry>(`/api/journal/${entry._id}`, entry);
  }

  getById(id: string, idRecording: string): Observable<JournalEntry> {
    return this.http.get<JournalEntry>(`/api/journal/${id}/${idRecording}`);
  }

  delete(entry: JournalEntry): Observable<string> {
    return this.http.delete<string>(`/api/journal/${entry._id}`);
  }
}
