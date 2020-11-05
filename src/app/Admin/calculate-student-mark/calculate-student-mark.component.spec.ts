import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateStudentMarkComponent } from './calculate-student-mark.component';

describe('CalculateStudentMarkComponent', () => {
  let component: CalculateStudentMarkComponent;
  let fixture: ComponentFixture<CalculateStudentMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateStudentMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateStudentMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
