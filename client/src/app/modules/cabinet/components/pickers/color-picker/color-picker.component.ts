import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  @Input() oldColor: string;
  @Output() selectColor: EventEmitter<string> = new EventEmitter();

  colors = [
    '#fff8a6', '#f9b993', '#F6C7C7', '#DFF5F2', '#D7FBE8',
    '#fff576', '#ff8e4b', '#FD94B4', '#87DFD6', '#9DF3C4',
    '#ffe040', '#ff7e3e', '#FF467E', '#46B7B9', '#62D2A2',
    '#ffb134','#ff6f35', '#F12B6B', '#2F9296', '#1FAB89',
    '#08D9D6','#3D84A8', '#3490DE', '#8C82FC', '#E61C5D',
    '#FDC7FF', '#A1DE93', '#BA52ED', '#d2e603', '#fddb3a',
    '#75c2ff', '#febf63','#a4a4f9', '#8d7aff', '#ffacac',
    '#ffc1fa', '#fff250', '#ef61ff', '#28df99', '#fa26a0',

    '#7373e1', '#848be2', '#ffeaff', '#26cabe', '#d2e5ff',
    '#7876ef', '#6cff62', '#5b1fc2', '#e94560', '#931a25'
  ];

  toggle = false;
  color = '#765bff';

  constructor() { }

  ngOnInit(): void {
    this.color = (this.oldColor) ? this.oldColor : '#765bff';
  }

  onSelect(color: string): void {
    this.toggle = !this.toggle;
    this.color = color;
    this.selectColor.emit(color);
  }

}
