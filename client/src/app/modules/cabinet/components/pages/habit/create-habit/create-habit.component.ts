import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Habit } from 'src/app/interfaces/habit';
import { HabitService } from 'src/app/services/habit/habit.service';

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

  schedule: string;

  form: FormGroup;

  habit: Habit;

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
      categories: new FormControl(null)
    });
  }

  createHabit(): void {
    this.habit = {
      name: this.form.value.name,
      hasTimer: this.form.value.hasTimer,
      hasRating: this.form.value.hasRating,
      categories: this.form.value.categories,
      schedule: this.schedule,
      color: this.form.value.color,
      icon: this.form.value.icon
    };
  }

  onSubmit(): void {
    this.createHabit();
    this.habitService.create(this.habit).subscribe((newHabit) => {
      this.form.reset();
      console.log(newHabit);
    });
  }

  onChangeSchedule(schedule: string): void {
    console.log(schedule);
  }

  onSelectIcon(icon: string): void {
    console.log(icon);
  }

  onSelectColor(color: string): void {
    console.log(color);
  }

  onSelectDifficulty(difficulty: string): void {
    console.log(difficulty);
  }

  onChangeFromTime(event: any): void {
    console.log(event);
  }

  onChangeUntilTime(event: any): void {
    console.log(event);
  }

}
