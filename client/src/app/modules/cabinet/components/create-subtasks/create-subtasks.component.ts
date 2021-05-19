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
    console.log(this.subtasks);

    this.createForm();
  }

  onEditSubtask(subtask: Subtask): void {
    this.form = new FormGroup({
      name: new FormControl(subtask.name, Validators.required),
      date: new FormControl(subtask.date),
      fromTime: new FormControl(this.fromTime(subtask.timeframe)),
      untilTime: new FormControl(this.untilTime(subtask.timeframe)),
      note: new FormControl(subtask.note),
      id: new FormControl(subtask._id)
    });
  }

  onDeleteSubtask(subtask: Subtask): void {
    const index = this.subtasks.findIndex(item => item._id === this.form.value.id);
    this.subtasks.splice(index, 1);

    this.addSubtask.emit(this.subtasks);
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      date: new FormControl(null),
      fromTime: new FormControl(''),
      untilTime: new FormControl(''),
      note: new FormControl(''),
      id: new FormControl('')
    });
  }

  onSubmit(): void {

    if (this.form.value.id) {
      const index = this.subtasks.findIndex(item => item._id === this.form.value.id);
      this.subtasks[index] = this.updateSubtask(index);
    } else {
      this.subtasks.push(this.createSubtask());
    }

    this.createForm();
    this.addSubtask.emit(this.subtasks);
  }

  createSubtask(): Subtask {

    const subtask: Subtask = {
      name: this.form.value.name,
      date: this.form.value.date,
      timeframe: this.formatTimeFrame(),
      note: this.form.value.note,
      done: false,
      doneDate: moment().toDate(),
      timer: new Timer('', new Date())
    };

    return subtask;
  }

  updateSubtask(index: number): Subtask {
    const updatedSubtask: Subtask = this.subtasks[index];

    updatedSubtask.name = this.form.value.name;
    updatedSubtask.date = this.form.value.date;
    updatedSubtask.timeframe = this.formatTimeFrame();
    updatedSubtask.note = this.form.value.note;

    return updatedSubtask;
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


  private fromTime(timeframe: string): string {
    return (timeframe && timeframe.length >= 5) ? timeframe.slice(0, 5) : '';
  }

  private untilTime(timeframe: string): string {
    return (timeframe && timeframe.length === 11) ? timeframe.slice(6) : '';
  }

}
