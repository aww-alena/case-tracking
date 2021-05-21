import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-picker',
  templateUrl: './schedule-picker.component.html',
  styleUrls: ['./schedule-picker.component.css']
})
export class SchedulePickerComponent implements OnInit {

  @Input() oldSchedule: string;
  @Output() changeSchedule: EventEmitter<string> = new EventEmitter();

  dayEn = [
    { id: '0', name: 'su' },
    { id: '1', name: 'mo' },
    { id: '2', name: 'tu' },
    { id: '3', name: 'we' },
    { id: '4', name: 'th' },
    { id: '5', name: 'fr' },
    { id: '6', name: 'sa' },
  ];

  schedule: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    this.schedule = (this.oldSchedule) ? this.oldSchedule.split(',') : [];
  }

  onAddDayToSchedule(idDay: string): void {
    const isExist = this.schedule.includes(idDay);
    this.schedule = (this.isEveryday()) ? [] : this.schedule;

    if (!isExist) {
      this.schedule.push(idDay);
      this.changeSchedule.emit(this.schedule.join());
    } else {
      const pos = this.schedule.indexOf(idDay);
      this.schedule.splice(pos, 1);
      this.changeSchedule.emit(this.schedule.join());
    }
  }

  onSetScheduleEveryday(): void {
    this.schedule = [];
    this.schedule.push('everyday');
    this.changeSchedule.emit(this.schedule.join());
  }

  isExist(idDay: string): boolean {
    return this.schedule.includes(idDay);
  }

  isEveryday(): boolean {
    if (this.schedule[0] === 'everyday') {
      return true;
    }
    return false;
  }

}
