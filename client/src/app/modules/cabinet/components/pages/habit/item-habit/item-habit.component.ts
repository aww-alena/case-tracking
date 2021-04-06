import { Component, Input, OnInit } from '@angular/core';
import { Habit } from 'src/app/interfaces/habit';
import { JournalEntry } from 'src/app/interfaces/journalEntry';
import * as moment from 'moment';
import { JournalService } from 'src/app/services/journal/journal.service';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-habit',
  templateUrl: './item-habit.component.html',
  styleUrls: ['./item-habit.component.css'],
})
export class ItemHabitComponent implements OnInit {
  @Input() habit: Habit;

  today = moment();
  idRecording: string;
  isDone = false;

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {
    this.idRecording = this.today.format('YYYYMMDD') +  this.habit._id;
    this.getEntry();
  }

  getEntry(): void {
    this.journalService.getById(this.habit._id, this.idRecording).subscribe((findEntry: any) => {
      this.habit.entry = findEntry[0];
      this.isDone = (this.habit.entry !== undefined) ? true : false;
      console.log(this.habit);
    });
  }

  getDate(habit: Habit): string {
    return (habit.entry !== undefined) ? moment(habit.entry.date).format('HH:mm').toString() : '';
  }

  onDone(id: string) {
    const entry = this.createJournalEntry(id);
    this.journalService.create(entry).subscribe((newEntry) => {
      console.log(newEntry);
    });
  }

  saveComment() {}

  updateRating(ratingValue: number): void {}

  onSchedule(): boolean {
    let include = false;
    if(this.habit.schedule === '') {
      include = true;
    } else {
      const todayString = String(this.today.isoWeekday());
      include = this.habit.schedule.includes(todayString);
    }

    return include;
  }

  showComment(comments: any): string {
    const day = this.today.isoWeekday();
    let notes = '';

    if (comments !== undefined) {
      notes = JSON.parse(comments);
    }

    return notes[day];
  }

  isCommentExist(comment: any): boolean {
    return (comment !== undefined && comment !== '') ? true : false;
  }

  createJournalEntry(id: string): JournalEntry {
    let habitID = '';
    habitID = (this.habit._id !== undefined) ? this.habit._id : '';

    const entry: JournalEntry = {
      idRecording: id,
      habit: habitID,
      date: moment().toDate()
    };

    return entry;
  }

}
