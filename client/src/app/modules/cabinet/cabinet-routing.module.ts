import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutComponent } from './components/pages/cabinet-layout/cabinet-layout.component';
import { CreateHabitComponent } from './components/pages/habit/create-habit/create-habit.component';
import { EditHabitComponent } from './components/pages/habit/edit-habit/edit-habit.component';
import { ListHabitComponent } from './components/pages/habit/list-habit/list-habit.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CreateTaskComponent } from './components/pages/task/create-task/create-task.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'habit/create', component: CreateHabitComponent },
      { path: 'habits/:id', component: EditHabitComponent },
      { path: 'habits', component: ListHabitComponent },
      { path: 'task/create', component: CreateTaskComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
