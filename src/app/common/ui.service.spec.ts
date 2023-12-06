import { TestBed } from '@angular/core/testing';

import { UiService } from './ui.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthServiceSpy } from './common.testing';
import { AuthService } from '../auth/auth.service';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UiService,
        { provide: AuthService, useValue: AuthServiceSpy },
      ],
    });
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
