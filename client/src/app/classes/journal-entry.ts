import * as moment from 'moment';
import { IJournalEntry } from '../interfaces/journal-entry';
import { Timestamp } from '../interfaces/timestamp';
import { ITimer } from '../interfaces/timer';
import { Timer } from './timer';
export class JournalEntry implements IJournalEntry {

    public done: boolean;
    public date: Date;
    public comment: string;
    public timer: ITimer;
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
        this.timer = new Timer('temp');
    }

    isTimerUndefined(): boolean {
        return (this.timer === undefined) ? true : false;
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

    getStringDate(): string {
        return moment(this.date).format('HH:mm').toString();
    }

    getRating(): number {
        return (!this.isRatingUndefined()) ? this.rating : 0;
    }

    getComment(): string {
        return (!this.isCommentUndefined()) ? this.comment : '';
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
            this.timer = new Timer(savedEntry.timer.status, savedEntry.timer.timestamp);
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
