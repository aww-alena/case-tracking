import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IHabit } from 'src/app/interfaces/habit';
import { HabitService } from 'src/app/services/habit/habit.service';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
  selector: 'app-item-habit-control-view',
  templateUrl: './item-habit-control-view.component.html',
  styleUrls: ['./item-habit-control-view.component.css']
})
export class ItemHabitControlViewComponent implements OnInit {

  @Input() habit: IHabit;
  @Output() deleteHabit: EventEmitter<string> = new EventEmitter();
  id: any;

  constructor(private router: Router,
              private habitService: HabitService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onDelete(habit: IHabit): void {
    this.habitService.delete(habit).subscribe(
          response =>  {
            this.messageService.showMessage('Habit was deleted', 'Yupikai!');
            this.deleteHabit.emit(habit._id);
          },
          error =>  this.messageService.showError(error.error.message, 'Uuups! Error.')
    );
  }

  onEdit(id: string): void {
    this.router.navigate([`app/habits/${id}`]);
  }
}
