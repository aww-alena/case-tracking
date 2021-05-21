import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  lang = 'en';

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.lang = this.translate.getBrowserLang();
  }

  initFromPicker(): void {
    if (this.timeFrom === undefined) {
      this.timeFrom = this.fromPicker.nativeElement;
      const title = (this.lang === 'en') ? 'Pick a from time' : 'Со скольки';

      new Picker(this.timeFrom, {
        inline: true,
        headers: true,
        controls: true,
        format: 'HH:mm',
        text: {
          title
        }
      });
    }
  }

  initUntilPicker(): void {
    if (this.timeUntil === undefined) {
      this.timeUntil = this.untilPicker.nativeElement;
      const title = (this.lang === 'en') ? 'Pick a until time' : 'До скольки';

      new Picker(this.timeUntil, {
        inline: true,
        headers: true,
        controls: true,
        format: 'HH:mm',
        text: {
          title
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
