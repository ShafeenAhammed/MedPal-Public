import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredMedicalStoresComponent } from './registered-medical-stores.component';

describe('RegisteredMedicalStoresComponent', () => {
  let component: RegisteredMedicalStoresComponent;
  let fixture: ComponentFixture<RegisteredMedicalStoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredMedicalStoresComponent]
    });
    fixture = TestBed.createComponent(RegisteredMedicalStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
