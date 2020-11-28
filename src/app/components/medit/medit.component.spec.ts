import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditComponent } from './medit.component';

describe('MeditComponent', () => {
  let component: MeditComponent;
  let fixture: ComponentFixture<MeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
