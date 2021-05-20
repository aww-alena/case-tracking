import * as moment from 'moment';
import { ITask } from '../interfaces/task';
import { Subtask } from '../interfaces/task';
import { SavedData } from '../interfaces/task';
import { Timer } from './timer';

export class Task {

    public name: string;
    public date: Date;
    public hasTimer: boolean;
    public hasRating: boolean;
    public color: string;
    public icon: string;
    public difficulty: string;
    public comment: string;
    public timeframe: string;
    public user: string;
    public categories: string;
    public _id: string;

    subtasks: Subtask[];
    savedData: SavedData;

    constructor(taskParams: any, date: Date) {
        this.name = taskParams.name;
        this.date = taskParams.date;
        this.hasTimer = taskParams.hasTimer;
        this.hasRating = taskParams.hasRating;
        this.color = taskParams.color;
        this.icon = taskParams.icon;
        this.difficulty = (taskParams.difficulty !== undefined) ? taskParams.difficulty : '';
        this.comment = (taskParams.comment !== undefined) ? taskParams.comment : '';
        this.timeframe = (taskParams.timeframe !== undefined) ? taskParams.timeframe : '';
        this.user = (taskParams.user !== undefined) ? taskParams.user : '';
        this.categories = (taskParams.categories !== undefined) ? taskParams.categories : '';
        this._id = (taskParams._id !== undefined) ? taskParams._id : '';
        this.subtasks = (taskParams.subtasks !== undefined) ? taskParams.subtasks : [];

        this.subtasks.forEach(subtask => {
            if(subtask.timer.status === '') {
                subtask.timer = new Timer('temp', date);
            } else {
                subtask.timer = new Timer(subtask.timer.status, date, subtask.timer.timestamp);
            }
        });

        this.savedData = this.initSavedData(date);

        if (!this.isUndefined(taskParams.savedData)) {

            if (!this.isUndefined(taskParams.savedData.timer)) {
                this.savedData.timer = new Timer(taskParams.savedData.timer.status, taskParams.savedData.timer.timestamp);
            } else {
                this.savedData.timer = new Timer('temp', date);
            }

            this.savedData.done = (!this.isUndefined(taskParams.savedData.done)) ? taskParams.savedData.done : false;

            this.savedData.date = (!this.isUndefined(taskParams.savedData.date)) ? taskParams.savedData.date : null;

            this.savedData.comment = (!this.isUndefined(taskParams.savedData.comment)) ? taskParams.savedData.comment : 0;
        }
    }

    isUndefined(value: any): boolean {
        return (value === undefined) ? true : false;
    }

    initSavedData(date: Date): SavedData {

        const savedData: SavedData = {
            done: false,
            date: moment().toDate(),
            comment: '',
            timer: new Timer('temp', date)
        };

        return savedData;
    }

    isDone(): boolean {
        return (!this.isSavedDataUndefined() && !this.isDoneUndefined() && this.savedData.done) ? true : false;
    }

    isDoneUndefined(): boolean {
        return (this.savedData.done === undefined) ? true : false;
    }

    isSavedDataUndefined(): boolean {
        return (this.savedData === undefined) ? true : false;
    }

    isIdUndefined(): boolean {
        return (this._id === undefined) ? true : false;
    }

    isIconUndefined(): boolean {
        return (this.icon === undefined || this.icon === '') ? true : false;
    }

    getColor(): string {
        return (this.color !== undefined && this.color !== '') ? this.color : '';
    }

    getIcon(): string {
        return (!this.isIconUndefined()) ? this.icon : '';
    }

    setDone(done: boolean): void {
            this.savedData.done = done;
    }

   setDate(date: Date): void {
        this.date = date;
   }

   parse(savedEntry: ITask, date: Date): void {
        this.savedData.done = savedEntry.savedData.done;
        this.savedData.date = savedEntry.savedData.date;
        this.subtasks = savedEntry.subtasks;
        this.subtasks.forEach(subtask => {
            if(subtask.timer.status === '') {
                subtask.timer = new Timer('temp', date);
            } else {
                subtask.timer = new Timer(subtask.timer.status, date, subtask.timer.timestamp);
            }
        });
   }

    countSubtasks(): number {
        return this.subtasks.length;
    }

    countDoneSubtasks(): number {
        let quantity = 0;

        this.subtasks.forEach(subtask => {
            quantity += (subtask.done) ? 1 : 0;
        });

        return quantity;
    }

    countTimePassedSubtasks(): number {
        let seconds = 0;

        this.subtasks.forEach((subtask, index) => {
            if(subtask.timer.status === 'start') {
                seconds += subtask.timer.countTimePassed() + subtask.timer.countFromLastStartToNow();
            } else {
                seconds += subtask.timer.countTimePassed();
            }
        });

        return seconds;
    }

    hasTimeframes(index: number): boolean {
        return (this.subtasks !== [] && this.subtasks[index].date !== null || this.subtasks[index].timeframe !== '-') ? true : false;
    }
}
