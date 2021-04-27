import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHabitControlViewComponent } from './list-habit-control-view.component';

describe('ListHabitControlViewComponent', () => {
  let component: ListHabitControlViewComponent;
  let fixture: ComponentFixture<ListHabitControlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHabitControlViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHabitControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
