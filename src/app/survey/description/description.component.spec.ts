import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionComponent } from './description.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { MaterialModule } from 'src/app/config/material.module';
import { TuxModule } from 'src/app/tux/tux.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        
        DescriptionComponent,

      ], 
      imports: [ 
        
        MaterialModule, 
        TuxModule,
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
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
