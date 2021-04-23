/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FaixasindexComponent } from './faixasindex.component';

describe('FaixasindexComponent', () => {
  let component: FaixasindexComponent;
  let fixture: ComponentFixture<FaixasindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaixasindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaixasindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
