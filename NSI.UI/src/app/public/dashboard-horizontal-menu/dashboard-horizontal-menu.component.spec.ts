import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHorizontalMenuComponent } from './dashboard-horizontal-menu.component';

describe('DashboardHorizontalMenuComponent', () => {
  let component: DashboardHorizontalMenuComponent;
  let fixture: ComponentFixture<DashboardHorizontalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHorizontalMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHorizontalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
