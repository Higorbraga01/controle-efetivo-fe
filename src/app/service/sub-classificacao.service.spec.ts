/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubClassificacaoService } from './sub-classificacao.service';

describe('Service: SubClassificacao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubClassificacaoService]
    });
  });

  it('should ...', inject([SubClassificacaoService], (service: SubClassificacaoService) => {
    expect(service).toBeTruthy();
  }));
});
