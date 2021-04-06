export interface JournalEntry {
    date: Date;
    comment?: string;
    timer?: Timer;
    value?: number;
    rate?: number;
    habit: string;
    user?: string;
    category?: string;
    idRecording: string;
}

export interface Timer {
    minutes: number;
    status: string;
    timestamp: Date;
}
