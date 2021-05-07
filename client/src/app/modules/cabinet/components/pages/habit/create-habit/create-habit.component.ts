import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IHabit } from 'src/app/interfaces/habit';
import { HabitService } from 'src/app/services/habit/habit.service';
import { Habit } from 'src/app/classes/habit';
import { MessageService } from 'src/app/services/message-service/message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  isNew = true;

  constructor(private habitService: HabitService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getHabit();
  }

  onSubmit(): void {

    if (this.isNew) {
      console.log(this.form);
      this.createHabit();
      this.habitService.create(this.habit).subscribe(
        () => {
          this.messageService.showMessage('The habit was created successfully', 'Success');
          this.router.navigate(['/app/dashboard']);
        },
        (error) => {
          this.form.enable();
          this.messageService.showError(error.error.message, 'Uuups! Error.');
        }
      );
    } else {
      console.log(this.form);
      this.createHabit();
      this.habitService.update(this.habit).subscribe(
        () => {
          this.messageService.showMessage('The habit was updated successfully', 'Success');
          this.router.navigate(['/app/dashboard']);
        },
        (error) => {
          this.form.enable();
          this.messageService.showError(error.error.message, 'Uuups! Error.');
        }
      );
    }

  }

  onChangeSchedule(selectedSchedule: string): void {
    selectedSchedule = (selectedSchedule === '') ? 'everyday' : selectedSchedule;
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
    console.log(this.form.value.comment);
  }

  get schedule(): FormControl {
    return this.form.get('schedule') as FormControl;
  }

  private formatTimeFrame(): string {
    console.log(this.form.value.fromTime, this.form.value.untilTime);

    let timeFrame = '';
    if (this.form.value.fromTime !== '') {
      timeFrame += this.form.value.fromTime;
    }
    if (this.form.value.untilTime !== '') {
      timeFrame += `-${this.form.value.untilTime}`;
    }

    return timeFrame;
  }

  private createForm(): void {
    const schedule = (this.isNew) ? 'everyday' : '';
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      hasTimer: new FormControl(false),
      hasRating: new FormControl(false),
      color: new FormControl(''),
      icon: new FormControl(''),
      categories: new FormControl(''),
      schedule: new FormControl(schedule),
      difficulty: new FormControl(''),
      comment: new FormControl(''),
      fromTime: new FormControl(''),
      untilTime: new FormControl(''),
      id: new FormControl('')
    });
  }

  private createHabit(): void {
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
      _id: this.form.value.id
    });
  }

  private getHabit(): void {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params.id) {
              this.isNew = false;
              return this.habitService.getById(params.id);
            }

            return of(null);
          }
        )
      )
      .subscribe(
        (habit: IHabit | any) => {
          this.createForm();
          if (habit) {
            this.habit = habit;
            console.log(habit);


            this.form.patchValue({
              name: habit.name,
              hasTimer: habit.hasTimer,
              hasRating: habit.hasRating,
              color: habit.color,
              icon: habit.icon,
              categories: habit.categories,
              schedule: habit.schedule,
              difficulty: habit.difficulty,
              fromTime: this.fromTime(habit.timeframe),
              untilTime: this.untilTime(habit.timeframe),
              comment: habit.comment,
              id: habit._id
            });
          }

        },
      );
  }

  private fromTime(timeframe: string): string {
    return (timeframe && timeframe.length >= 5) ? timeframe.slice(0, 5) : '';
  }

  private untilTime(timeframe: string): string {
    return (timeframe && timeframe.length === 11) ? timeframe.slice(6) : '';
  }
}
