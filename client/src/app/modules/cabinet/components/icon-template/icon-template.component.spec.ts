import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTemplateComponent } from './icon-template.component';

describe('IconTemplateComponent', () => {
  let component: IconTemplateComponent;
  let fixture: ComponentFixture<IconTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
