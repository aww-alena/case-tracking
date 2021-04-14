import { Timer } from './journal-entry';

export interface ITask {
    name: string;
    date: Date;
    hasTimer: boolean;
    hasRating: boolean;
    color: string;
    icon: string;
    difficulty?: string;
    comment?: string;
    timeframe?: string;
    user?: string;
    categories?: string;
    _id: string;

    subtasks?: Subtask[];
    savedData?: SavedData;
/*
    isIconUndefined(): boolean;
    isCommentUndefined(): boolean;
    isOnSchedule(): boolean;
    isConmmentEmpty(): boolean;
    isTimeframeUndefined(): boolean;
    getIcon(): string;
    getColor(): string;
    getName(): string;
    getComment(): string;
    getTimeframe(): string;

    returnIcon(): any;
    getDifficulty(): string;
    */
}
export interface Subtask {
    date?: Date;
    timeframe?: string;
    name: string;
    note?: string;
    done?: boolean;
    doneDate?: boolean;
    timer?: Timer;
}

export interface SavedData {
    done?: boolean;
    date?: Date;
    comment?: string;
    timer?: Timer;
    value?: number;
    rating?: number;
}
