import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStoreOrderManagementComponent } from './medical-store-order-management.component';

describe('MedicalStoreOrderManagementComponent', () => {
  let component: MedicalStoreOrderManagementComponent;
  let fixture: ComponentFixture<MedicalStoreOrderManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalStoreOrderManagementComponent]
    });
    fixture = TestBed.createComponent(MedicalStoreOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
