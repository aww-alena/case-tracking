import { Component, Input, OnInit } from '@angular/core';
import { Affair } from 'src/app/interfaces/affair';

@Component({
  selector: 'app-item-affair',
  templateUrl: './item-affair.component.html',
  styleUrls: ['./item-affair.component.css']
})
export class ItemAffairComponent implements OnInit {

  @Input() affair: Affair;

  constructor() { }

  ngOnInit(): void {
  }

}
