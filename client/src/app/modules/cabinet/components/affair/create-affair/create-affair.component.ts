import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Affair } from 'src/app/interfaces/affair';
import { AffairService } from 'src/app/services/affair/affair.service';

@Component({
  selector: 'app-create-affair',
  templateUrl: './create-affair.component.html',
  styleUrls: ['./create-affair.component.css']
})
export class CreateAffairComponent implements OnInit {

  schedule: Array<string> = [];
  form: FormGroup;
  affair: Affair;

  constructor(private affairService: AffairService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      has_timer: new FormControl(null),
      has_rating: new FormControl(null),
      categoryId: new FormControl(null)
    })
  }

  createAffair(): void {
    this.affair = {
      name: this.form.value.name,
      has_timer: this.form.value.has_timer,
      has_rating: this.form.value.has_rating,
      categoryId: this.form.value.categoryId,
      schedule: this.schedule.join()
    }
  }

  onSubmit() {
    this.createAffair();
    this.affairService.create(this.affair).subscribe(
      newAffair => {
        this.form.reset();
        console.log(newAffair);
      }
    );
    
  }

  onAddDayToSchedule(idDay: string): void {
    const isExist = this.schedule.includes(idDay);

    if (!isExist) {
      this.schedule.push(idDay);
    } else {
      var pos = this.schedule.indexOf(idDay);
      this.schedule.splice(pos, 1);
    }
  }

  onSetScheduleEveryday(): void {
    this.schedule = [];
  }

  isExist(idDay: string): boolean {
    return this.schedule.includes(idDay);
  }

  isEmpty(): boolean {
    if (this.schedule.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  dayRu = [
    {id: '1', name: 'Пн'},
    {id: '2', name: 'Вт'},
    {id: '3', name: 'Ср'},
    {id: '4', name: 'Чт'},
    {id: '5', name: 'Пт'},
    {id: '6', name: 'Сб'},
    {id: '0', name: 'Вс'},
  ];

  dayEn = [
    {id: '0', name: 'Su'},
    {id: '1', name: 'Mo'},
    {id: '2', name: 'Tu'},
    {id: '3', name: 'We'},
    {id: '4', name: 'Th'},
    {id: '5', name: 'Fr'},
    {id: '6', name: 'Sa'}
  ];
}
