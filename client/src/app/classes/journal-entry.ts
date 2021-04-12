import * as moment from 'moment';
import { IJournalEntry, Timer, Timestamp } from '../interfaces/journal-entry';

export class JournalEntry implements IJournalEntry {

    public done: boolean;
    public date: Date;
    public comment: string;
    public timer: Timer;
    public value: number;
    public rating: number;
    public habit: string;
    public user: string;
    public category: string;
    public idRecording: string;
    public _id: string;

    constructor(habitID: string, id: string) {
        this.done = false;
        this.idRecording = id;
        this.habit = habitID;
        this.date = moment().toDate();
        this.rating = 0;
    }

    isTimerUndefined(): boolean {
        return (this.timer === undefined) ? true : false;
    }

    isTimestampUndefined(): boolean {
        return (this.timer.timestamp === undefined) ? true : false;
    }

    isCommentUndefined(): boolean {
        return (this.comment === undefined) ? true : false;
    }

    isValueUndefined(): boolean {
        return (this.value === undefined) ? true : false;
    }

    isUserUndefined(): boolean {
        return (this.user === undefined) ? true : false;
    }

    isCategoryUndefined(): boolean {
        return (this.category === undefined) ? true : false;
    }

    isIdUndefined(): boolean {
        return (this._id === undefined) ? true : false;
    }

    isRatingUndefined(): boolean {
        return (this.rating === undefined) ? true : false;
    }

    initTimer(): void {
        this.timer = {
            status: 'start',
            timestamp: [this.getStartTimestamp()]
        };
    }

    getStringDate(): string {
        return moment(this.date).format('HH:mm').toString();
    }

    getRating(): number {
        return (!this.isRatingUndefined()) ? this.rating : 0;
    }

    getStartTimestamp(): Timestamp {
        const timestamp: Timestamp = {
            start: moment().toDate()
        };

        return timestamp;
    }

    startTimer(): void {
        if(!this.isTimerUndefined() && !this.isTimestampUndefined()) {

            if (this.timer.status !== 'start') {

                this.timer.status = 'start';
                this.timer.timestamp.push(this.getStartTimestamp());
            }
        } else {
            this.initTimer();
        }
    }

    stopTimer(status: string): void {

        if (this.timer.status === 'start') {
            this.timer.status = status;

            if (!this.isTimestampUndefined()) {
                const timestamps = this.timer.timestamp;
                this.timer.timestamp[timestamps.length - 1].stop = moment().toDate();
            }
        }
    }

    resetTimer(): void {
        this.timer.status = 'startOver';

        if (!this.isTimestampUndefined()) {
            this.timer.timestamp = [];
        }
    }

    countTimePassed(): number {
        let seconds = 0;

        if(!this.isTimerUndefined() && !this.isTimestampUndefined()) {

            const timestamps: Array<Timestamp> = this.timer.timestamp;

            timestamps.forEach(time => {
                const start = moment(time.start);
                const stop = moment(time.stop);


                seconds += (time.stop !== undefined) ? stop.diff(start, 'seconds') : 0;
            });
        }

        return seconds;
    }

    getComment(): string {
        return (!this.isCommentUndefined()) ? this.comment : '';
    }

    getLastStartTimestamp(): Date {

        if(!this.isTimerUndefined() && !this.isTimestampUndefined()) {

            const timestamps: Array<Timestamp> = this.timer.timestamp;
            return timestamps[timestamps.length - 1].start;

        } else {
            return new Date();
        }
    }

    setTimeInTimestamp(index: number, date: Date, statusOfTimer: string): void {
        if(!this.isTimerUndefined()) {
            if(statusOfTimer === 'start') {
                this.timer.timestamp[index].start = date;
            } else {
                this.timer.timestamp[index].stop = date;
            }
        }
    }

    setComment(comment: string): void {
        this.comment = comment;
    }

    setDone(done: boolean): void {
        this.done = done;
    }

    setDate(date: Date): void {
        this.date = date;
    }

    setRating(rating: number): void {
        this.rating = rating;
    }

    deleteTimestamp(index: number): void {
        if(!this.isTimerUndefined()) {

            if (this.timer.timestamp.length - 1 === index) {
                this.timer.status = '';
            }

            this.timer.timestamp.splice(index, 1);
        }
    }

    parseEntry(savedEntry: IJournalEntry): void {
        this.done = savedEntry.done;
        this.date = savedEntry.date;
        this.rating = savedEntry.rating;
        this.habit = savedEntry.habit;
        this.idRecording = savedEntry.idRecording;

        if(savedEntry.comment !== undefined) {
            this.comment = savedEntry.comment;
        }

        if(savedEntry.timer !== undefined) {
            this.timer = savedEntry.timer;
        }

        if(savedEntry.value !== undefined) {
            this.value = savedEntry.value;
        }

        if(savedEntry.user !== undefined) {
            this.user = savedEntry.user;
        }

        if(savedEntry.category !== undefined) {
            this.category = savedEntry.category;
        }

        if(savedEntry._id !== undefined) {
            this._id = savedEntry._id;
        }
    }
}
