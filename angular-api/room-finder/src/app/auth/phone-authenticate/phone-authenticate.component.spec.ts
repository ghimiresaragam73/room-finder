import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneAuthenticateComponent } from './phone-authenticate.component';

describe('PhoneAuthenticateComponent', () => {
  let component: PhoneAuthenticateComponent;
  let fixture: ComponentFixture<PhoneAuthenticateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneAuthenticateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
