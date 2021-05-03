import { TestBed } from '@angular/core/testing';

import { TitleStoreService } from './title-store.service';

describe('TitleStoreService', () => {
  let service: TitleStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
