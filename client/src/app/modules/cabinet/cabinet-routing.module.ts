import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutComponent } from './components/pages/cabinet-layout/cabinet-layout.component';
import { CreateHabitComponent } from './components/pages/habit/create-habit/create-habit.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CreateTaskComponent } from './components/pages/task/create-task/create-task.component';
import { ListHabitControlViewComponent } from './components/pages/habit/control-view/list-habit/list-habit-control-view.component';
import { ListTaskControlViewComponent } from './components/pages/task/control-view/list-task/list-task-control-view.component';


const routes: Routes = [
  {
    path: '',
    component: CabinetLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },

      { path: 'habit/create', component: CreateHabitComponent },
      { path: 'task/create', component: CreateTaskComponent },

      { path: 'habits/:id', component: CreateHabitComponent },
      { path: 'tasks/:id', component: CreateTaskComponent },

      { path: 'habits', component: ListHabitControlViewComponent },
      { path: 'tasks', component: ListTaskControlViewComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
