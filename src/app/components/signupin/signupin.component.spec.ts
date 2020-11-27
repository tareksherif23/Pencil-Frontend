import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupinComponent } from './signupin.component';

describe('SignupinComponent', () => {
  let component: SignupinComponent;
  let fixture: ComponentFixture<SignupinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
