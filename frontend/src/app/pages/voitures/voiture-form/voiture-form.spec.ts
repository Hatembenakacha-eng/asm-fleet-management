import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureForm } from './voiture-form';

describe('VoitureForm', () => {
  let component: VoitureForm;
  let fixture: ComponentFixture<VoitureForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoitureForm],
    }).compileComponents();

    fixture = TestBed.createComponent(VoitureForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
