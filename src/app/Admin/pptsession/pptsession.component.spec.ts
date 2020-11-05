import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PptsessionComponent } from './pptsession.component';

describe('PptsessionComponent', () => {
  let component: PptsessionComponent;
  let fixture: ComponentFixture<PptsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PptsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PptsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
