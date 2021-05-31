import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message-service/message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { IAim, AimTask } from 'src/app/interfaces/aim';
import { AimService } from 'src/app/services/aim/aim.service';
import { Aim } from 'src/app/classes/aim';

@Component({
  selector: 'app-create-aim',
  templateUrl: './create-aim.component.html',
  styleUrls: ['./create-aim.component.css']
})
export class CreateAimComponent implements OnInit, OnDestroy {

  form: FormGroup;

  aim: IAim;
  tasks: Array<AimTask>;
  isNew = true;

  subscriptions: Subscription = new Subscription();

  constructor(private aimService: AimService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getAim();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      color: new FormControl(''),
      icon: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      currentValue: new FormControl(''),
      targetValue: new FormControl(''),
      measure: new FormControl(''),
      id: new FormControl('')
    });
  }

  createTask(): void {
    const tempAim: IAim = {
      name: this.form.value.name,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      color: this.form.value.color,
      icon: this.form.value.icon,
      currentValue: this.form.value.currentValue,
      targetValue: this.form.value.targetValue,
      tasks: this.tasks,
      intermediateValues: this.form.value.intermediateValues,
      measure: this.form.value.measure,
      user: this.form.value.user,
      _id: this.form.value.id
    };

    this.aim = new Aim (tempAim);

    console.log(this.aim);
  }

  onSubmit(): void {
    console.log(this.form.value);

    /*
    if (this.isNew) {
      this.createTask();
      this.subscriptions.add(this.aimService.create(this.aim).subscribe(
        () => {
          this.messageService.showMessage('The aim was created successfully', 'Success');
          this.router.navigate(['/app/dashboard']);
        },
        (error) => {
          this.form.enable();
          this.messageService.showError(error.error.message, 'Uuups! Error.');
        }
      ));
    } else {
      this.createTask();
      this.subscriptions.add(this.aimService.update(this.aim).subscribe(
        () => {
          this.messageService.showMessage('The aim was updated successfully', 'Success');
          this.router.navigate(['/app/dashboard']);
        },
        (error) => {
          this.form.enable();
          this.messageService.showError(error.error.message, 'Uuups! Error.');
        }
      ));
    }
    */
  }

  onAddTask(tasks: any): void {
    this.tasks = tasks;
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

  private getAim(): void {
    this.subscriptions.add(this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params.id) {
              this.isNew = false;
              return this.aimService.getById(params.id);
            }

            return of(null);
          }
        )
      )
      .subscribe(
        (aim: IAim | any) => {

          this.createForm();

          if (aim) {
            this.aim = new Aim(aim);
            this.tasks = this.aim.tasks;
            this.initForm(this.aim);
          }

        },
      ));
  }

  private initForm(aim: IAim): void {
    this.form.patchValue({
      name: aim.name,
      color: aim.color,
      icon: aim.icon,
      startDate: aim.startDate,
      endDate: aim.endDate,
      id: aim._id
    });
  }

  private formatTimeFrame(): string {
    let timeFrame = '';
    if (this.form.value.fromTime !== '') {
      timeFrame += this.form.value.fromTime;
    }
    if (this.form.value.untilTime !== '') {
      timeFrame += `-${this.form.value.untilTime}`;
    }

    return timeFrame;
  }
/*
  private initTasks(aimRecordings: ITask[]): ITask[] {

    const tempTask: ITask[] = [];

    aimRecordings.forEach(aim => {
      const newTask: ITask = new Task(aim, new Date());
      tempTask.push(newTask);
    });

    return tempTask;
  }
*/
  private fromTime(timeframe: string): string {
    return (timeframe && timeframe.length >= 5) ? timeframe.slice(0, 5) : '';
  }

  private untilTime(timeframe: string): string {
    return (timeframe && timeframe.length === 11) ? timeframe.slice(6) : '';
  }

}

