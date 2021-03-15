import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAffairComponent } from './list-affair.component';

describe('ListAffairComponent', () => {
  let component: ListAffairComponent;
  let fixture: ComponentFixture<ListAffairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAffairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAffairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
