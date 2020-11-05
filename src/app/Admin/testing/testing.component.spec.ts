import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TESTINGComponent } from './testing.component';

describe('TESTINGComponent', () => {
  let component: TESTINGComponent;
  let fixture: ComponentFixture<TESTINGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TESTINGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TESTINGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
