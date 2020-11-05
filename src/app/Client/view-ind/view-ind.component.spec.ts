import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndComponent } from './view-ind.component';

describe('ViewIndComponent', () => {
  let component: ViewIndComponent;
  let fixture: ComponentFixture<ViewIndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
