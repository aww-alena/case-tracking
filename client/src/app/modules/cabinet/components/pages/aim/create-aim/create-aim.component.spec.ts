import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAimComponent } from './create-aim.component';

describe('CreateAimComponent', () => {
  let component: CreateAimComponent;
  let fixture: ComponentFixture<CreateAimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
