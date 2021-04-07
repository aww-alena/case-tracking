import { Component, Input, OnInit } from '@angular/core';
import { Habit } from 'src/app/interfaces/habit';
import { JournalEntry } from 'src/app/interfaces/journalEntry';
import { HabitRecording } from 'src/app/interfaces/habit-recording';
import * as moment from 'moment';
import { JournalService } from 'src/app/services/journal/journal.service';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { moveSyntheticComments } from 'typescript';

@Component({
  selector: 'app-item-habit',
  templateUrl: './item-habit.component.html',
  styleUrls: ['./item-habit.component.css'],
})
export class ItemHabitComponent implements OnInit {
  @Input() habitRecording: HabitRecording;
  today = moment();

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {}

  markDone(id: string) {

    if (this.habitRecording.entry.done) {
      this.resetEntry();
      this.deleteEntry(this.habitRecording.entry);
    } else {
      this.habitRecording.entry.done = true;
      this.saveEntry(this.habitRecording.entry);
    }
  }

  resetEntry(): void {
    this.habitRecording.entry.rate = 0;
    this.habitRecording.entry.done = false;
  }

  saveComment(form: NgForm) {
    this.habitRecording.entry.comment = form.value.note;
    this.updateOrSave();
  }

  saveRating(ratingValue: number): void {

    this.habitRecording.entry.rate = ratingValue;
    this.habitRecording.entry.done = true;

    this.updateOrSave();
  }

  updateEntry(entry: JournalEntry): void {
    this.journalService.update(entry).subscribe((newEntry) => {
      console.log(newEntry);
      this.habitRecording.entry = newEntry;
    });
  }

  saveEntry(entry: JournalEntry): void {
    this.journalService.create(entry).subscribe((newEntry) => {
      console.log(newEntry);
      this.habitRecording.entry = newEntry;
    });
  }

  deleteEntry(entry: JournalEntry): void {
    this.journalService.delete(entry).subscribe((message) => {
      console.log(message);
      this.resetEntry();
    });
  }

  updateOrSave(): void {

    if(this.habitRecording.entry._id !== undefined) {
      this.updateEntry(this.habitRecording.entry);
    } else {
      this.saveEntry(this.habitRecording.entry);
    }
  }

  isOnSchedule(): boolean {
    let include = false;
    if (this.habitRecording.habit.schedule === '' || this.habitRecording.habit.schedule === null) {
      include = true;
    } else {
      const todayString = String(this.today.isoWeekday());
      include = this.habitRecording.habit.schedule.includes(todayString);
    }

    return include;
  }

  isCommentExist(comment: any): boolean {
    return (comment !== undefined && comment !== '') ? true : false;
  }

  getRating(): number {
    let rating = 0;
    if(this.habitRecording.entry !== undefined && this.habitRecording.entry.rate !== undefined) {
      rating = this.habitRecording.entry.rate;
    }
    return rating;
  }

  getComment(comments: any): string {
    const day = this.today.isoWeekday();
    let note = '';

    if (comments !== null) {
      const notes = JSON.parse(comments);
      note = notes[day];
    }

    return note;
  }

  getStringDate(habitRecording: HabitRecording): string {
    return (habitRecording.entry !== undefined) ? moment(habitRecording.entry.date).format('HH:mm').toString() : '';
  }

  getNote(): string {

    let note = '';

    if (this.habitRecording.entry !== undefined && this.habitRecording.entry.comment !== undefined) {
      note = this.habitRecording.entry.comment;
    }

    return note;
  }

  updateFormField(form: NgForm): void {
    if(this.habitRecording.entry !== undefined && this.habitRecording.entry.comment !== undefined) {
      form.setValue({
        note: this.habitRecording.entry.comment
      });
    }
  }

  onPlayTime(time: Event): void {
    console.log('start', time);

    this.habitRecording.entry.timer = {
      timestamp: moment().toDate()
    };

    if(this.habitRecording.entry.done) {
      this.updateEntry(this.habitRecording.entry);
    } else {
      this.saveEntry(this.habitRecording.entry);
    }
  }

  onPauseTime(): void {
    console.log('pause');
  }

  onStartOverTime(): void {
    console.log('startOver');
  }

}
