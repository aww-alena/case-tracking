import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Subtask } from 'src/app/interfaces/task';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css']
})
export class SubtaskComponent implements OnInit {

  @Input() subtask: Subtask;
  @Input() index: number;
  @Input() hasTimer: boolean;
  @Input() today: string;

  @Output() changeSubtask = new EventEmitter<{index: number; subtask: Subtask}>();

  showComment = false;

  constructor(private dateService: DateService) { }

  ngOnInit(): void {}

  onPlayTime(time: Event): void {

    this.subtask.timer.startTimer(this.dateService.getDate(this.today));
    this.changeSubtask.emit({index: this.index, subtask: this.subtask});
  }

  onPauseTime(status: string): void {

    if(status === 'stop') {
      this.subtask.done = true;
      this.subtask.doneDate = moment().toDate();
      this.subtask.timer.stopTimer('stop', this.dateService.getDate(this.today));
    } else {
      this.subtask.timer.stopTimer('pause', this.dateService.getDate(this.today));
    }

    this.changeSubtask.emit({index: this.index, subtask: this.subtask});
  }

  onResetTime(): void {
    this.subtask.timer.resetTimer();
    this.changeSubtask.emit({index: this.index, subtask: this.subtask});
  }

  onChangeTime(emitData: {index: number; time: Date; name: string}): void {
    this.subtask.timer.setTimeInTimestamp(emitData.index, emitData.time, emitData.name);
    this.changeSubtask.emit({index: this.index, subtask: this.subtask});
  }

  onDeleteTimeStamp(index: number): void {
    this.subtask.timer.deleteTimestamp(index);
    this.changeSubtask.emit({index: this.index, subtask: this.subtask});
  }

  markDoneSubtask(): void {
    this.subtask.done = !this.subtask.done;
    this.subtask.doneDate = moment().toDate();
    this.changeSubtask.emit({index: this.index, subtask: this.subtask});
  }

  hasTimeframes(): boolean {
    return (this.subtask.date !== null || this.subtask.timeframe !== '-') ? true : false;
  }

  toggleComment(): void {
    this.showComment = !this.showComment;
  }
}
