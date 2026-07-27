import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeForm } from './employe-form';

describe('EmployeForm', () => {
  let component: EmployeForm;
  let fixture: ComponentFixture<EmployeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
