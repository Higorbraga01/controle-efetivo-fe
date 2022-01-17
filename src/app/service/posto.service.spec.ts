import { TestBed } from '@angular/core/testing';

import { PostoService } from './posto.service';

describe('PostoService', () => {
  let service: PostoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
