import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ITask, Subtask } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-item-task',
  templateUrl: './item-task.component.html',
  styleUrls: ['./item-task.component.css']
})
export class ItemTaskComponent implements OnInit, OnDestroy {
  @Input() task: ITask;
  subscriptions: Subscription = new Subscription();
  showMore = false;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goToEdit(id: string): void {
    this.router.navigate([`app/tasks/${id}`]);
  }

  markDone(): void {
    this.task.savedData.done = !this.task.savedData.done;
    this.task.savedData.date = moment().toDate();
    this.updateOrSave();
  }

  onChangeSubtask(emitData: {index: number; subtask: Subtask}): void {
    this.task.subtasks[emitData.index] = emitData.subtask;
    this.updateOrSave();
  }

  update(task: ITask): void {
    this.subscriptions.add(this.taskService.update(task).subscribe((newTask) => {
      this.task.parse(newTask);
    }));
  }

  save(task: ITask): void {
    this.subscriptions.add(this.taskService.create(task).subscribe((newTask) => {
      this.task.parse(newTask);
    }));
  }

  updateOrSave(): void {
    if(!this.task.isIdUndefined()) {
      this.update(this.task);
    } else {
      this.save(this.task);
    }
  }

  onPlayTime(time: Event): void {

    this.task.savedData.timer.startTimer();
    this.updateOrSave();
  }

  onPauseTime(status: string): void {

    if(status === 'stop') {
      this.task.setDone(true);
      this.task.setDate(moment().toDate());
      this.task.savedData.timer.stopTimer('stop');
    } else {
      this.task.savedData.timer.stopTimer('pause');
    }

    this.updateOrSave();
  }

  onResetTime(): void {
    this.task.savedData.timer.resetTimer();
    this.updateOrSave();
  }

  onChangeTime(emitData: {index: number; time: Date; name: string}): void {
    this.task.savedData.timer.setTimeInTimestamp(emitData.index, emitData.time, emitData.name);
    this.update(this.task);
  }

  onDeleteTimeStamp(index: number): void {
    this.task.savedData.timer.deleteTimestamp(index);
    this.update(this.task);
  }

  saveComment(form: NgForm) {
    this.task.comment = form.value.note;
    this.updateOrSave();
  }

  updateFormField(form: NgForm): void {

    console.log(form);

    if(this.task.comment !== '' && form.form.controls.note.value === '') {
      form.setValue({
        note: this.task.comment
      });
    }
  }

  sho(e: any): void{
    if (e.tab.textLabel === 'Close') {
      this.showMore = false;
    }
  }

  formatSecond(seconds: number): string {
    return moment.utc(seconds*1000).format('HH:mm:ss');
  }
}
