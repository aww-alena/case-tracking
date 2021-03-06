import * as moment from 'moment';
import { Timestamp } from '../interfaces/timestamp';
import { ITimer } from '../interfaces/timer';

export class Timer implements ITimer {

    status: string;
    timestamp: Timestamp[];

    constructor(status: string, date: Date, timestamp?: Timestamp[]) {
        this.status = status;
        this.timestamp = (timestamp !== undefined) ? timestamp : [this.getStartTimestamp(date)];
    }


    isTimestampUndefined(): boolean {
        return (this.timestamp === undefined) ? true : false;
    }

    isTimestampEmpty(): boolean {
        const empty = (this.status === 'temp') ? true : false;

        return empty;
    }


    getTimestampArray(): Array<Timestamp> {
        return (!this.isTimestampUndefined()) ? this.timestamp : [];
    }

    getStartTimestamp(date: Date): Timestamp {
        const timestamp: Timestamp = {
            start: date
        };

        return timestamp;
    }

    getStatusTimer(): string {
        return (!this.isTimestampUndefined()) ? this.status : '';
    }

    startTimer(date: Date): void {

        this.timestamp = (this.status === 'temp') ? [] : this.timestamp;

        if (this.status !== 'start') {

            this.status = 'start';
            this.timestamp.push(this.getStartTimestamp(date));
        }
    }

    stopTimer(status: string, date: Date): void {

        if (this.status === 'start') {
            this.status = status;

            if (!this.isTimestampUndefined()) {
                const timestamps = this.timestamp;
                this.timestamp[timestamps.length - 1].stop = date;
            }
        }
    }

    resetTimer(): void {
        this.status = 'startOver';

        if (!this.isTimestampUndefined()) {
            this.timestamp = [];
        }
    }

    countTimePassed(): number {
        let seconds = 0;

        if(!this.isTimestampUndefined()) {

            const timestamps: Array<Timestamp> = this.timestamp;

            timestamps.forEach(time => {
                const start = moment(time.start);
                const stop = moment(time.stop);

                seconds += (time.stop !== undefined) ? stop.diff(start, 'seconds') : 0;
            });
        }

        return seconds;
    }

    getLastStartTimestamp(): Date {

        if(!this.isTimestampUndefined()) {

            const timestamps: Array<Timestamp> = this.timestamp;
            return timestamps[timestamps.length - 1].start;

        } else {
            return new Date();
        }
    }

    countFromLastStartToNow(): number {

        const startTime = moment(this.getLastStartTimestamp());
        const stopTime = moment(moment());

        const seconds = stopTime.diff(startTime, 'seconds');

        return seconds;
    }

    setTimeInTimestamp(index: number, date: Date, statusOfTimer: string): void {
        if(statusOfTimer === 'start') {
            this.timestamp[index].start = date;
        } else {
            this.timestamp[index].stop = date;
        }
    }

    deleteTimestamp(index: number): void {
        if (this.timestamp.length - 1 === index) {
            this.status = '';
        }

        this.timestamp.splice(index, 1);
    }

    checkStatusTimer(status: string): boolean {
        return (this.status === status) ? true : false;
    }
}
