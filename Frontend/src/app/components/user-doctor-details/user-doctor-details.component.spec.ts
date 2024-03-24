import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDoctorDetailsComponent } from './user-doctor-details.component';

describe('UserDoctorDetailsComponent', () => {
  let component: UserDoctorDetailsComponent;
  let fixture: ComponentFixture<UserDoctorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDoctorDetailsComponent]
    });
    fixture = TestBed.createComponent(UserDoctorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
