import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAffairComponent } from './item-affair.component';

describe('ItemAffairComponent', () => {
  let component: ItemAffairComponent;
  let fixture: ComponentFixture<ItemAffairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAffairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAffairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
