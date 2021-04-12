import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import * as moment from 'moment';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { IJournalEntry } from 'src/app/interfaces/journal-entry';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})

export class TimerComponent implements OnInit, OnDestroy {
  @ViewChild('picker') picker: ElementRef;

  @Output() timePlay = new EventEmitter<any>();
  @Output() timePause = new EventEmitter<string>();
  @Output() timeReset = new EventEmitter<any>();
  @Output() changeTime = new EventEmitter<{entry: IJournalEntry; index: number; time: Date; name: string}>();
  @Output() deleteTimeStamp = new EventEmitter<{entry: IJournalEntry; index: number}>();

  @Input() entry: IJournalEntry;
  interval: any;
  time = new Date();
  counter = 0;
  now: Date;
  timePicker: any;
  pickerObj: any;
  show = false;

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
    this.timePause.emit('pause');
    clearInterval(this.interval);
  }

  reset(): void {
    this.timeReset.emit();
    clearInterval(this.interval);
  }

  getCounter(): string {

    const startTime = moment(this.entry.getLastStartTimestamp());
    const stopTime = moment(this.now);
    const seconds = stopTime.diff(startTime, 'seconds') + this.entry.countTimePassed();

    return this.formatSecond(seconds);
  }

  getCounterTimeStamp(date: Date): string {

    const startTime = moment(date);
    const stopTime = moment(this.now);
    const seconds = stopTime.diff(startTime, 'seconds');

    return this.formatSecond(seconds);
  }

  getPassedTime(): string {
    const seconds = this.entry.countTimePassed();

    return this.formatSecond(seconds);
  }

  getDiff(start: any, stop: any, status: any): string {

    if (start !== undefined && stop !== undefined) {
      const startTime = moment(start);
      const stopTime = moment(stop);
      const seconds = stopTime.diff(startTime, 'seconds');

      return this.formatSecond(seconds);
    } else if (start !== undefined && stop === undefined && status === 'start') {
      const diff = this.getCounterTimeStamp(start);
      return diff;
    } else {
      return '';
    }
  }

  formatSecond(seconds: number): string {
    return moment.utc(seconds*1000).format('HH:mm:ss');
  }

  initPicker(timeDate: Date, index: number, name: string): void {
    if(this.pickerObj !== undefined) {
      this.pickerObj.destroy();
      this.timePicker = undefined;
    }

    if (this.timePicker === undefined) {
      this.timePicker = this.picker.nativeElement;

      this.pickerObj = new Picker(this.timePicker, {
        date: moment(timeDate).toDate(),
        inline: true,
        headers: true,
        controls: true,
        format: 'HH:mm',
        text: {
          title: `Pick ${name}`,
        },
        pick: (() => {
          const time = moment(this.pickerObj.getDate()).toDate();

          const emitData = {
            entry: this.entry,
            index,
            time,
            name
          };

          this.changeTime.emit(emitData);
        })
      });
    }
  }

  changeTimestamp(date: Date, index: number, name: string): void{
    this.initPicker(date, index, name);
    this.pickerObj.show();
  }

  deleteTimestamp(index: number): void {

    const emitData = {
      entry: this.entry,
      index
    };

    this.deleteTimeStamp.emit(emitData);
  }
}
