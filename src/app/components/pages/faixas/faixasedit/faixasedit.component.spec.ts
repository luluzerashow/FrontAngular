/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FaixaseditComponent } from './faixasedit.component';

describe('FaixaseditComponent', () => {
  let component: FaixaseditComponent;
  let fixture: ComponentFixture<FaixaseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaixaseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaixaseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
