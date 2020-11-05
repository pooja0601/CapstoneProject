import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateWhatIfMarkComponent } from './calculate-what-if-mark.component';

describe('CalculateWhatIfMarkComponent', () => {
  let component: CalculateWhatIfMarkComponent;
  let fixture: ComponentFixture<CalculateWhatIfMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateWhatIfMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateWhatIfMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
