import * as moment from 'moment';
import { IJournalEntry, Timer, Timestamp } from '../interfaces/journalEntry';

export class JournalEntry implements IJournalEntry {

    public done: boolean;
    public date: Date;
    public comment: string;
    public timer: Timer;
    public value: number;
    public rate: number;
    public habit: string;
    public user: string;
    public category: string;
    public idRecording: string;
    public _id: string;

    constructor(habitID: string, id: string) {
        this.done = false;
        this.idRecording = id;
        this.habit = habitID;
        this.date = moment().toDate();
        this.rate = 0;
    }

    getComment(): string {
        return (this.comment !== undefined) ? this.comment : '';
    }

    initTimer(): void {
        this.timer = {
            status: 'start',
            timestamp: [this.initTimeStamp()]
          };
    }

    startTimer(): void {
        if(this.timer !== undefined && this.timer.timestamp !== undefined) {
            if(this.timer.status !== 'start') {

                const timeStamp: Array<Timestamp> = this.timer.timestamp;
                timeStamp.push(this.initTimeStamp());

                this.timer = {
                    status: 'start',
                    timestamp: timeStamp
                  };
            }
        }
    }

    initTimeStamp(): Timestamp {
        const timeStamp: Timestamp = {
            start: moment().toDate()
          };

          return timeStamp;
    }

    changeStatus(status: string): void {

        if (this.timer.status === 'start') {
            this.timer.status = status;

            if (this.timer.timestamp !== undefined) {
                const timestamps = this.timer.timestamp;
                this.timer.timestamp[timestamps.length - 1].stop = moment().toDate();
            }
        }
    }

    startOver(): void {
        this.timer.status = 'startOver';

        if (this.timer.timestamp !== undefined) {
            this.timer.timestamp = [];
        }
    }

    countTimePassed(): number {
        let seconds = 0;

        if(this.timer !== undefined && this.timer.timestamp !== undefined) {

            const timeStamp: Array<Timestamp> = this.timer.timestamp;

            timeStamp.forEach(time => {
                const start = moment(time.start);
                const stop = moment(time.stop);


                seconds += (time.stop !== undefined) ? stop.diff(start, 'seconds') : 0;
            });
        }

        return seconds;
    }

    getLastStart(): Date {

        if(this.timer !== undefined && this.timer.timestamp !== undefined) {

            const timeStamp: Array<Timestamp> = this.timer.timestamp;
            return timeStamp[timeStamp.length - 1].start;

        } else {
            return new Date();
        }
    }

    parseEntry(savedEntry: IJournalEntry): void {
        this.done = savedEntry.done;
        this.date = savedEntry.date;
        this.rate = savedEntry.rate;
        this.habit = savedEntry.habit;
        this.idRecording = savedEntry.idRecording;

        if(savedEntry.comment !== undefined) {
            this.comment = savedEntry.comment;
        }

        if(savedEntry.timer !== undefined) {
            this.timer = savedEntry.timer;
        }

        if(savedEntry.value !== undefined) {
            this.value = savedEntry.value;
        }

        if(savedEntry.user !== undefined) {
            this.user = savedEntry.user;
        }

        if(savedEntry.category !== undefined) {
            this.category = savedEntry.category;
        }

        if(savedEntry._id !== undefined) {
            this._id = savedEntry._id;
        }
    }
}
