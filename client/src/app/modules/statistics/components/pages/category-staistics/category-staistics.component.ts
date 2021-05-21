import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { CategoryStatistics } from 'src/app/interfaces/category-statistics';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { TitleStoreService } from 'src/app/services/title/title-store.service';

@Component({
  selector: 'app-category-staistics',
  templateUrl: './category-staistics.component.html',
  styleUrls: ['./category-staistics.component.css']
})

export class CategoryStaisticsComponent implements OnInit, OnDestroy {

  radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
        display: false,
        position: 'bottom',
        labels: {
            fontColor: 'rgba(255,255,255,0.6)'
        }
    },
    scale: {
      pointLabels: {
        fontColor: 'rgba(255,255,255,0.8)',
        fontSize: 13
      },
      angleLines: {
        color: 'rgba(255,255,255,0.1)',
      },
      gridLines: {
        color: 'rgba(255,255,255,0.1)'
      },
      ticks: {
        fontColor: 'rgba(70,96,182,0.7)'
      }
    }
  };

  chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(70,96,182,0.7)',
      borderColor: 'rgba(70,96,182,0.2)',
      pointBackgroundColor: 'rgba(70,96,182,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    {
      backgroundColor: 'rgba(70,96,182,0.7)',
      borderColor: 'rgba(70,96,182,0.2)',
      pointBackgroundColor: 'rgba(70,96,182,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(70,96,182,0.2)'
    }
  ];

  radarChartLabels: Label[] = [];
  radarChartData: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';

  data: CategoryStatistics;
  response = false;
  translatedCategories: Label[] = [];

  subscriptions: Subscription = new Subscription();

  constructor(private statisticsService: StatisticsService,
              private titleService: TitleStoreService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.setTitle();
    this.getStatistics();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getStatistics(): void {

    this.subscriptions.add(this.statisticsService.getCategoryStatistics().subscribe(data => {

      this.getTranslatedCategories(data.categories);

      this.radarChartLabels = this.translatedCategories;
      this.radarChartData = [{ data: data.data, label: 'Количество выполнений'}];
      this.response = true;
    }));
  }

  getTranslatedCategories(categories: string[]): void {
    categories.forEach((category) => {
      this.subscriptions.add(
        this.translate.get(category).subscribe((text: string) => {
          this.translatedCategories.push(text);
        })
      );
    });

  }

  private setTitle(): void {
    this.subscriptions.add(this.titleService.updateTitle('statistics'));
  }
}
