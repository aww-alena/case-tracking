import { TestBed } from '@angular/core/testing';

import { HabitStoreService } from './habit-store.service';

describe('HabitStoreService', () => {
  let service: HabitStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
