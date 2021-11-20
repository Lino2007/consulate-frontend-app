import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVerticalMenuComponent } from './dashboard-vertical-menu.component';

describe('DashboardVerticalMenuComponent', () => {
  let component: DashboardVerticalMenuComponent;
  let fixture: ComponentFixture<DashboardVerticalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVerticalMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVerticalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
