import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDashbordComponent } from './room-dashbord.component';

describe('RoomDashbordComponent', () => {
  let component: RoomDashbordComponent;
  let fixture: ComponentFixture<RoomDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomDashbordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
