import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedStoreStatsComponent } from './admin-med-store-stats.component';

describe('AdminMedStoreStatsComponent', () => {
  let component: AdminMedStoreStatsComponent;
  let fixture: ComponentFixture<AdminMedStoreStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMedStoreStatsComponent]
    });
    fixture = TestBed.createComponent(AdminMedStoreStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
