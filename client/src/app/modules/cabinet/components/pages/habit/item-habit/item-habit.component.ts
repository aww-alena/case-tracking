import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';
import { IHabitRecording } from 'src/app/interfaces/habit-recording';
import * as moment from 'moment';
import { JournalService } from 'src/app/services/journal/journal.service';
import { NgForm } from '@angular/forms';
import { JournalEntry } from 'src/app/classes/journal-entry';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-habit',
  templateUrl: './item-habit.component.html',
  styleUrls: ['./item-habit.component.css'],
})
export class ItemHabitComponent implements OnInit, OnDestroy {
  @Input() habitRecording: IHabitRecording;
  today = moment();
  subscriptions: Subscription = new Subscription();
  tabName = 'close';

  constructor(private journalService: JournalService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  tabIsChange(event: any): void {
    this.tabName = event.tab.textLabel;

    if (this.tabName === 'edit' ) {
      this.router.navigate([`app/habits/${this.habitRecording.habit._id}`]);
    }
  }

  markDone(id: string) {

    if (this.habitRecording.entry.done) {
      this.deleteEntry(this.habitRecording.entry);
      this.resetEntry();
    } else {
      this.habitRecording.entry.setDone(true);
      this.habitRecording.entry.setDate(moment().toDate());
      this.updateOrSave();
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
      console.log('update: ', newEntry);
    }));
  }

  saveEntry(entry: IJournalEntry): void {
    this.subscriptions.add(this.journalService.create(entry).subscribe((newEntry) => {
      this.habitRecording.entry.parseEntry(newEntry);
      console.log('save: ', newEntry);
    }));
  }

  updateOrSave(): void {
    console.log('update or save: ', this.habitRecording.entry);
    if(!this.habitRecording.entry.isIdUndefined()) {
      this.updateEntry(this.habitRecording.entry);
    } else {
      this.saveEntry(this.habitRecording.entry);
    }
  }

  deleteEntry(entry: IJournalEntry): void {
    console.log('delete');

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
    this.habitRecording.entry.timer.startTimer();
    this.updateOrSave();
  }

  onPauseTime(status: string): void {

    if(status === 'stop') {
      this.habitRecording.entry.setDone(true);
      this.habitRecording.entry.setDate(moment().toDate());
      this.habitRecording.entry.timer.stopTimer('stop');
    } else {
      this.habitRecording.entry.timer.stopTimer('pause');
    }

    this.updateOrSave();
  }

  onResetTime(): void {
    this.habitRecording.entry.timer.resetTimer();
    this.updateOrSave();
  }

  onChangeTime(emitData: {index: number; time: Date; name: string}): void {
    this.habitRecording.entry.timer.setTimeInTimestamp(emitData.index, emitData.time, emitData.name);
    this.updateEntry(this.habitRecording.entry);
  }

  onDeleteTimeStamp(index: number): void {

    this.habitRecording.entry.timer.deleteTimestamp(index);
    this.updateEntry(this.habitRecording.entry);
  }
}
