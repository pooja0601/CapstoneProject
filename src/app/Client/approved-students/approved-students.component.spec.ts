import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedStudentsComponent } from './approved-students.component';

describe('ApprovedStudentsComponent', () => {
  let component: ApprovedStudentsComponent;
  let fixture: ComponentFixture<ApprovedStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
