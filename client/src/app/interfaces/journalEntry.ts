export interface JournalEntry {
    done: boolean;
    date: Date;
    comment?: string;
    timer?: Timer;
    value?: number;
    rate: number;
    habit: string;
    user?: string;
    category?: string;
    idRecording: string;
    _id?: string;
}

export interface Timer {
    minutes?: number;
    status?: string;
    timestamp?: Date;
}
