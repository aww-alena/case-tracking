import * as moment from 'moment';
import { from } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Habit } from '../interfaces/habit';
import { IHabitRecording } from '../interfaces/habit-recording';
import { IJournalEntry, Timer } from '../interfaces/journalEntry';
import { JournalEntry } from './journal-entry';

export class HabitRecording implements IHabitRecording {
    public habit: Habit;
    public entry: JournalEntry;
    public id: string;

    constructor(habit: Habit) {
        const idRecording = this.getIdRecording(habit._id);
        this.habit = habit;
        this.id = idRecording;
        this.entry = new JournalEntry(habit._id, idRecording);
    }

    private getIdRecording(id: string): string {
        return moment().format('YYYYMMDD') + id;
    }
}
