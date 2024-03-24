import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalstoreLoginComponent } from './medicalstore-login.component';

describe('MedicalstoreLoginComponent', () => {
  let component: MedicalstoreLoginComponent;
  let fixture: ComponentFixture<MedicalstoreLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalstoreLoginComponent]
    });
    fixture = TestBed.createComponent(MedicalstoreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
