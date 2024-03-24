import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStoreRequestsComponent } from './medical-store-requests.component';

describe('MedicalStoreRequestsComponent', () => {
  let component: MedicalStoreRequestsComponent;
  let fixture: ComponentFixture<MedicalStoreRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalStoreRequestsComponent]
    });
    fixture = TestBed.createComponent(MedicalStoreRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
