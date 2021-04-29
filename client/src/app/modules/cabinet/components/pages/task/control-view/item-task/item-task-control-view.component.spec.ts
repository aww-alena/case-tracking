import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTaskControlViewComponent } from './item-task-control-view.component';

describe('ItemTaskControlViewComponent', () => {
  let component: ItemTaskControlViewComponent;
  let fixture: ComponentFixture<ItemTaskControlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTaskControlViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTaskControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
