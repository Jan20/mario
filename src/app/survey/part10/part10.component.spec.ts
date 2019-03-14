import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part10Component } from './part10.component';

describe('Part10Component', () => {
  let component: Part10Component;
  let fixture: ComponentFixture<Part10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
