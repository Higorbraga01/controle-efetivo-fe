import { TestBed } from '@angular/core/testing';

import { JulgamentoInspecaoService } from './julgamento-inspecao.service';

describe('JulgamentoInspecaoService', () => {
  let service: JulgamentoInspecaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JulgamentoInspecaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
