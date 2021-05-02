import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITask } from 'src/app/interfaces/task';
import { MessageService } from 'src/app/services/message-service/message.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-item-task-control-view',
  templateUrl: './item-task-control-view.component.html',
  styleUrls: ['./item-task-control-view.component.css']
})
export class ItemTaskControlViewComponent implements OnInit, OnDestroy {

  @Input() task: ITask;
  id: any;
  private subscribe: Subscription;

  constructor(private router: Router,
              private taskService: TaskService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  onDelete(task: ITask): void {
    this.subscribe = this.taskService.delete(task).subscribe(
          response =>  this.messageService.showMessage('Task was deleted', 'Yupikai!'),
          error =>  this.messageService.showError(error.error.message, 'Uuups! Error.')
    );
  }

  onEdit(id: string): void {
    this.router.navigate([`app/tasks/${id}`]);
  }
}
