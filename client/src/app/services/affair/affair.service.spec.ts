import { TestBed } from '@angular/core/testing';

import { AffairService } from './affair.service';

describe('AffairService', () => {
  let service: AffairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
