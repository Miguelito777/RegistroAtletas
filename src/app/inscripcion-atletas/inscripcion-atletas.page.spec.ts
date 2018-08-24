import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionAtletasPage } from './inscripcion-atletas.page';

describe('InscripcionAtletasPage', () => {
  let component: InscripcionAtletasPage;
  let fixture: ComponentFixture<InscripcionAtletasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionAtletasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionAtletasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
