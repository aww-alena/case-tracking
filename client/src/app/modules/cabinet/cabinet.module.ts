import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetLayoutComponent } from './components/pages/cabinet-layout/cabinet-layout.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CreateHabitComponent } from './components/pages/habit/create-habit/create-habit.component';
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
import { ChartsModule } from 'ng2-charts';
import { NoteToDayComponent } from './components/note-to-day/note-to-day.component';
import { CreateTaskComponent } from './components/pages/task/create-task/create-task.component';
import { ItemTaskComponent } from './components/pages/task/item-task/item-task.component';
import { ListTaskComponent } from './components/pages/task/list-task/list-task.component';
import { CreateSubtasksComponent } from './components/create-subtasks/create-subtasks.component';
import { SubtaskComponent } from './components/subtask/subtask.component';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { ItemTaskControlViewComponent } from './components/pages/task/control-view/item-task/item-task-control-view.component';
import { ListTaskControlViewComponent } from './components/pages/task/control-view/list-task/list-task-control-view.component';

import { ItemHabitControlViewComponent } from './components/pages/habit/control-view/item-habit/item-habit-control-view.component';
import { ListHabitControlViewComponent } from './components/pages/habit/control-view/list-habit/list-habit-control-view.component';
import { IconTemplateComponent } from './components/icon-template/icon-template.component';
import { TranslateService } from '@ngx-translate/core';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    CabinetLayoutComponent,
    DashboardComponent,
    CreateHabitComponent,
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
    NoteToDayComponent,
    CreateTaskComponent,
    ItemTaskComponent,
    ListTaskComponent,
    CreateSubtasksComponent,
    SubtaskComponent,
    ItemTaskControlViewComponent,
    ItemHabitControlViewComponent,
    ListTaskControlViewComponent,
    ListHabitControlViewComponent,
    IconTemplateComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule,
    MatSidenavModule,
    ChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  exports: [
    IconTemplateComponent,
    CabinetLayoutComponent,
    RatingComponent
  ]
})
export class CabinetModule {
  constructor(public translate: TranslateService) { }
}
