import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recommandation } from './recommandation';

describe('Recommandation', () => {
  let component: Recommandation;
  let fixture: ComponentFixture<Recommandation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recommandation],
    }).compileComponents();

    fixture = TestBed.createComponent(Recommandation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
