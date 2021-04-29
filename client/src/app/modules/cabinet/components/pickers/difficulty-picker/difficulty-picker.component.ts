import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-difficulty-picker',
  templateUrl: './difficulty-picker.component.html',
  styleUrls: ['./difficulty-picker.component.css']
})
export class DifficultyPickerComponent implements OnInit {
  @Input() oldValue: string;
  @Output() selectDifficulty: EventEmitter<string> = new EventEmitter();
  selectedDifficulty = '';
  levelsOfDifficulty = ['hard', 'medium', 'easy'];

  constructor() { }

  ngOnInit(): void {
    this.selectedDifficulty = (this.oldValue) ? this.oldValue : '';
  }

  isActive(difficulty: string): boolean {
    return (this.selectedDifficulty === difficulty) ? true : false;
  }

  onChange(difficulty: string): void {
    this.selectedDifficulty = difficulty;
    this.selectDifficulty.emit(difficulty);
  }
}
