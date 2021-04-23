import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfisindexComponent } from './perfisindex.component';

describe('PerfisindexComponent', () => {
  let component: PerfisindexComponent;
  let fixture: ComponentFixture<PerfisindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfisindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfisindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
