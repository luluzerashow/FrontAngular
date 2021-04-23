import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiscreateComponent } from './perfiscreate.component';

describe('PerfiscreateComponent', () => {
  let component: PerfiscreateComponent;
  let fixture: ComponentFixture<PerfiscreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfiscreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiscreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
