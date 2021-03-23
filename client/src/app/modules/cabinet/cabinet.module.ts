import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CabinetLayoutComponent } from './components/cabinet-layout/cabinet-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateHabitComponent } from './components/habit/create-habit/create-habit.component';
import { EditHabitComponent } from './components/habit/edit-habit/edit-habit.component';
import { ItemHabitComponent } from './components/habit/item-habit/item-habit.component';
import { ListHabitComponent } from './components/habit/list-habit/list-habit.component';
import { RatingComponent } from './components/rating/rating.component';
import { TimerComponent } from './components/timer/timer.component';
import { CalendarComponent } from './components/calendar/calendar.component';


@NgModule({
  declarations: [
    CabinetLayoutComponent,
    DashboardComponent,
    CreateHabitComponent,
    EditHabitComponent,
    ItemHabitComponent,
    ListHabitComponent,
    RatingComponent,
    TimerComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule,
    MatSidenavModule
  ]
})
export class CabinetModule { }
