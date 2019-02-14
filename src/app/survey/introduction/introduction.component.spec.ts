import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionComponent } from './introduction.component';
import { MaterialModule } from 'src/app/config/material.module';
import { MarioModule } from 'src/app/mario/mario.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        
        IntroductionComponent,

      ], 
      imports: [ 
        
        MaterialModule, 
        MarioModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        BrowserAnimationsModule,

      ], 
      providers: [

        AngularFirestore,
        {provide: APP_BASE_HREF, useValue : '/' }

      ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
