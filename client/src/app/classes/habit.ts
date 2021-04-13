import * as moment from 'moment';
import { IHabit } from '../interfaces/habit';

export class Habit implements IHabit {

    public name: string;
    public schedule: string;
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

    constructor(habitObj: any) {
        this.name = habitObj.name;
        this.schedule = habitObj.schedule;
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
    }

    isIconUndefined(): boolean {
        return (this.icon === undefined || this.icon === '') ? true : false;
    }

    returnIcon(): any {
        return this.icon;
    }

    isConmmentEmpty(): boolean {
        return (this.comment === '') ? true : false;
    }

    isTimeframeUndefined(): boolean {
        return (this.timeframe === undefined) ? true : false;
    }

    isCommentUndefined(): boolean {
        return (this.comment === undefined) ? true : false;
    }

    isOnSchedule(): boolean {
        let include = false;
        if (this.schedule === '' || this.schedule === null) {
          include = true;
        } else {
          const todayString = String(moment().isoWeekday());
          include = this.schedule.includes(todayString);
        }

        return include;
    }

    getIcon(): string {
        return (!this.isIconUndefined()) ? this.icon : '';
    }

    getColor(): string {
        return (this.color !== undefined && this.color !== '') ? this.color : '';
    }

    getName(): string {
        return '';
    }

    getComment(): string {
        const day = moment().isoWeekday();
        let note = '';

        if (this.comment !== null && this.comment !== '') {
          const notes = JSON.parse(this.comment);
          note = notes[day];
        }

        return note;
    }

    getTimeframe(): string {
        return (!this.isTimeframeUndefined()) ? this.timeframe : '';
    }

    getDifficulty(): string {
        return (this.difficulty !== undefined && this.difficulty !== '') ? this.difficulty : '';
    }
}
