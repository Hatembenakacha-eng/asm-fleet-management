import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeListe } from './employe-liste';

describe('EmployeListe', () => {
  let component: EmployeListe;
  let fixture: ComponentFixture<EmployeListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeListe],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
