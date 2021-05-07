import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutComponent } from '../cabinet/components/pages/cabinet-layout/cabinet-layout.component';
import { HabitStatisticsComponent } from './components/pages/habit-statistics/habit-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetLayoutComponent,
    children: [
      { path: 'habits', component: HabitStatisticsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
