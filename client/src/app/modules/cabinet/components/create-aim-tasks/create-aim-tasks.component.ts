import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AimTask } from 'src/app/interfaces/aim';

@Component({
  selector: 'app-create-aim-tasks',
  templateUrl: './create-aim-tasks.component.html',
  styleUrls: ['./create-aim-tasks.component.css']
})
export class CreateAimTasksComponent implements OnInit {

  @Input() oldTasks: Array<AimTask>;
  @Output() addTask: EventEmitter<Array<AimTask>> = new EventEmitter();

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
      name: this.form.value.name,
      numberPerWeek: this.form.value.numberPerWeek
    });

    this.form.reset();
  }

}
