import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Output() byClick: EventEmitter<number> = new EventEmitter();
  @Input() oldRating: number;
  @Input() isPicker = true;

  stars = [1, 2, 3, 4, 5];

  rating = 0;

  constructor() {}

  ngOnInit(): void {}

  leave(): void {
    this.oldRating = this.rating;
  }

  hover(starId: number): void {
    this.rating = this.oldRating;
    this.oldRating = starId;
  }

  click(starId: number): void {
    this.oldRating = starId;
    this.rating = starId;
    this.byClick.emit(starId);
  }
}
