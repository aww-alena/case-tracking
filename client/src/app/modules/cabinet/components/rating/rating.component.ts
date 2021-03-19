import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  stars = [1, 2, 3, 4, 5];
  selectedStar = 0;
  rating = 0;

  @Output() byClick: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  leave(starId: number): void {
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
