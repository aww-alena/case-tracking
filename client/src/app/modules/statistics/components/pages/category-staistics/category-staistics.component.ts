import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { CategoryStatistics } from 'src/app/interfaces/category-statistics';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-category-staistics',
  templateUrl: './category-staistics.component.html',
  styleUrls: ['./category-staistics.component.css']
})

export class CategoryStaisticsComponent implements OnInit {

  radarChartOptions: RadialChartOptions = {responsive: true,};

  radarChartLabels: Label[] = [];
  radarChartData: ChartDataSets[] = [];

  radarChartType: ChartType = 'radar';
  data: CategoryStatistics;
  response = false;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getCategoryStatistics().subscribe(data => {
      this.radarChartLabels = data.categories;
      this.radarChartData = [{ data: data.data, label: 'Количество выполнений'}];

      this.response = true;
    });
  }
}
