import { TestBed } from '@angular/core/testing';

import { TabledyService } from './tabledy.service';

describe('TabledyService', () => {
  let service: TabledyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabledyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
