import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAimComponent } from './list-aim.component';

describe('ListAimComponent', () => {
  let component: ListAimComponent;
  let fixture: ComponentFixture<ListAimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
