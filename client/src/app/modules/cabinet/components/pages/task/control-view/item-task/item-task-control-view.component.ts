import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from 'src/app/interfaces/task';
import { MessageService } from 'src/app/services/message-service/message.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-item-task-control-view',
  templateUrl: './item-task-control-view.component.html',
  styleUrls: ['./item-task-control-view.component.css']
})
export class ItemTaskControlViewComponent implements OnInit {

  @Input() task: ITask;
  id: any;

  constructor(private router: Router,
              private taskService: TaskService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onDelete(task: ITask): void {
    this.taskService.delete(task).subscribe(
          response =>  this.messageService.showMessage('Task was deleted', 'Yupikai!'),
          error =>  this.messageService.showError(error.error.message, 'Uuups! Error.')
    );
  }

  onEdit(id: string): void {
    this.router.navigate([`app/tasks/${id}`]);
  }
}
