import { Component, Input, OnInit } from '@angular/core';
import { IJournalEntry } from 'src/app/interfaces/journalEntry';
import { IHabitRecording } from 'src/app/interfaces/habit-recording';
import * as moment from 'moment';
import { JournalService } from 'src/app/services/journal/journal.service';
import { NgForm } from '@angular/forms';
import { JournalEntry } from 'src/app/classes/journal-entry';

@Component({
  selector: 'app-item-habit',
  templateUrl: './item-habit.component.html',
  styleUrls: ['./item-habit.component.css'],
})
export class ItemHabitComponent implements OnInit {
  @Input() habitRecording: IHabitRecording;
  today = moment();

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {}

  markDone(id: string) {

    if (this.habitRecording.entry.done) {
      this.deleteEntry(this.habitRecording.entry);
      this.resetEntry();
    } else {
      this.habitRecording.entry.done = true;
      this.saveEntry(this.habitRecording.entry);
    }
  }

  resetEntry(): void {
    this.habitRecording.entry = new JournalEntry(this.habitRecording.habit._id, this.habitRecording.id);
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

  updateEntry(entry: IJournalEntry): void {
    this.journalService.update(entry).subscribe((newEntry) => {
      console.log(newEntry);
      this.habitRecording.entry.parseEntry(newEntry);
    });
  }

  saveEntry(entry: IJournalEntry): void {
    this.journalService.create(entry).subscribe((newEntry) => {
      console.log(newEntry);
      this.habitRecording.entry.parseEntry(newEntry);
    });
  }

  deleteEntry(entry: IJournalEntry): void {
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

  getStringDate(habitRecording: IHabitRecording): string {
    return (habitRecording.entry !== undefined) ? moment(habitRecording.entry.date).format('HH:mm').toString() : '';
  }

  updateFormField(form: NgForm): void {

    if(this.habitRecording.entry.getComment() !== '') {
      form.setValue({
        note: this.habitRecording.entry.getComment()
      });
    }
  }

  onPlayTime(time: Event): void {

    if(this.habitRecording.entry.timer !== undefined) {
      this.habitRecording.entry.startTimer();
    } else {
      this.habitRecording.entry.initTimer();
    }

    this.updateOrSave();
  }

  onPauseTime(status: string): void {

    if(status === 'stop') {
      this.habitRecording.entry.done = true;
      this.habitRecording.entry.changeStatus(status);
    } else {
      this.habitRecording.entry.changeStatus('pause');
    }

    this.updateOrSave();
  }

  onStartOverTime(): void {
    this.habitRecording.entry.startOver();

    this.updateOrSave();
  }

}
