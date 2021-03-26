import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.css']
})
export class IconPickerComponent implements OnInit {

  @Output() selectIcon: EventEmitter<string> = new EventEmitter();

  icons = [
    'eco', 'edit_calendar', 'favorite', 'savings', 'room',
    'account_balance', 'card_travel', 'flight_takeoff', 'grade', 'language',
    'payment', 'pets', 'store', 'mic', 'video_settings',
    'draw', 'format_paint', 'directions_run', 'dry_cleaning', 'park'
  ];

  toggle = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(icon: string): void {
    this.selectIcon.emit(icon);
  }

}
