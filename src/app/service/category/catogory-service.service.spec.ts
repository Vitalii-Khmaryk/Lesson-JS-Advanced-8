import { TestBed } from '@angular/core/testing';

import { CatogoryServiceService } from './catogory-service.service';

describe('CatogoryServiceService', () => {
  let service: CatogoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatogoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
