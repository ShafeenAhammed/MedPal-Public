import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalstoreRegistrationComponent } from './medicalstore-registration.component';

describe('MedicalstoreRegistrationComponent', () => {
  let component: MedicalstoreRegistrationComponent;
  let fixture: ComponentFixture<MedicalstoreRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalstoreRegistrationComponent]
    });
    fixture = TestBed.createComponent(MedicalstoreRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
