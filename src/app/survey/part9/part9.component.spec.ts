import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part9Component } from './part9.component';

describe('Part9Component', () => {
  let component: Part9Component;
  let fixture: ComponentFixture<Part9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
