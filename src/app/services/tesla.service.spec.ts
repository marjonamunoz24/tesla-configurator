import { TestBed } from '@angular/core/testing';

import { TeslaService } from './tesla.service';

describe('TeslaService', () => {
  let service: TeslaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeslaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
