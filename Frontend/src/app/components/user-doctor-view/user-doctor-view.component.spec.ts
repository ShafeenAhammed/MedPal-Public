import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDoctorViewComponent } from './user-doctor-view.component';

describe('UserDoctorViewComponent', () => {
  let component: UserDoctorViewComponent;
  let fixture: ComponentFixture<UserDoctorViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDoctorViewComponent]
    });
    fixture = TestBed.createComponent(UserDoctorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
