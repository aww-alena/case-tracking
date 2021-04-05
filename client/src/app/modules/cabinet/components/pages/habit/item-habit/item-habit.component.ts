import { Component, Input, OnInit } from '@angular/core';
import { Habit } from 'src/app/interfaces/habit';
import * as moment from 'moment';
@Component({
  selector: 'app-item-habit',
  templateUrl: './item-habit.component.html',
  styleUrls: ['./item-habit.component.css'],
})
export class ItemHabitComponent implements OnInit {
  @Input() habit: Habit;

  today = moment();

  constructor() {}

  ngOnInit(): void {}

  onDone() {}

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
      console.log(notes);
    }

    return notes[day];
  }

  isCommentExist(comment: any): boolean {
    return (comment !== undefined && comment !== '') ? true : false;
  }
}
