import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IHabit } from 'src/app/interfaces/habit';
import { HabitService } from 'src/app/services/habit/habit.service';
import { Habit } from 'src/app/classes/habit';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.component.html',
  styleUrls: ['./create-habit.component.css'],
})
export class CreateHabitComponent implements OnInit {
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

  form: FormGroup;

  habit: IHabit;

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      hasTimer: new FormControl(null),
      hasRating: new FormControl(null),
      color: new FormControl(null),
      icon: new FormControl(null),
      categories: new FormControl(null),
      schedule: new FormControl(null),
      difficulty: new FormControl(null),
      comment: new FormControl(null),
      fromTime: new FormControl(null),
      untilTime: new FormControl(null)
    });
  }

  createHabit(): void {
    this.habit = new Habit ({
      name: this.form.value.name,
      hasTimer: this.form.value.hasTimer,
      hasRating: this.form.value.hasRating,
      categories: this.form.value.categories,
      schedule: this.form.value.schedule,
      color: this.form.value.color,
      icon: this.form.value.icon,
      difficulty: this.form.value.difficulty,
      comment: this.form.value.comment,
      timeframe: this.formatTimeFrame(),
      _id: ''
    });
  }

  onSubmit(): void {
    this.createHabit();
    this.habitService.create(this.habit).subscribe((newHabit) => {
      this.form.reset();
      console.log(newHabit);
    });
  }

  onChangeSchedule(selectedSchedule: string): void {
    this.form.patchValue({schedule: selectedSchedule});
  }

  onSelectIcon(selectedIcon: string): void {
    this.form.patchValue({icon: selectedIcon});
  }

  onSelectColor(selectedColor: string): void {
    this.form.patchValue({color: selectedColor});
  }

  onSelectDifficulty(selectedDifficulty: string): void {
    this.form.patchValue({difficulty: selectedDifficulty});
  }

  onChangeFromTime(selectedFromTime: any): void {
    this.form.patchValue({fromTime: selectedFromTime});
  }

  onChangeUntilTime(selectedUntilTime: any): void {
    this.form.patchValue({untilTime: selectedUntilTime});
  }

  onChangeCategories(selectedCategories: any): void {
    this.form.patchValue({categories: selectedCategories});
  }

  onAddNotes(notes: string): void {
    this.form.patchValue({comment: notes});
  }

  get schedule(): FormControl {
    return this.form.get('schedule') as FormControl;
  }

  private formatTimeFrame(): string {
    let timeFrame = '';
    if (this.form.value.fromTime !== null) {
      timeFrame += this.form.value.fromTime;
    }
    if (this.form.value.untilTime !== null) {
      timeFrame += `-${this.form.value.untilTime}`;
    }

    return timeFrame;
  }
}
