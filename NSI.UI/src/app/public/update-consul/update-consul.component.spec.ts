import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConsulComponent } from './update-consul.component';

describe('UpdateConsulComponent', () => {
  let component: UpdateConsulComponent;
  let fixture: ComponentFixture<UpdateConsulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConsulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConsulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
