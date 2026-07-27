import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationListe } from './affectation-liste';

describe('AffectationListe', () => {
  let component: AffectationListe;
  let fixture: ComponentFixture<AffectationListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectationListe],
    }).compileComponents();

    fixture = TestBed.createComponent(AffectationListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
