import { ITimer } from './timer';

export interface ITask {
    name: string;
    date: Date;
    hasTimer: boolean;
    hasRating: boolean;
    color: string;
    icon: string;
    difficulty: string;
    comment: string;
    timeframe: string;
    user: string;
    categories: string;
    _id?: string;

    subtasks: Subtask[];
    savedData: SavedData;

   isDone(): boolean;
   isDoneUndefined(): boolean;
   isSavedDataUndefined(): boolean;
   isIdUndefined(): boolean;

   setDone(done: boolean): void;
   setDate(date: Date): void;

   parse(savedEntry: ITask): void;
}
export interface Subtask {
    date: Date;
    timeframe: string;
    name: string;
    note: string;
    done: boolean;
    doneDate: Date;
    timer: ITimer;
}

export interface SavedData {
    done: boolean;
    date: Date;
    comment: string;
    timer: ITimer;
    value: number;
    rating: number;
}
