import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TitleStoreService } from 'src/app/services/title/title-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  subscriptions: Subscription = new Subscription();

  constructor(private titleService: TitleStoreService) {}

  ngOnInit(): void {
    this.setTitle();
  }

  private setTitle(): void {
    this.subscriptions.add(this.titleService.updateTitle('Dashboard'));
  }
}
