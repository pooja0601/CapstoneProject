import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentsMarksComponent } from './show-students-marks.component';

describe('ShowStudentsMarksComponent', () => {
  let component: ShowStudentsMarksComponent;
  let fixture: ComponentFixture<ShowStudentsMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudentsMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentsMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
