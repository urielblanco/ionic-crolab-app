import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase-service.service';

describe('FirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseServiceService);
    expect(service).toBeTruthy();
  });
});
