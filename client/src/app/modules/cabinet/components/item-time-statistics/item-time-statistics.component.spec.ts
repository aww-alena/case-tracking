import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTimeStatisticsComponent } from './item-time-statistics.component';

describe('ItemTimeStatisticsComponent', () => {
  let component: ItemTimeStatisticsComponent;
  let fixture: ComponentFixture<ItemTimeStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTimeStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTimeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
