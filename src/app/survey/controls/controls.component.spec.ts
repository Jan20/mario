import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsComponent } from './controls.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { MaterialModule } from 'src/app/config/material.module';
import { MarioModule } from 'src/app/mario/mario.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        
        ControlsComponent,

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
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
