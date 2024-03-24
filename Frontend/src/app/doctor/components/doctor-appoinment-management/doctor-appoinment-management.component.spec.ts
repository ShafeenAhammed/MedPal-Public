import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppoinmentManagementComponent } from './doctor-appoinment-management.component';

describe('DoctorAppoinmentManagementComponent', () => {
  let component: DoctorAppoinmentManagementComponent;
  let fixture: ComponentFixture<DoctorAppoinmentManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAppoinmentManagementComponent]
    });
    fixture = TestBed.createComponent(DoctorAppoinmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
