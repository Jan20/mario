import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part12Component } from './part12.component';

describe('Part12Component', () => {
  let component: Part12Component;
  let fixture: ComponentFixture<Part12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
