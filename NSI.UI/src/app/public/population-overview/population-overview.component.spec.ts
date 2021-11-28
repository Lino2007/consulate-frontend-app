import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationOverviewComponent } from './population-overview.component';

describe('PopulationOverviewComponent', () => {
  let component: PopulationOverviewComponent;
  let fixture: ComponentFixture<PopulationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
