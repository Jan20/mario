import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { MaterialModule } from 'src/app/config/material.module';
import { MarioModule } from 'src/app/mario/mario.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
    
      declarations: [ SurveyComponent ],
      imports: [ 
        
        MaterialModule, 
        MarioModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),

      ],
      providers:[

        AngularFirestore

      ]
    
    }).compileComponents()
  
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
