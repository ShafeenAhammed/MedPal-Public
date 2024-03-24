import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppoinmentsComponent } from './user-appoinments.component';

describe('UserAppoinmentsComponent', () => {
  let component: UserAppoinmentsComponent;
  let fixture: ComponentFixture<UserAppoinmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAppoinmentsComponent]
    });
    fixture = TestBed.createComponent(UserAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
