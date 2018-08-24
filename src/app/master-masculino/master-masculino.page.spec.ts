import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMasculinoPage } from './master-masculino.page';

describe('MasterMasculinoPage', () => {
  let component: MasterMasculinoPage;
  let fixture: ComponentFixture<MasterMasculinoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMasculinoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMasculinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
