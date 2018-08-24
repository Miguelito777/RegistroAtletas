import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtletasInscroitosPage } from './atletas-inscroitos.page';

describe('AtletasInscroitosPage', () => {
  let component: AtletasInscroitosPage;
  let fixture: ComponentFixture<AtletasInscroitosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtletasInscroitosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtletasInscroitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
