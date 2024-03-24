import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocStatsComponent } from './admin-doc-stats.component';

describe('AdminDocStatsComponent', () => {
  let component: AdminDocStatsComponent;
  let fixture: ComponentFixture<AdminDocStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDocStatsComponent]
    });
    fixture = TestBed.createComponent(AdminDocStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
