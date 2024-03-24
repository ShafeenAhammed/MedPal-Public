import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStoreUpdateOrderComponent } from './medical-store-update-order.component';

describe('MedicalStoreUpdateOrderComponent', () => {
  let component: MedicalStoreUpdateOrderComponent;
  let fixture: ComponentFixture<MedicalStoreUpdateOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalStoreUpdateOrderComponent]
    });
    fixture = TestBed.createComponent(MedicalStoreUpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
