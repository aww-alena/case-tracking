import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondensedStatisticsComponent } from './condensed-statistics.component';

describe('CondensedStatisticsComponent', () => {
  let component: CondensedStatisticsComponent;
  let fixture: ComponentFixture<CondensedStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondensedStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondensedStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
