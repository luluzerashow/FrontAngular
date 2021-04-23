/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FaixascreateComponent } from './faixascreate.component';

describe('FaixascreateComponent', () => {
  let component: FaixascreateComponent;
  let fixture: ComponentFixture<FaixascreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaixascreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaixascreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
