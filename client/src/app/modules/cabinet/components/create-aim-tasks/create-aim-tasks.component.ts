import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AimTask } from 'src/app/interfaces/aim';

@Component({
  selector: 'app-create-aim-tasks',
  templateUrl: './create-aim-tasks.component.html',
  styleUrls: ['./create-aim-tasks.component.css']
})
export class CreateAimTasksComponent implements OnInit {

  @Input() oldTasks: Array<AimTask>;
  @Output() addTask: EventEmitter<Array<AimTask>> = new EventEmitter();
  @ViewChild(FormGroupDirective) formRef: FormGroupDirective;

  tasks: Array<AimTask> = [];
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      numberPerWeek: new FormControl(0, Validators.required),
    });
  }

  onSubmit(): void {
    this.tasks.push({
      _id: '',
      name: this.form.value.name,
      numberPerWeek: this.form.value.numberPerWeek
    });

    this.addTask.emit(this.tasks);
    this.form.reset();
    this.formRef.resetForm();
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.addTask.emit(this.tasks);
  }

}
