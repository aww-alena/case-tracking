import { ITimer } from './timer';
export interface IJournalEntry {
    done: boolean;
    date: Date;
    comment: string;
    timer: ITimer;
    value: number;
    rating: number;
    habit: string;
    user: string;
    category: string;
    idRecording: string;
    _id?: string;

    isTimerUndefined(): boolean;
    isCommentUndefined(): boolean;
    isValueUndefined(): boolean;
    isUserUndefined(): boolean;
    isCategoryUndefined(): boolean;
    isIdUndefined(): boolean;
    isRatingUndefined(): boolean;

    getComment(): string;
    getStringDate(): string;
    getRating(): number;

    setComment(comment: string): void;
    setDone(done: boolean): void;
    setDate(date: Date): void;
    setRating(rate: number): void;

    parseEntry(savedEntry: IJournalEntry, date: Date): void;
}
