import { Component, Input, OnInit } from '@angular/core';
import { IHabit } from 'src/app/interfaces/habit';
import { MainJournalData } from 'src/app/interfaces/habit-statistics';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {

  @Input() entry: MainJournalData;
  @Input() habit: IHabit;

  constructor() { }

  ngOnInit(): void {}
}
