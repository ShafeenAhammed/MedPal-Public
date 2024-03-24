import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalstoreCheckoutpageComponent } from './medicalstore-checkoutpage.component';

describe('MedicalstoreCheckoutpageComponent', () => {
  let component: MedicalstoreCheckoutpageComponent;
  let fixture: ComponentFixture<MedicalstoreCheckoutpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalstoreCheckoutpageComponent]
    });
    fixture = TestBed.createComponent(MedicalstoreCheckoutpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
