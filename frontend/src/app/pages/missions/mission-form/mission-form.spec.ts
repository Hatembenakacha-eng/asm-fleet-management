import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionForm } from './mission-form';

describe('MissionForm', () => {
  let component: MissionForm;
  let fixture: ComponentFixture<MissionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
