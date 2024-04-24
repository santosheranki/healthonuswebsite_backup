import { TestBed } from '@angular/core/testing';

import { MetadataserviceService } from './metadataservice.service';

describe('MetadataserviceService', () => {
  let service: MetadataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
