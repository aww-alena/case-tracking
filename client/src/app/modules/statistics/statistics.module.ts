import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatisticsRoutingModule} from './statistics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticCalendarComponent } from './components/statistic-calendar/statistic-calendar.component';
import { HabitStatisticsComponent } from './components/pages/habit-statistics/habit-statistics.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CabinetModule } from '../cabinet/cabinet.module';
import { ListEntryComponent } from './components/entry/list-entry/list-entry.component';
import { ItemEntryComponent } from './components/entry/item-entry/item-entry.component';

@NgModule({
  declarations: [
    StatisticCalendarComponent,
    HabitStatisticsComponent,
    ListEntryComponent,
    ItemEntryComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule,
    CabinetModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class StatisticsModule { }
