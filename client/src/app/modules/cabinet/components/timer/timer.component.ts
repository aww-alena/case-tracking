import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  time = {
    hours: '02',
    minutes: '24',
    seconds: '09'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
