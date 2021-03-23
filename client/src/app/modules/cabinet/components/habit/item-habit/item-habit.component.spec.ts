import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHabitComponent } from './item-habit.component';

describe('ItemHabitComponent', () => {
  let component: ItemHabitComponent;
  let fixture: ComponentFixture<ItemHabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHabitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
