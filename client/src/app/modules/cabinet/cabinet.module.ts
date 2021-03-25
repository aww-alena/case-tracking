import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetLayoutComponent } from './components/pages/cabinet-layout/cabinet-layout.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CreateHabitComponent } from './components/pages/habit/create-habit/create-habit.component';
import { EditHabitComponent } from './components/pages/habit/edit-habit/edit-habit.component';
import { ItemHabitComponent } from './components/pages/habit/item-habit/item-habit.component';
import { ListHabitComponent } from './components/pages/habit/list-habit/list-habit.component';
import { RatingComponent } from './components/rating/rating.component';
import { TimerComponent } from './components/timer/timer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ColorPickerComponent } from './components/pickers/color-picker/color-picker.component';
import { IconPickerComponent } from './components/pickers/icon-picker/icon-picker.component';
import { DifficultyPickerComponent } from './components/pickers/difficulty-picker/difficulty-picker.component';
import { SchedulePickerComponent } from './components/pickers/schedule-picker/schedule-picker.component';
import { TimePickerComponent } from './components/pickers/time-picker/time-picker.component';
import { CategoryPickerComponent } from './components/pickers/category-picker/category-picker.component';

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
    CalendarComponent,
    ColorPickerComponent,
    IconPickerComponent,
    DifficultyPickerComponent,
    SchedulePickerComponent,
    TimePickerComponent,
    CategoryPickerComponent,
  ],
  imports: [CommonModule, CabinetRoutingModule, SharedModule, MatSidenavModule],
})
export class CabinetModule {}
