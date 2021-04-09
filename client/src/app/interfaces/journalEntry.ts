export interface IJournalEntry {
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
    initTimeStamp(): Timestamp;
    initTimer(): void;
    startTimer(): void;
    changeStatus(status: string): void;
    startOver(): void;
    parseEntry(savedEntry: IJournalEntry): void;
    countTimePassed(): number;
    getLastStart(): Date;
    getComment(): string;
    changeTimeInTimeStamp(index: number, date: Date, nameOfTimeStamp: string): void;
    isTimerUndefined(): boolean;
    deleteTimeStamp(index: number): void;
}

export interface Timer {
    status?: string;
    timestamp: Timestamp[];
}

export interface Timestamp {
    start: Date;
    stop?: Date;
    _id?: string;
}
