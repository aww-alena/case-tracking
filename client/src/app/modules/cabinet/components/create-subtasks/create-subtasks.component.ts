import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subtask } from 'src/app/interfaces/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timer } from 'src/app/classes/timer';
import * as moment from 'moment';

@Component({
  selector: 'app-create-subtasks',
  templateUrl: './create-subtasks.component.html',
  styleUrls: ['./create-subtasks.component.css']
})
export class CreateSubtasksComponent implements OnInit {

  @Input() oldSubtasks: Array<Subtask>;
  @Output() addSubtask: EventEmitter<Array<Subtask>> = new EventEmitter();

  subtasks: Array<Subtask> = [];
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.subtasks = (this.oldSubtasks) ? this.oldSubtasks : [];
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      date: new FormControl(null),
      fromTime: new FormControl(''),
      untilTime: new FormControl(''),
      note: new FormControl('')
    });
  }

  onSubmit(): void {
    this.subtasks.push({
      name: this.form.value.name,
      date: this.form.value.date,
      timeframe: this.formatTimeFrame(),
      note:this.form.value.note,
      done: false,
      doneDate: moment().toDate(),
      timer: new Timer('')
    });

    this.addSubtask.emit(this.subtasks);
  }

  onChangeFromTime(selectedFromTime: any): void {
    this.form.patchValue({fromTime: selectedFromTime});
  }

  onChangeUntilTime(selectedUntilTime: any): void {
    this.form.patchValue({untilTime: selectedUntilTime});
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
