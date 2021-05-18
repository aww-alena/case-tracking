import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Task } from 'src/app/classes/task';
import { ITask } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit, OnDestroy {

  tasks: ITask[];
  subscriptions: Subscription = new Subscription();
  today = moment().toString();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getTasks(): void {
    this.tasks = [];
    this.subscriptions.add(this.taskService.fetch().pipe(
      mergeMap((tasks: ITask[]) => this.initTasks(tasks)))
      .subscribe(value => {
        this.tasks.push(value);
      }));
  }

  private initTasks(taskRecordings: ITask[]): ITask[] {

    const tempTask: ITask[] = [];

    taskRecordings.forEach(task => {
      const newTask: ITask = new Task(task);
      tempTask.push(newTask);
    });

    return tempTask;
  }

}
