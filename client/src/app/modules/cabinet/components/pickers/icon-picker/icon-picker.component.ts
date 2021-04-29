import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.css']
})
export class IconPickerComponent implements OnInit {

  @Input() oldIcon: string;
  @Output() selectIcon: EventEmitter<string> = new EventEmitter();

  icons = [
    'eco', 'edit_calendar', 'favorite', 'savings', 'room',
    'account_balance', 'card_travel', 'flight_takeoff', 'grade', 'language',
    'payment', 'pets', 'store', 'mic', 'video_settings',
    'draw', 'format_paint', 'directions_run', 'dry_cleaning', 'park',
    'computer', 'keyboard', 'shopping_cart', 'info', 'lightbulb',
    'watch_later', 'record_voice_over', 'perm_phone_msg', 'spa', 'family_restroom',
    'opacity', 'settings_voice', 'games', 'videocam', 'family_restroom',
    'call', 'contact_mail', 'gesture', 'insights', 'weekend',
    'audiotrack', 'color_lens', 'tag_faces', 'celebration', 'directions_bike',
    'fastfood', 'flight', 'icecream', 'local_drink', 'directions_car',
    'edit_attributes', 'hardware', 'local_dining', 'local_library', 'priority_high',
    'child_friendly', 'iron', 'cake', 'self_improvement', 'sports_soccer'
  ];

  toggle = false;
  icon = 'directions_run';

  constructor() { }

  ngOnInit(): void {
    this.icon = (this.oldIcon) ? this.oldIcon : 'directions_run';
  }

  onSelect(icon: string): void {
    this.toggle = !this.toggle;
    this.icon = icon;
    this.selectIcon.emit(icon);
  }

}
