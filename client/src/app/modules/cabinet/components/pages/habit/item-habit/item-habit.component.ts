import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';
import { IHabitRecording } from 'src/app/interfaces/habit-recording';
import * as moment from 'moment';
import { JournalService } from 'src/app/services/journal/journal.service';
import { NgForm } from '@angular/forms';
import { JournalEntry } from 'src/app/classes/journal-entry';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-habit',
  templateUrl: './item-habit.component.html',
  styleUrls: ['./item-habit.component.css'],
})
export class ItemHabitComponent implements OnInit, OnDestroy {
  @Input() habitRecording: IHabitRecording;
  today = moment();
  subscriptions: Subscription = new Subscription();

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  markDone(id: string) {

    if (this.habitRecording.entry.done) {
      this.deleteEntry(this.habitRecording.entry);
      this.resetEntry();
    } else {
      this.habitRecording.entry.setDone(true);
      this.habitRecording.entry.setDate(moment().toDate());
      this.saveEntry(this.habitRecording.entry);
    }
  }

  resetEntry(): void {
    this.habitRecording.entry = new JournalEntry(this.habitRecording.habit._id, this.habitRecording.id);
  }

  saveComment(form: NgForm) {
    this.habitRecording.entry.setComment(form.value.note);
    this.updateOrSave();
  }

  saveRating(ratingValue: number): void {

    this.habitRecording.entry.setRating(ratingValue);
    this.habitRecording.entry.setDone(true);

    this.updateOrSave();
  }

  updateEntry(entry: IJournalEntry): void {
    this.subscriptions.add(this.journalService.update(entry).subscribe((newEntry) => {
      this.habitRecording.entry.parseEntry(newEntry);
    }));
  }

  saveEntry(entry: IJournalEntry): void {
    this.subscriptions.add(this.journalService.create(entry).subscribe((newEntry) => {
      this.habitRecording.entry.parseEntry(newEntry);
    }));
  }

  updateOrSave(): void {
    if(!this.habitRecording.entry.isIdUndefined()) {
      this.updateEntry(this.habitRecording.entry);
    } else {
      this.saveEntry(this.habitRecording.entry);
    }
  }

  deleteEntry(entry: IJournalEntry): void {
    this.subscriptions.add(this.journalService.delete(entry).subscribe((message) => {
      this.resetEntry();
    }));
  }

  updateFormField(form: NgForm): void {

    if(this.habitRecording.entry.getComment() !== '') {
      form.setValue({
        note: this.habitRecording.entry.getComment()
      });
    }
  }

  onPlayTime(time: Event): void {

    if(!this.habitRecording.entry.isTimerUndefined()) {
      this.habitRecording.entry.startTimer();
    } else {
      this.habitRecording.entry.initTimer();
    }

    this.updateOrSave();
  }

  onPauseTime(status: string): void {

    if(status === 'stop') {
      this.habitRecording.entry.setDone(true);
      this.habitRecording.entry.setDate(moment().toDate());
      this.habitRecording.entry.stopTimer('stop');
    } else {
      this.habitRecording.entry.stopTimer('pause');
    }

    this.updateOrSave();
  }

  onResetTime(): void {
    this.habitRecording.entry.resetTimer();
    this.updateOrSave();
  }

  onChangeTime(emitData: {entry: IJournalEntry; index: number; time: Date; name: string}): void {
    emitData.entry.setTimeInTimestamp(emitData.index, emitData.time, emitData.name);
    this.updateEntry(emitData.entry);
  }

  onDeleteTimeStamp(emitData: {entry: IJournalEntry; index: number}): void {
    emitData.entry.deleteTimestamp(emitData.index);
    this.updateEntry(emitData.entry);
  }
}
