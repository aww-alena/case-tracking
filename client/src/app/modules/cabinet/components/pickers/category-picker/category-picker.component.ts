import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.css']
})
export class CategoryPickerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  chartClicked(e: any): void {
    console.log(e);
  }

  log(color: string): void {
    console.log(color);
  }
}
