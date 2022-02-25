/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassificacacaoService } from './classificacacao.service';

describe('Service: Classificacacao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassificacacaoService]
    });
  });

  it('should ...', inject([ClassificacacaoService], (service: ClassificacacaoService) => {
    expect(service).toBeTruthy();
  }));
});
