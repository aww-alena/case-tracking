import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { IHabit } from 'src/app/interfaces/habit';
import { MainJournalData } from 'src/app/interfaces/habit-statistics';

@Component({
  selector: 'app-list-entry',
  templateUrl: './list-entry.component.html',
  styleUrls: ['./list-entry.component.css']
})
export class ListEntryComponent implements OnInit, OnChanges {

  @Input() entries: MainJournalData[];
  @Input() habit: IHabit;
  totalSeconds = 0;
  rating = 0;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if(this.entries) {
      this.calcTime();
      this.calcRating();
    }
  }

  calcTime(): void {
    this.totalSeconds = 0;
    this.entries.forEach((item) => {
      this.totalSeconds += item.time;
    });
  }

  calcRating(): void {
    this.rating = 0;
    this.entries.forEach((item) => {
      this.rating += item.rating;
    });
    this.rating = Number((this.rating / this.entries.length).toPrecision(2));
  }
}
