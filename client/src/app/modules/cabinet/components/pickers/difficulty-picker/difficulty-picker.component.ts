import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-difficulty-picker',
  templateUrl: './difficulty-picker.component.html',
  styleUrls: ['./difficulty-picker.component.css']
})
export class DifficultyPickerComponent implements OnInit {

  @Output() selectDifficulty: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(difficulty: string): void {
    this.selectDifficulty.emit(difficulty);
  }
}
