import * as moment from 'moment';
import { from } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { IHabit } from '../interfaces/habit';
import { IHabitRecording } from '../interfaces/habit-recording';
import { IJournalEntry, Timer } from '../interfaces/journal-entry';
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
