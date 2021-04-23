import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiseditComponent } from './perfisedit.component';

describe('PerfiseditComponent', () => {
  let component: PerfiseditComponent;
  let fixture: ComponentFixture<PerfiseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfiseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
