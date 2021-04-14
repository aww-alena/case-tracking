import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubtasksComponent } from './create-subtasks.component';

describe('CreateSubtasksComponent', () => {
  let component: CreateSubtasksComponent;
  let fixture: ComponentFixture<CreateSubtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubtasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
