import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Output() timePlay = new EventEmitter<any>();
  @Output() timePause = new EventEmitter<any>();
  @Output() timeStartOver = new EventEmitter<any>();

  time = {
    hours: '02',
    minutes: '24',
    seconds: '09',
  };

  constructor() {}

  ngOnInit(): void {}

  play(): void{
    this.timePlay.emit(moment().format());
  }

  pause(): void {
    this.timePause.emit();
  }

  startOver(): void {
    this.timeStartOver.emit();
  }
}
