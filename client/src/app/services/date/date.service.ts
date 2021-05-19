import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDate(today: string): Date {
    const now = new Date();
    const date = new Date(today);

    const combinedDate = new Date(
      date.getFullYear(), date.getMonth(), date.getDate(),
      now.getHours(), now.getMinutes(), now.getSeconds()
    );

    return combinedDate;
  }

  getCombinedDate(today: string, time: Date): Date {
    const date = new Date(today);

    const combinedDate = new Date(
      date.getFullYear(), date.getMonth(), date.getDate(),
      time.getHours(), time.getMinutes(), time.getSeconds()
    );

    return combinedDate;
  }
}
