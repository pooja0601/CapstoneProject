import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStudentComponent } from './review-student.component';

describe('ReviewStudentComponent', () => {
  let component: ReviewStudentComponent;
  let fixture: ComponentFixture<ReviewStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
