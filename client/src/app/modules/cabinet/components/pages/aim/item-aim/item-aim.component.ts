import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AimTask, CompletionEntry, IAim } from 'src/app/interfaces/aim';
import { AimService } from 'src/app/services/aim/aim.service';
import { MessageService } from 'src/app/services/message-service/message.service';
import { TitleStoreService } from 'src/app/services/title/title-store.service';

@Component({
  selector: 'app-item-aim',
  templateUrl: './item-aim.component.html',
  styleUrls: ['./item-aim.component.css']
})
export class ItemAimComponent implements OnInit, OnChanges {

  @Input() aim: IAim;
  @Input() today: string;
  subscriptions: Subscription = new Subscription();
  doneToday = new Map();
  numberExecutionsForCurrentWeek: Map<string, number>;

  constructor(private titleService: TitleStoreService,
              private aimService: AimService,
              private messageService: MessageService) { }

  ngOnInit(): void {}

  ngOnChanges() {
    this.getIsDone();
  }

  markDone(id: string): void {

    const foundTask = this.aim.tasks.find(task => task._id === id);
    const today = moment(this.titleService.today);

    if (foundTask && foundTask.completion) {

      const foundEntry = foundTask.completion.find(entry => moment(entry.done).format('DD.MM.YYYY') === today.format('DD.MM.YYYY'));

        if(foundEntry) {
          this.deleteMarDone(foundTask, foundEntry);
        } else {
          foundTask.completion.push({
            done: today.toDate()
          });
        }
    }

    this.updateAim();
  }

  deleteMarDone(task: AimTask, entry: CompletionEntry): void {
    const index = task.completion?.indexOf(entry);

    if(index !== undefined && task.completion) {

      task.completion.splice(index, 1);
    }
  }

  updateAim(): void {
    this.subscriptions.add(this.aimService.update(this.aim).subscribe((newAim: IAim) => {
      this.messageService.showMessage('The entry was successfully updated', 'Success');
    },
    (error) => {
      this.messageService.showError(error.error.message, 'Uuups! Error');
    }));
  }

  getIsDone(): void {
    this.aim.tasks.forEach((task) => {
      const done = !!task.completion?.find(item =>
        moment(item.done).format('DD.MM.YYYY') === moment(this.titleService.today).format('DD.MM.YYYY')
      );

      this.doneToday.set(task._id, done);
    });
  }

  onGetNumberExecutions(numberExecutions: Array<{id: string; amount: number}>): void {

    if(numberExecutions) {
      this.numberExecutionsForCurrentWeek = new Map();

      numberExecutions.forEach(item => {
        this.numberExecutionsForCurrentWeek.set(item.id, item.amount);
      });
    }
  }

}
