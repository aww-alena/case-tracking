
import { IJournalEntry } from './journalEntry';
import { Habit } from './habit';

export interface IHabitRecording {
    habit: Habit;
    entry: IJournalEntry;
    id: string;
}
