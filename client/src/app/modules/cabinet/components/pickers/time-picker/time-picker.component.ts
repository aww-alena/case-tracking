import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import Picker from 'pickerjs';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {

  @Input() oldFromTime: string;
  @Input() oldUntilTime: string;

  @ViewChild('fromPicker') fromPicker: ElementRef;
  @ViewChild('untilPicker') untilPicker: ElementRef;

  @Output() changeFromTime: EventEmitter<string> = new EventEmitter();
  @Output() changeUntilTime: EventEmitter<string> = new EventEmitter();

  timeFrom: any;
  timeUntil: any;
  constructor() { }

  ngOnInit(): void {}

  initFromPicker(): void {
    if (this.timeFrom === undefined) {
      this.timeFrom = this.fromPicker.nativeElement;

      new Picker(this.timeFrom, {
        inline: true,
        headers: true,
        controls: true,
        format: 'HH:mm',
        text: {
          title: 'Pick a from time',
        }
      });
    }
  }

  initUntilPicker(): void {
    if (this.timeUntil === undefined) {
      this.timeUntil = this.untilPicker.nativeElement;

      new Picker(this.timeUntil, {
        inline: true,
        headers: true,
        controls: true,
        format: 'HH:mm',
        text: {
          title: 'Pick a until time',
        }
      });
    }
  }

  onChangeFrom(event: any): void {
    this.changeFromTime.emit(event.target.value);
  }

  onChangeUntil(event: any): void {
    this.changeUntilTime.emit(event.target.value);
  }

}
