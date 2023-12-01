import { TestBed } from '@angular/core/testing';

import { VariableServiceService } from './variable-service.service';

describe('VariableServiceService', () => {
  let service: VariableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
