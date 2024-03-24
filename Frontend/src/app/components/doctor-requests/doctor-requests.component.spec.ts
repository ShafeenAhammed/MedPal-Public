import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRequestsComponent } from './doctor-requests.component';

describe('DoctorRequestsComponent', () => {
  let component: DoctorRequestsComponent;
  let fixture: ComponentFixture<DoctorRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorRequestsComponent]
    });
    fixture = TestBed.createComponent(DoctorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
