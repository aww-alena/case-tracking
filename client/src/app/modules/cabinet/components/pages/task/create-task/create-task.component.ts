import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITask, Subtask } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/classes/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.createForm();
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
      untilTime: new FormControl('')
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
      _id: '',
      subtasks: this.subtasks
    });
  }

  onSubmit(): void {

    this.createTask();
    console.log(this.task);
    this.taskService.create(this.task).subscribe((newTask) => {
      this.form.reset();
    });
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

}
