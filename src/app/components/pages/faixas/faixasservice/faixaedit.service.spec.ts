/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaixaeditService } from './faixaedit.service';

describe('Service: Faixaedit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaixaeditService]
    });
  });

  it('should ...', inject([FaixaeditService], (service: FaixaeditService) => {
    expect(service).toBeTruthy();
  }));
});
