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

    constructor(taskParams: any) {
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
        this.subtasks = (taskParams.subtasks !== undefined) ? taskParams.subtasks : '';

        this.savedData = this.initSavedData();

        if(taskParams.savedData !== undefined && taskParams.savedData.timer !== undefined) {
            this.savedData.timer = new Timer(taskParams.savedData.timer.status, taskParams.savedData.timer.timestamp);
        }
    }

    initSavedData(): SavedData {

        const savedData: SavedData = {
            done: false,
            date: moment().toDate(),
            comment: '',
            timer: new Timer('temp'),
            value: 0,
            rating: 0
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

   setDone(done: boolean): void {
        this.savedData.done = done;
   }

   setDate(date: Date): void {
        this.date = date;
   }

   parse(savedEntry: ITask): void {
    this.savedData.done = savedEntry.savedData.done;
    this.savedData.date = savedEntry.savedData.date;
    this.savedData.rating = savedEntry.savedData.rating;
   }
}
