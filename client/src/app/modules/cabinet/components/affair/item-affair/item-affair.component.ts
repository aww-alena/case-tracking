import { Component, Input, OnInit } from '@angular/core';
import { Affair } from 'src/app/interfaces/affair';
import * as moment from 'moment';
@Component({
  selector: 'app-item-affair',
  templateUrl: './item-affair.component.html',
  styleUrls: ['./item-affair.component.css']
})
export class ItemAffairComponent implements OnInit {

  @Input() affair: Affair;
  today: string = moment().format('YYYYMMDD');

  constructor() { }

  ngOnInit(): void {
  }

  onDone() {}

  saveComment() {}

  updateRating(ratingValue: number): void {
  }

}
