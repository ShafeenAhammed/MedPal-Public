import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMedStoreViewComponent } from './user-med-store-view.component';

describe('UserMedStoreViewComponent', () => {
  let component: UserMedStoreViewComponent;
  let fixture: ComponentFixture<UserMedStoreViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMedStoreViewComponent]
    });
    fixture = TestBed.createComponent(UserMedStoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
