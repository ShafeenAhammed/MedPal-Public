import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedStoreManagementComponent } from './admin-med-store-management.component';

describe('AdminMedStoreManagementComponent', () => {
  let component: AdminMedStoreManagementComponent;
  let fixture: ComponentFixture<AdminMedStoreManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMedStoreManagementComponent]
    });
    fixture = TestBed.createComponent(AdminMedStoreManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
