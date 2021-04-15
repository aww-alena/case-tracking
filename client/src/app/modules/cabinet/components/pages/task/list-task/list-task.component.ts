import { Component, OnInit, OnDestroy } from '@angular/core';
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

  tasks: ITask[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getHabits();
  }

  ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
  }

  getHabits(): void {
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
      console.log('log:', tempTask, newTask);

      tempTask.push(newTask);
    });

    return tempTask;
  }

}
