import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalstoreProductsComponent } from './medicalstore-products.component';

describe('MedicalstoreProductsComponent', () => {
  let component: MedicalstoreProductsComponent;
  let fixture: ComponentFixture<MedicalstoreProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalstoreProductsComponent]
    });
    fixture = TestBed.createComponent(MedicalstoreProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
