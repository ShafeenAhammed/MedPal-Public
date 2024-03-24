import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVideoCallComponent } from './doctor-video-call.component';

describe('DoctorVideoCallComponent', () => {
  let component: DoctorVideoCallComponent;
  let fixture: ComponentFixture<DoctorVideoCallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorVideoCallComponent]
    });
    fixture = TestBed.createComponent(DoctorVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
