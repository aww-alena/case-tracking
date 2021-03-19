import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CabinetLayoutComponent } from './components/cabinet-layout/cabinet-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateAffairComponent } from './components/affair/create-affair/create-affair.component';
import { EditAffairComponent } from './components/affair/edit-affair/edit-affair.component';
import { ItemAffairComponent } from './components/affair/item-affair/item-affair.component';
import { ListAffairComponent } from './components/affair/list-affair/list-affair.component';
import { RatingComponent } from './components/rating/rating.component';
import { TimerComponent } from './components/timer/timer.component';


@NgModule({
  declarations: [CabinetLayoutComponent, DashboardComponent, CreateAffairComponent, EditAffairComponent, ItemAffairComponent, ListAffairComponent, RatingComponent, TimerComponent],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule,
    MatSidenavModule
  ]
})
export class CabinetModule { }
