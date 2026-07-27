import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionListe } from './mission-liste';

describe('MissionListe', () => {
  let component: MissionListe;
  let fixture: ComponentFixture<MissionListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionListe],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
