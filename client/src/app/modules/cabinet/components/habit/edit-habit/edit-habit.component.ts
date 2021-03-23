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
  styleUrls: ['./edit-habit.component.css']
})
export class EditHabitComponent implements OnInit {

  schedule: Array<string> = [];
  form: FormGroup;
  habit: Habit;
  habitSubscribe: Subscription;
  isNew = true;

  constructor(private habitService: HabitService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.getHabit();
  }

  getHabit(): void {

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              console.log(params);
              return this.habitService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        (habit) => {
          if (habit) {
            this.habit = habit
            this.form.patchValue({
              name: habit.name
            })

          }

          this.form.enable()
        },
      )
      
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      has_timer: new FormControl(null),
      has_rating: new FormControl(null),
      categoryId: new FormControl(null)
    })
  }

  createHabit(): void {
    this.habit = {
      name: this.form.value.name,
      has_timer: this.form.value.has_timer,
      has_rating: this.form.value.has_rating,
      categoryId: this.form.value.categoryId,
      schedule: this.schedule.join()
    }
  }

  onSubmit() {
    this.createHabit();
    this.habitService.create(this.habit).subscribe(
      newHabit => {
        this.form.reset();
        console.log(newHabit);
      }
    );
    
  }

  onAddDayToSchedule(idDay: string): void {
    const isExist = this.schedule.includes(idDay);

    if (!isExist) {
      this.schedule.push(idDay);
    } else {
      var pos = this.schedule.indexOf(idDay);
      this.schedule.splice(pos, 1);
    }
  }

  onSetScheduleEveryday(): void {
    this.schedule = [];
  }

  isExist(idDay: string): boolean {
    return this.schedule.includes(idDay);
  }

  isEmpty(): boolean {
    if (this.schedule.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  dayRu = [
    {id: '1', name: 'Пн'},
    {id: '2', name: 'Вт'},
    {id: '3', name: 'Ср'},
    {id: '4', name: 'Чт'},
    {id: '5', name: 'Пт'},
    {id: '6', name: 'Сб'},
    {id: '0', name: 'Вс'},
  ];

  dayEn = [
    {id: '0', name: 'Su'},
    {id: '1', name: 'Mo'},
    {id: '2', name: 'Tu'},
    {id: '3', name: 'We'},
    {id: '4', name: 'Th'},
    {id: '5', name: 'Fr'},
    {id: '6', name: 'Sa'}
  ];

}
