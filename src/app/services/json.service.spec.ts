import { TestBed } from '@angular/core/testing';

import { JsonService } from './json.service';

describe('JsonService', () => {
  let service: JsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
