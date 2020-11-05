import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentShowProjectsComponent } from './student-show-projects.component';

describe('StudentShowProjectsComponent', () => {
  let component: StudentShowProjectsComponent;
  let fixture: ComponentFixture<StudentShowProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentShowProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentShowProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
