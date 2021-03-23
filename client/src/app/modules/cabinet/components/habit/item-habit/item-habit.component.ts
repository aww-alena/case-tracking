import { Component, Input, OnInit } from '@angular/core';
import { Habit } from 'src/app/interfaces/habit';
import * as moment from 'moment';
@Component({
    selector: 'app-item-habit',
    templateUrl: './item-habit.component.html',
    styleUrls: ['./item-habit.component.css']
})
export class ItemHabitComponent implements OnInit {

    @Input() habit: Habit;
    today: string = moment().format('YYYYMMDD');

    constructor() { }

    ngOnInit(): void {
    }

    onDone() {}

    saveComment() {}

    updateRating(ratingValue: number): void {
    }

}
