import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Part3Component } from './part3.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { MaterialModule } from 'src/app/config/material.module';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Part3Component', () => {
  let component: Part3Component;
  let fixture: ComponentFixture<Part3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part3Component ],
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
    fixture = TestBed.createComponent(Part3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
