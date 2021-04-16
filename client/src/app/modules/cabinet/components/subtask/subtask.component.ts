import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subtask } from 'src/app/interfaces/task';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css']
})
export class SubtaskComponent implements OnInit {

  @Input() subtask: Subtask;
  @Input() index: number;
  @Output() markDone = new EventEmitter<number>();

  showComment = false;

  constructor() { }

  ngOnInit(): void {
    console.log('subtask: ',this.subtask);
  }

  markDoneSubtask(): void {
    this.markDone.emit(this.index);
  }

  hasTimeframes(): boolean {
    return (this.subtask.date !== null || this.subtask.timeframe !== '-') ? true : false;
  }

  toggleComment(): void {
    this.showComment = !this.showComment;
  }

}
