import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAimComponent } from './item-aim.component';

describe('ItemAimComponent', () => {
  let component: ItemAimComponent;
  let fixture: ComponentFixture<ItemAimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
