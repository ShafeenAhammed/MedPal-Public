import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSlotManagementComponent } from './doctor-slot-management.component';

describe('DoctorSlotManagementComponent', () => {
  let component: DoctorSlotManagementComponent;
  let fixture: ComponentFixture<DoctorSlotManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorSlotManagementComponent]
    });
    fixture = TestBed.createComponent(DoctorSlotManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
