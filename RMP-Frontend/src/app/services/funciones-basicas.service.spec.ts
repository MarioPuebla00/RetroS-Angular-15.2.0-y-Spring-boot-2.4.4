import { TestBed } from '@angular/core/testing';

import { FuncionesBasicasService } from './funciones-basicas.service';

describe('FuncionesBasicasService', () => {
  let service: FuncionesBasicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionesBasicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
