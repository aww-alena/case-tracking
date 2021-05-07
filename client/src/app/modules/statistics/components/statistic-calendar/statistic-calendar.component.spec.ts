import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCalendarComponent } from './statistic-calendar.component';

describe('StatisticCalendarComponent', () => {
  let component: StatisticCalendarComponent;
  let fixture: ComponentFixture<StatisticCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
