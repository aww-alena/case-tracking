
import { JournalEntry } from './journalEntry';
import { Habit } from './habit';

export interface HabitRecording {
    habit: Habit;
    entry: JournalEntry;
    id: string;
}
