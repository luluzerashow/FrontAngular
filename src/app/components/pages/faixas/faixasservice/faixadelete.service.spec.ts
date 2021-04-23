/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaixadeleteService } from './faixadelete.service';

describe('Service: Faixadelete', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaixadeleteService]
    });
  });

  it('should ...', inject([FaixadeleteService], (service: FaixadeleteService) => {
    expect(service).toBeTruthy();
  }));
});
