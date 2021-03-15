import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAffairComponent } from './edit-affair.component';

describe('EditAffairComponent', () => {
  let component: EditAffairComponent;
  let fixture: ComponentFixture<EditAffairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAffairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAffairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
