/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaixaindexService } from './faixaindex.service';

describe('Service: Faixaindex', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaixaindexService]
    });
  });

  it('should ...', inject([FaixaindexService], (service: FaixaindexService) => {
    expect(service).toBeTruthy();
  }));
});
