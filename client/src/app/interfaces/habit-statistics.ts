import { CalendarEvent } from 'angular-calendar';
export interface HabitStatistics {
    events: CalendarEvent[];
    viewDates: Date[];
    journalData: MainJournalData[];
}
export interface MainJournalData {
    date: Date;
    comment: string;
    rating: number;
    time: number;
}
