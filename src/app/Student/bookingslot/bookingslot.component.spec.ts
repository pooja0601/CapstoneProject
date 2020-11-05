import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingslotComponent } from './bookingslot.component';

describe('BookingslotComponent', () => {
  let component: BookingslotComponent;
  let fixture: ComponentFixture<BookingslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
