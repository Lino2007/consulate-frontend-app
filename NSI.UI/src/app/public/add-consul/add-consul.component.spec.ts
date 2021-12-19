import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsulComponent } from './add-consul.component';

describe('AddConsulComponent', () => {
  let component: AddConsulComponent;
  let fixture: ComponentFixture<AddConsulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConsulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
