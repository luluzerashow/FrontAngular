/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaixacreateService } from './faixacreate.service';

describe('Service: Faixacreate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaixacreateService]
    });
  });

  it('should ...', inject([FaixacreateService], (service: FaixacreateService) => {
    expect(service).toBeTruthy();
  }));
});
