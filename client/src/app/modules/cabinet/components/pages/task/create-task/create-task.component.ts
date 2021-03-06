import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITask, Subtask } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/classes/task';
import { MessageService } from 'src/app/services/message-service/message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit, OnDestroy {
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

  task: ITask;
  subtasks: Array<Subtask>;
  isNew = true;

  subscriptions: Subscription = new Subscription();

  constructor(private taskService: TaskService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getTask();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      hasTimer: new FormControl(false),
      hasRating: new FormControl(false),
      color: new FormControl(''),
      icon: new FormControl(''),
      categories: new FormControl(''),
      date: new FormControl(''),
      difficulty: new FormControl(''),
      comment: new FormControl(''),
      fromTime: new FormControl(''),
      untilTime: new FormControl(''),
      id: new FormControl('')
    });
  }

  createTask(): void {
    this.task = new Task ({
      name: this.form.value.name,
      hasTimer: this.form.value.hasTimer,
      hasRating: this.form.value.hasRating,
      categories: this.form.value.categories,
      date: this.form.value.date,
      color: this.form.value.color,
      icon: this.form.value.icon,
      difficulty: this.form.value.difficulty,
      comment: this.form.value.comment,
      timeframe: this.formatTimeFrame(),
      _id: this.form.value.id,
      subtasks: this.subtasks
    }, new Date());
    console.log(this.task);
  }

  onSubmit(): void {

    if (this.isNew) {
      this.createTask();
      this.subscriptions.add(this.taskService.create(this.task).subscribe(
        () => {
          this.messageService.showMessage('The task was created successfully', 'Success');
          this.router.navigate(['/app/dashboard']);
        },
        (error) => {
          this.form.enable();
          this.messageService.showError(error.error.message, 'Uuups! Error.');
        }
      ));
    } else {
      this.createTask();
      this.subscriptions.add(this.taskService.update(this.task).subscribe(
        () => {
          this.messageService.showMessage('The task was updated successfully', 'Success');
          this.router.navigate(['/app/dashboard']);
        },
        (error) => {
          this.form.enable();
          this.messageService.showError(error.error.message, 'Uuups! Error.');
        }
      ));
    }
  }

  onAddSubtask(subtask: any): void {
    this.subtasks = subtask;
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

  private getTask(): void {
    this.subscriptions.add(this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params.id) {
              this.isNew = false;
              return this.taskService.getById(params.id);
            }

            return of(null);
          }
        )
      )
      .subscribe(
        (task: ITask | any) => {

          this.createForm();

          if (task) {
            this.task = new Task(task, new Date());
            this.subtasks = this.task.subtasks;
            this.initForm(this.task);
          }

        },
      ));
  }

  private initForm(task: ITask): void {
    this.form.patchValue({
      name: task.name,
      hasTimer: task.hasTimer,
      hasRating: task.hasRating,
      color: task.color,
      icon: task.icon,
      categories: task.categories,
      difficulty: task.difficulty,
      fromTime: this.fromTime(task.timeframe),
      untilTime: this.untilTime(task.timeframe),
      comment: task.comment,
      date: task.date,
      id: task._id
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

  private initTasks(taskRecordings: ITask[]): ITask[] {

    const tempTask: ITask[] = [];

    taskRecordings.forEach(task => {
      const newTask: ITask = new Task(task, new Date());
      tempTask.push(newTask);
    });

    return tempTask;
  }

  private fromTime(timeframe: string): string {
    return (timeframe && timeframe.length >= 5) ? timeframe.slice(0, 5) : '';
  }

  private untilTime(timeframe: string): string {
    return (timeframe && timeframe.length === 11) ? timeframe.slice(6) : '';
  }

}
