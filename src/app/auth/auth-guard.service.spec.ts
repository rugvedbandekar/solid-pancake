import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import {
  commonTestingModules,
  commonTestingProviders,
} from '../common/common.testing';

describe('AuthGuard', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: commonTestingModules,
      providers: commonTestingProviders,
    });
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
