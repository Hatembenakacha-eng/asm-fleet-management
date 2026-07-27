import { TestBed } from '@angular/core/testing';

import { Voiture } from './voiture';

describe('Voiture', () => {
  let service: Voiture;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Voiture);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
