/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsuarioindexService } from './usuarioindex.service';

describe('Service: Usuarioindex', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioindexService]
    });
  });

  it('should ...', inject([UsuarioindexService], (service: UsuarioindexService) => {
    expect(service).toBeTruthy();
  }));
});
