import * as moment from 'moment';
import { IHabit } from '../interfaces/habit';
import { IHabitRecording } from '../interfaces/habit-recording';
import { Habit } from './habit';
import { JournalEntry } from './journal-entry';

export class HabitRecording implements IHabitRecording {
    public habit: Habit;
    public entry: JournalEntry;
    public id: string;

    constructor(habit: IHabit) {
        const idRecording = this.getIdRecording(habit._id);
        this.habit = new Habit(habit);
        this.id = idRecording;
        this.entry = new JournalEntry(habit._id, idRecording);
    }

    private getIdRecording(id: string): string {
        return moment().format('YYYYMMDD') + id;
    }
}
