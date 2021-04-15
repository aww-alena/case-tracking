import { Timestamp } from './timestamp';

export interface ITimer {
    status: string;
    timestamp: Timestamp[];

    isTimestampEmpty(): boolean;
    isTimestampUndefined(): boolean;

    startTimer(): void;
    stopTimer(status: string): void;
    resetTimer(): void;

    getStatusTimer(): string;
    getTimestampArray(): Array<Timestamp>;
    getStartTimestamp(): Timestamp;
    getLastStartTimestamp(): Date;

    countTimePassed(): number;

    setTimeInTimestamp(index: number, date: Date, nameOfTimeStamp: string): void;

    checkStatusTimer(status: string): boolean;
    deleteTimestamp(index: number): void;
}
