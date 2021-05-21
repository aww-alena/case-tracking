import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  public monthViewColumnHeader({ date, locale = 'en' }: DateFormatterParams): string {
    return formatDate(date, 'EEEEEE', locale);
  }

  public monthViewTitle({ date, locale = 'en' }: DateFormatterParams): string {
    return formatDate(date, 'MMM y', locale);
  }

  public weekViewColumnHeader({ date, locale = 'en' }: DateFormatterParams): string {
    return formatDate(date, 'EEEEEE', locale);
  }

  public dayViewHour({ date, locale = 'en' }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale);
  }
}
