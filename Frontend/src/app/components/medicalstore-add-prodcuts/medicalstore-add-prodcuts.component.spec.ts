import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalstoreAddProdcutsComponent } from './medicalstore-add-prodcuts.component';

describe('MedicalstoreAddProdcutsComponent', () => {
  let component: MedicalstoreAddProdcutsComponent;
  let fixture: ComponentFixture<MedicalstoreAddProdcutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalstoreAddProdcutsComponent]
    });
    fixture = TestBed.createComponent(MedicalstoreAddProdcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
