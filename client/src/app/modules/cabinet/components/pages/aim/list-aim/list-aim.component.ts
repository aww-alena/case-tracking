import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAim } from 'src/app/interfaces/aim';
import { AimService } from 'src/app/services/aim/aim.service';

@Component({
  selector: 'app-list-aim',
  templateUrl: './list-aim.component.html',
  styleUrls: ['./list-aim.component.css']
})
export class ListAimComponent implements OnInit, OnDestroy, OnChanges {

  @Input() today: string;
  aims: IAim[];
  subscriptions: Subscription = new Subscription();

  constructor(private aimService: AimService) { }

  ngOnInit(): void {
    this.getAims();
  }

  ngOnChanges() {
    this.getAims();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAims(): void {
    this.aims = [];
    this.subscriptions.add(this.aimService.fetch().subscribe(aims => this.aims = aims));
  }
}
