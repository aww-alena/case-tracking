import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutComponent } from '../cabinet/components/cabinet-layout/cabinet-layout.component';
import { CreateHabitComponent } from './components/habit/create-habit/create-habit.component';
import { EditHabitComponent } from './components/habit/edit-habit/edit-habit.component';
import { ListHabitComponent } from './components/habit/list-habit/list-habit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', component: CabinetLayoutComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'habit/create', component: CreateHabitComponent },
        { path: 'habits/:id', component: EditHabitComponent },
        { path: 'habits', component: ListHabitComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CabinetRoutingModule { }
