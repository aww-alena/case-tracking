import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-affair',
  templateUrl: './create-affair.component.html',
  styleUrls: ['./create-affair.component.css']
})
export class CreateAffairComponent implements OnInit {

  dayRu: Array<string> = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  dayEn: Array<string> = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor() { }

  ngOnInit(): void {
  }

}
