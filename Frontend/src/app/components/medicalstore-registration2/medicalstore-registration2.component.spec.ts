import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalstoreRegistration2Component } from './medicalstore-registration2.component';

describe('MedicalstoreRegistration2Component', () => {
  let component: MedicalstoreRegistration2Component;
  let fixture: ComponentFixture<MedicalstoreRegistration2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalstoreRegistration2Component]
    });
    fixture = TestBed.createComponent(MedicalstoreRegistration2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
