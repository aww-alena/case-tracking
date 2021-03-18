import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Affair } from 'src/app/interfaces/affair';
import { AffairService } from 'src/app/services/affair/affair.service';

@Component({
  selector: 'app-list-affair',
  templateUrl: './list-affair.component.html',
  styleUrls: ['./list-affair.component.css']
})
export class ListAffairComponent implements OnInit {

  affairs: Affair[];
  affairsSubscribe: Subscription;

  constructor(private affairService: AffairService) { }

  ngOnInit(): void {
    this.getAffairs();
    
    
  }

  ngOnDestroy(): void {
    if (this.affairsSubscribe) {
      this.affairsSubscribe.unsubscribe();
    }
  }

  getAffairs(): void {
    this.affairsSubscribe = this.affairService.fetch().subscribe(affairs => {
      this.affairs = affairs
      console.log(this.affairs);
    });
  }

}
