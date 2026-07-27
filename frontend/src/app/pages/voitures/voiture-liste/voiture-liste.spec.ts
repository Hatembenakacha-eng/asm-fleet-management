import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureListe } from './voiture-liste';

describe('VoitureListe', () => {
  let component: VoitureListe;
  let fixture: ComponentFixture<VoitureListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoitureListe],
    }).compileComponents();

    fixture = TestBed.createComponent(VoitureListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
