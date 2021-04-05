import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteToDayComponent } from './note-to-day.component';

describe('NoteToDayComponent', () => {
  let component: NoteToDayComponent;
  let fixture: ComponentFixture<NoteToDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteToDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteToDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
