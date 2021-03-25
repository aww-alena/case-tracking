import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Habit } from 'src/app/interfaces/habit';
import { HabitService } from 'src/app/services/habit/habit.service';

@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.component.html',
  styleUrls: ['./edit-habit.component.css'],
})
export class EditHabitComponent implements OnInit {
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

  schedule: Array<string> = [];

  form: FormGroup;

  habit: Habit;

  habitSubscribe: Subscription;

  isNew = true;

  constructor(private habitService: HabitService, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
