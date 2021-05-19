import { Timestamp } from './timestamp';

export interface ITimer {
    status: string;
    timestamp: Timestamp[];

    isTimestampEmpty(): boolean;
    isTimestampUndefined(): boolean;

    startTimer(date: Date): void;
    stopTimer(status: string, date: Date): void;
    resetTimer(): void;

    getStatusTimer(): string;
    getTimestampArray(): Array<Timestamp>;
    getStartTimestamp(date: Date): Timestamp;
    getLastStartTimestamp(): Date;

    countTimePassed(): number;
    countFromLastStartToNow(): number;

    setTimeInTimestamp(index: number, date: Date, nameOfTimeStamp: string): void;

    checkStatusTimer(status: string): boolean;
    deleteTimestamp(index: number): void;
}
