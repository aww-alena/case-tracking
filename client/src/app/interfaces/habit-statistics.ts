export interface HabitStatistics {
    events: CalandarEvent[];
    viewDates: Date[];
    journalData: MainJournalData[];
}

export interface CalandarEvent {
    start: Date;
    color: string;
    title: string;
}

export interface MainJournalData {
    date: Date;
    title: string;
    rating: number;
    time: number;
}
