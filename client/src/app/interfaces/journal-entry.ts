export interface IJournalEntry {
    done: boolean;
    date: Date;
    comment?: string;
    timer?: Timer;
    value?: number;
    rating: number;
    habit: string;
    user?: string;
    category?: string;
    idRecording: string;
    _id?: string;

    isTimerUndefined(): boolean;
    isTimestampUndefined(): boolean;
    isCommentUndefined(): boolean;
    isValueUndefined(): boolean;
    isUserUndefined(): boolean;
    isCategoryUndefined(): boolean;
    isIdUndefined(): boolean;
    isRatingUndefined(): boolean;

    initTimer(): void;

    startTimer(): void;
    stopTimer(status: string): void;
    resetTimer(): void;

    countTimePassed(): number;

    getStartTimestamp(): Timestamp;
    getLastStartTimestamp(): Date;
    getComment(): string;
    getStringDate(): string;
    getRating(): number;

    setTimeInTimestamp(index: number, date: Date, nameOfTimeStamp: string): void;
    setComment(comment: string): void;
    setDone(done: boolean): void;
    setDate(date: Date): void;
    setRating(rate: number): void;

    deleteTimestamp(index: number): void;

    parseEntry(savedEntry: IJournalEntry): void;
}

export interface Timer {
    status: string;
    timestamp: Timestamp[];
}

export interface Timestamp {
    start: Date;
    stop?: Date;
    _id?: string;
}
