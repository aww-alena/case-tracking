import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export interface LineChartStatistics {
    labels: Label[];
    data: ChartDataSets;
}
