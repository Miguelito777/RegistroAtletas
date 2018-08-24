import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElitePage } from './elite.page';

describe('ElitePage', () => {
  let component: ElitePage;
  let fixture: ComponentFixture<ElitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
