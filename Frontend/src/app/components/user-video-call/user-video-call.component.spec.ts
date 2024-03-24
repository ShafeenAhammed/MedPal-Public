import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVideoCallComponent } from './user-video-call.component';

describe('UserVideoCallComponent', () => {
  let component: UserVideoCallComponent;
  let fixture: ComponentFixture<UserVideoCallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserVideoCallComponent]
    });
    fixture = TestBed.createComponent(UserVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
