import { TestBed } from '@angular/core/testing';

import { ChecktreeService } from './checktree.service';

describe('ChecktreeService', () => {
  let service: ChecktreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecktreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
