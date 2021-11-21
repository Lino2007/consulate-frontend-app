import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulsListComponent } from './consuls-list.component';

describe('ConsulsListComponent', () => {
  let component: ConsulsListComponent;
  let fixture: ComponentFixture<ConsulsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
