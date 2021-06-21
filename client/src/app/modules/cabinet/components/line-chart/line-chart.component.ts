import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input() lineChartData: ChartDataSets[];
  @Input() lineChartLabels: Label[];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      align: 'center',
      labels: {
          fontColor: 'rgba(255,255,255,0.9)',
          usePointStyle: true,
          padding: 20
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: 'rgba(255,255,255,0.7)',
        },
        gridLines: {
          color: 'rgba(255,255,255,0.1)',
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'rgba(255,255,255,0.7)',
          },
          gridLines: {
            color: 'rgba(255,255,255,0.1)',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,177,52,0.4)',
      borderColor: '#ffb134',
      pointBackgroundColor: '#ffb134',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ffb134'
    },
    {
      backgroundColor: 'rgba(70,96,182,0.4)',
      borderColor: '#4660b6',
      pointBackgroundColor: '#4660b6',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#4660b6'
    },
    { // red
      backgroundColor: 'rgba(255,118,255,0.4)',
      borderColor: 'rgb(255,118,255)',
      pointBackgroundColor: 'rgb(255,118,255)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor() {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes);
  }

}
