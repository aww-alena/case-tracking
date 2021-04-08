import { Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import * as moment from 'moment';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { IJournalEntry } from 'src/app/interfaces/journalEntry';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})

export class TimerComponent implements OnInit, OnDestroy {
  @Output() timePlay = new EventEmitter<any>();
  @Output() timePause = new EventEmitter<string>();
  @Output() timeStartOver = new EventEmitter<any>();
  @Input() entry: IJournalEntry;
  interval: any;
  time = new Date();
  counter = 0;
  now: Date;

  constructor() {}

  ngOnInit(): void {
    this.setIntervalDate();
  }

  setIntervalDate(): void {
    this.interval = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  play(): void{
    this.timePlay.emit(moment().format());
    this.setIntervalDate();
  }

  stop(): void {
    this.timePause.emit('stop');
    clearInterval(this.interval);
  }

  pause(): void {
    this.timePause.emit();
    clearInterval(this.interval);
  }

  startOver(): void {
    this.timeStartOver.emit();
    clearInterval(this.interval);
  }

  getCounter(): string {

    const startTime = moment(this.entry.getLastStart());
    const stopTime = moment(this.now);
    const seconds = stopTime.diff(startTime, 'seconds') + this.entry.countTimePassed();

    return this.formatSecond(seconds);
  }

  getPassedTime(): string {
    const seconds = this.entry.countTimePassed();

    return this.formatSecond(seconds);
  }

  getDiff(start: any, stop: any): string {

    if (start !== undefined && stop !== undefined) {
      const startTime = moment(start);
      const stopTime = moment(stop);
      const seconds = stopTime.diff(startTime, 'seconds');

      return this.formatSecond(seconds);
    } else {
      return '';
    }
  }

  formatSecond(seconds: number): string {
    return moment.utc(seconds*1000).format('HH:mm:ss');
  }
}
