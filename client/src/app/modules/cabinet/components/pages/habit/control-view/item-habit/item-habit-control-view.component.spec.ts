import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHabitControlViewComponent } from './item-habit-control-view.component';

describe('ItemHabitControlViewComponent', () => {
  let component: ItemHabitControlViewComponent;
  let fixture: ComponentFixture<ItemHabitControlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHabitControlViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHabitControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
