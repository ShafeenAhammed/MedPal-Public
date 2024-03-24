import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStoreOrderDetailsComponent } from './medical-store-order-details.component';

describe('MedicalStoreOrderDetailsComponent', () => {
  let component: MedicalStoreOrderDetailsComponent;
  let fixture: ComponentFixture<MedicalStoreOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalStoreOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(MedicalStoreOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
