import * as moment from 'moment';
import { IHabit } from '../interfaces/habit';
import { IHabitRecording } from '../interfaces/habit-recording';
import { Habit } from './habit';
import { JournalEntry } from './journal-entry';

export class HabitRecording implements IHabitRecording {
    public habit: Habit;
    public entry: JournalEntry;
    public id: string;

    constructor(habit: IHabit, date: string) {
        const idRecording = date + habit._id;
        this.habit = new Habit(habit);
        this.id = idRecording;
        this.entry = new JournalEntry(habit._id, idRecording, new Date(date));
    }
}
