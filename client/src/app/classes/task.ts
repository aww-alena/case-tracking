import * as moment from 'moment';
import { ITask } from '../interfaces/task';
import { Subtask } from '../interfaces/task';
import { SavedData } from '../interfaces/task';

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

    subtasks?: Subtask[];
    savedData: SavedData;

    constructor(habitObj: any) {
        this.name = habitObj.name;
        this.date = habitObj.date;
        this.hasTimer = habitObj.hasTimer;
        this.hasRating = habitObj.hasRating;
        this.color = habitObj.color;
        this.icon = habitObj.icon;
        this.difficulty = (habitObj.difficulty !== undefined) ? habitObj.difficulty : '';
        this.comment = (habitObj.comment !== undefined) ? habitObj.comment : '';
        this.timeframe = (habitObj.timeframe !== undefined) ? habitObj.timeframe : '';
        this.user = (habitObj.user !== undefined) ? habitObj.user : '';
        this.categories = (habitObj.categories !== undefined) ? habitObj.categories : '';
        this._id = (habitObj._id !== undefined) ? habitObj._id : '';
        this.subtasks = (habitObj.subtasks !== undefined) ? habitObj.subtasks : '';
    }
}
