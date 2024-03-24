import { TestBed } from '@angular/core/testing';

import { MedicalStoreService } from './medical-store.service';

describe('MedicalStoreService', () => {
  let service: MedicalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
