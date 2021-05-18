import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryStaisticsComponent } from './category-staistics.component';

describe('CategoryStaisticsComponent', () => {
  let component: CategoryStaisticsComponent;
  let fixture: ComponentFixture<CategoryStaisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryStaisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryStaisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
