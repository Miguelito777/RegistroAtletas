import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibreFemeninoPage } from './libre-femenino.page';

describe('LibreFemeninoPage', () => {
  let component: LibreFemeninoPage;
  let fixture: ComponentFixture<LibreFemeninoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibreFemeninoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibreFemeninoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
