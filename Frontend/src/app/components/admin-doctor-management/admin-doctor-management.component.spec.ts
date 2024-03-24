import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorManagementComponent } from './admin-doctor-management.component';

describe('AdminDoctorManagementComponent', () => {
  let component: AdminDoctorManagementComponent;
  let fixture: ComponentFixture<AdminDoctorManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDoctorManagementComponent]
    });
    fixture = TestBed.createComponent(AdminDoctorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
