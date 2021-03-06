import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Task } from 'src/app/classes/task';
import { ITask } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';
import { TitleStoreService } from 'src/app/services/title/title-store.service';

@Component({
  selector: 'app-list-task-control-view',
  templateUrl: './list-task-control-view.component.html',
  styleUrls: ['./list-task-control-view.component.css']
})
export class ListTaskControlViewComponent implements OnInit, OnDestroy {

  tasks: ITask[];
  subscriptions: Subscription = new Subscription();

  constructor(private taskService: TaskService, private titleService: TitleStoreService) {}

  ngOnInit(): void {
    this.setTitle();
    this.getHabits();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getHabits(): void {
    this.tasks = [];
    this.subscriptions.add(this.taskService.fetch().pipe(
      mergeMap((tasks: ITask[]) => this.initTasks(tasks)))
      .subscribe(value => {
        this.tasks.push(value);
      }));
  }

  onDeleteHabit(id: string): void {
    this.tasks = this.tasks.filter(item => item._id !== id);
  }

  private setTitle(): void {
    this.subscriptions.add(this.titleService.updateTitle('tasks'));
  }

  private initTasks(taskRecordings: ITask[]): ITask[] {

    const tempTask: ITask[] = [];

    taskRecordings.forEach(task => {
      const newTask: ITask = new Task(task, new Date());
      tempTask.push(newTask);
    });

    return tempTask;
  }

}
