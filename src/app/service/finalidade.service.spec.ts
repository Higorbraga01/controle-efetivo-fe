/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FinalidadeService } from './finalidade.service';

describe('Service: Finalidade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalidadeService]
    });
  });

  it('should ...', inject([FinalidadeService], (service: FinalidadeService) => {
    expect(service).toBeTruthy();
  }));
});
