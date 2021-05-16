import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';
import { IHabitRecording } from 'src/app/interfaces/habit-recording';
import * as moment from 'moment';
import { JournalService } from 'src/app/services/journal/journal.service';
import { NgForm } from '@angular/forms';
import { JournalEntry } from 'src/app/classes/journal-entry';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message-service/message.service';

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

  constructor(private journalService: JournalService, private router: Router, private messageService: MessageService) {}

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
    } else {
      this.habitRecording.entry.setDate(moment().toDate());

      const tempEntry = this.getCopyEntry();
      tempEntry.setDone(true);
      this.updateOrSave(tempEntry);
    }
  }

  resetEntry(): void {
    this.habitRecording.entry = new JournalEntry(this.habitRecording.habit._id, this.habitRecording.id);
  }

  saveComment(form: NgForm) {
    this.habitRecording.entry.setComment(form.value.note);
    this.updateOrSave(this.habitRecording.entry);
  }

  saveRating(ratingValue: number): void {

    this.habitRecording.entry.setRating(ratingValue);

    if(!this.habitRecording.entry.done) {
      this.habitRecording.entry.setDate(moment().toDate());
    }

    const tempEntry = this.getCopyEntry();
    tempEntry.setDone(true);

    this.updateOrSave(tempEntry);
  }

  updateEntry(entry: IJournalEntry): void {
    this.subscriptions.add(this.journalService.update(entry).subscribe((newEntry) => {
      this.messageService.showMessage('The entry was successfully updated', 'Success');
      this.habitRecording.entry.parseEntry(newEntry);
    },
    (error) => {
      this.messageService.showError(error.error.message, 'Uuups! Error');
    }));
  }

  saveEntry(entry: IJournalEntry): void {
    this.subscriptions.add(this.journalService.create(entry).subscribe((newEntry) => {
      this.messageService.showMessage('The entry was successfully saved', 'Success');
      this.habitRecording.entry.parseEntry(newEntry);
    },
    (error) => {
      this.messageService.showError(error.error.message, 'Uuups! Error');
    }));
  }

  updateOrSave(entry: IJournalEntry): void {
    if(!entry.isIdUndefined()) {
      this.updateEntry(entry);
    } else {
      this.saveEntry(entry);
    }
  }

  deleteEntry(entry: IJournalEntry): void {
    this.subscriptions.add(this.journalService.delete(entry).subscribe((message) => {
      this.messageService.showMessage(message.message, 'Success');
      this.resetEntry();
    },
    (error) => {
      this.messageService.showError(error.error.message, 'Uuups! Error');
    }
    ));
  }

  getCopyEntry(): IJournalEntry {

    const tempEntry = new JournalEntry(this.habitRecording.habit._id, this.habitRecording.id);
    tempEntry.parseEntry(this.habitRecording.entry);

    return tempEntry;
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
    this.updateOrSave(this.habitRecording.entry);
  }

  onPauseTime(status: string): void {

    let tempEntry: IJournalEntry;

    if(status === 'stop') {

      this.habitRecording.entry.setDate(moment().toDate());
      this.habitRecording.entry.timer.stopTimer('stop');

      tempEntry = this.getCopyEntry();
      tempEntry.setDone(true);
    } else {
      this.habitRecording.entry.timer.stopTimer('pause');
      tempEntry = this.getCopyEntry();
    }

    this.updateOrSave(tempEntry);
  }

  onResetTime(): void {
    this.habitRecording.entry.timer.resetTimer();
    this.updateOrSave(this.habitRecording.entry);
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
