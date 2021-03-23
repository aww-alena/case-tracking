import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Output() byClick: EventEmitter<number> = new EventEmitter();

  stars = [1, 2, 3, 4, 5];

  selectedStar = 0;

  rating = 0;

  constructor() {}

  ngOnInit(): void {}

  leave(): void {
    this.selectedStar = this.rating;
  }

  hover(starId: number): void {
    this.selectedStar = starId;
  }

  click(starId: number): void {
    this.selectedStar = starId;
    this.rating = starId;
    this.byClick.emit(starId);
  }
}
