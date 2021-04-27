import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskControlViewComponent } from './list-task-control-view.component';

describe('ListTaskControlViewComponent', () => {
  let component: ListTaskControlViewComponent;
  let fixture: ComponentFixture<ListTaskControlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaskControlViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaskControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
