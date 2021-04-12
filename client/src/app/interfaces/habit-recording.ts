
import { IJournalEntry } from './journal-entry';
import { IHabit } from './habit';

export interface IHabitRecording {
    habit: IHabit;
    entry: IJournalEntry;
    id: string;

    isIconUndefined(): boolean;
}
