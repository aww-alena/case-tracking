import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Timer } from 'src/app/classes/timer';
import * as moment from 'moment';
import { DateService } from 'src/app/services/date/date.service';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})

export class TimerComponent implements OnInit, OnDestroy {
  @ViewChild('picker') picker: ElementRef;

  @Input() today: string;
  @Output() timePlay = new EventEmitter<any>();
  @Output() timePause = new EventEmitter<string>();
  @Output() timeReset = new EventEmitter<any>();
  @Output() changeTime = new EventEmitter<{index: number; time: Date; name: string}>();
  @Output() deleteTimeStamp = new EventEmitter<number>();

  @Input() timer: Timer;
  interval: any;
  time = new Date();
  counter = 0;
  now: Date;
  timePicker: any;
  pickerObj: any;
  show = false;

  private timerSub: Subscription;

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.setIntervalDate();
  }

  setIntervalDate(): void {
    this.timerSub = interval(1000).subscribe(() => this.now = new Date());
  }

  ngOnDestroy() {
    this.timerSub.unsubscribe();
  }

  play(): void{
    this.timePlay.emit(moment().format());
    this.setIntervalDate();
  }

  stop(): void {
    this.timePause.emit('stop');
    this.timerSub.unsubscribe();
  }

  pause(): void {
    this.timePause.emit('pause');
    this.timerSub.unsubscribe();
  }

  reset(): void {
    this.timeReset.emit();
    this.timerSub.unsubscribe();
  }

  getCounter(): string {
    const seconds = this.timer.countFromLastStartToNow() + this.timer.countTimePassed();

    return this.formatSecond(seconds);
  }

  getCounterTimeStamp(date: Date): string {

    const startTime = moment(date);
    const stopTime = moment(this.now);
    const seconds = stopTime.diff(startTime, 'seconds');

    return this.formatSecond(seconds);
  }

  getPassedTime(): string {
    const seconds = this.timer.countTimePassed();

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
          const date =  this.dateService.getCombinedDate(this.today, time);

          const emitData = {
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
    this.deleteTimeStamp.emit(index);
  }
}
