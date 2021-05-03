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
        this.comment = this.getComment(habitObj.comment);
        this.timeframe = (habitObj.timeframe !== undefined) ? habitObj.timeframe : '';
        this.user = (habitObj.user !== undefined) ? habitObj.user : '';
        this.categories = (habitObj.categories !== undefined) ? habitObj.categories : '';
        this._id = (habitObj._id !== undefined) ? habitObj._id : '';
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

    getComment(habitComment: string): string {
        let comment = '';

        if (habitComment) {
            const day = moment().isoWeekday();
            if (this.isJsonString(habitComment)) {
                const notes = JSON.parse(habitComment);
                comment = (notes.note) ? notes.note : notes[day];
            } else {
                comment = habitComment;
            }
        }

        return comment;
    }

    isJsonString(value: string): boolean {
        try {
            JSON.parse(value);
        } catch (e) {
            return false;
        }
        return true;
    }
}
