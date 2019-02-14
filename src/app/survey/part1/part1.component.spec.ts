import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part1Component } from './part1.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { MaterialModule } from 'src/app/config/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Part1Component', () => {
  let component: Part1Component;
  let fixture: ComponentFixture<Part1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part1Component ],
      imports: [

        CommonModule,
        MaterialModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,

      ],
      providers: [

        {provide: APP_BASE_HREF, useValue : '/' }

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
