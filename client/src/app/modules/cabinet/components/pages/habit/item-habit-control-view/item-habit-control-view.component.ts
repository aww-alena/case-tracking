import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IHabit } from 'src/app/interfaces/habit';

@Component({
  selector: 'app-item-habit-control-view',
  templateUrl: './item-habit-control-view.component.html',
  styleUrls: ['./item-habit-control-view.component.css']
})
export class ItemHabitControlViewComponent implements OnInit {

  @Input() habit: IHabit;
  id: any;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onDelete(): void {}

  onEdit(): void {}
}
