import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfisdeleteComponent } from './perfisdelete.component';

describe('PerfisdeleteComponent', () => {
  let component: PerfisdeleteComponent;
  let fixture: ComponentFixture<PerfisdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfisdeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfisdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
