import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-picker',
  templateUrl: './schedule-picker.component.html',
  styleUrls: ['./schedule-picker.component.css']
})
export class SchedulePickerComponent implements OnInit {

  @Output() changeSchedule: EventEmitter<string> = new EventEmitter();

  dayRu = [
    { id: '1', name: 'Пн' },
    { id: '2', name: 'Вт' },
    { id: '3', name: 'Ср' },
    { id: '4', name: 'Чт' },
    { id: '5', name: 'Пт' },
    { id: '6', name: 'Сб' },
    { id: '0', name: 'Вс' },
  ];

  dayEn = [
    { id: '0', name: 'Su' },
    { id: '1', name: 'Mo' },
    { id: '2', name: 'Tu' },
    { id: '3', name: 'We' },
    { id: '4', name: 'Th' },
    { id: '5', name: 'Fr' },
    { id: '6', name: 'Sa' },
  ];

  schedule: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
  }

  onAddDayToSchedule(idDay: string): void {
    const isExist = this.schedule.includes(idDay);

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
    this.changeSchedule.emit(this.schedule.join());
  }

  isExist(idDay: string): boolean {
    return this.schedule.includes(idDay);
  }

  isEmpty(): boolean {
    if (this.schedule.length === 0) {
      return true;
    }
    return false;
  }

}
