import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalstoreAddCategoryComponent } from './medicalstore-add-category.component';

describe('MedicalstoreAddCategoryComponent', () => {
  let component: MedicalstoreAddCategoryComponent;
  let fixture: ComponentFixture<MedicalstoreAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalstoreAddCategoryComponent]
    });
    fixture = TestBed.createComponent(MedicalstoreAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
