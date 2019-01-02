import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { MaterialModule } from 'src/app/config/material.module';
import { MarioModule } from 'src/app/mario/mario.module';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyComponent ],
      imports: [ MaterialModule, MarioModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
