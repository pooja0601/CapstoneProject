import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaCalculationComponent } from './formula-calculation.component';

describe('FormulaCalculationComponent', () => {
  let component: FormulaCalculationComponent;
  let fixture: ComponentFixture<FormulaCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
