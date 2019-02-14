import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioComponent } from './audio.component';
import { MaterialModule } from 'src/app/config/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from 'selenium-webdriver/http';
import { LevelService } from '../services/level.service';
import { AngularFirestore } from '@angular/fire/firestore';

describe('AudioComponent', () => {
  let component: AudioComponent;
  let fixture: ComponentFixture<AudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        
        AudioComponent 
      
      ],
      imports: [ 
        
        MaterialModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        SharedModule,
        HttpClientModule
      
      ],
      providers: [
        
        LevelService,
        AngularFirestore

      ]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
