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
    _id: string;

    subtasks: Subtask[];
    savedData: SavedData;

   isDone(): boolean;
   isDoneUndefined(): boolean;
   isSavedDataUndefined(): boolean;
   isIdUndefined(): boolean;
   isIconUndefined(): boolean;

   getColor(): string;
   getIcon(): string;

   initSavedData(date: Date): SavedData;

   setDone(done: boolean): void;
   setDate(date: Date): void;

   parse(savedEntry: ITask, date: Date): void;

   countSubtasks(): number;
   countDoneSubtasks(): number;
   countTimePassedSubtasks(): number;
   hasTimeframes(index: number): boolean;
}
export interface Subtask {
    date: Date;
    timeframe: string;
    name: string;
    note: string;
    done: boolean;
    doneDate: Date;
    timer: ITimer;
    _id?: string;
}

export interface SavedData {
    done: boolean;
    date: Date;
    comment: string;
    timer: ITimer;
}
