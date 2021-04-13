import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  @Output() selectColor: EventEmitter<string> = new EventEmitter();

  colors = [
    '#fff8a6', '#f9b993', '#F6C7C7', '#DFF5F2', '#D7FBE8',
    '#fff576', '#ff8e4b', '#FD94B4', '#87DFD6', '#9DF3C4',
    '#ffe040', '#ff7e3e', '#FF467E', '#46B7B9', '#62D2A2',
    '#ffb134','#ff6f35', '#F12B6B', '#2F9296', '#1FAB89',
  ];

  toggle = false;
  color = '#765bff';

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(color: string): void {
    this.toggle = !this.toggle;
    this.color = color;
    this.selectColor.emit(color);
  }

}
