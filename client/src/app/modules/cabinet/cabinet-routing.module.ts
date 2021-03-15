import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutComponent } from '../cabinet/components/cabinet-layout/cabinet-layout.component';
import { CreateAffairComponent } from './components/affair/create-affair/create-affair.component';
import { ListAffairComponent } from './components/affair/list-affair/list-affair.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: CabinetLayoutComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'affair/create', component: CreateAffairComponent },
    { path: 'affairs', component: ListAffairComponent }
  ]}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
