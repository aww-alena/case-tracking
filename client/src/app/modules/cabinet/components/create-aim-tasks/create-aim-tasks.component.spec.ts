import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAimTasksComponent } from './create-aim-tasks.component';

describe('CreateAimTasksComponent', () => {
  let component: CreateAimTasksComponent;
  let fixture: ComponentFixture<CreateAimTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAimTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAimTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
