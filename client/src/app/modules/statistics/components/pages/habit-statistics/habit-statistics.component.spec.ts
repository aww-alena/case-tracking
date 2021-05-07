import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitStatisticsComponent } from './habit-statistics.component';

describe('HabitStatisticsComponent', () => {
  let component: HabitStatisticsComponent;
  let fixture: ComponentFixture<HabitStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
