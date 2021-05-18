import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutComponent } from '../cabinet/components/pages/cabinet-layout/cabinet-layout.component';
import { HabitStatisticsComponent } from './components/pages/habit-statistics/habit-statistics.component';
import { CategoryStaisticsComponent } from './components/pages/category-staistics/category-staistics.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetLayoutComponent,
    children: [
      { path: 'habits', component: HabitStatisticsComponent },
      { path: 'categories', component: CategoryStaisticsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
