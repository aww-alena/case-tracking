import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { TitleStoreService } from 'src/app/services/title/title-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  today = moment().toString();
  dayNumber = moment().isoWeekday().toString();
  subscriptions: Subscription = new Subscription();

  constructor(private titleService: TitleStoreService) {}

  ngOnInit(): void {
    this.setTitle();
  }

  ngOnDestroy(): void {
    this.today = moment().toString();
    this.dayNumber = moment().isoWeekday().toString();
    this.setTitle();
    this.subscriptions.unsubscribe();
  }

  onSetDate(date: any): void {
    this.today = moment(date).toString();
    this.dayNumber = moment(date).isoWeekday().toString();
    this.setTitle();
  }

  private setTitle(): void {
    this.subscriptions.add(this.titleService.updateTitle(`Dashboard`, moment(this.today).format('DD.MM.YYYY dddd')));
  }
}
