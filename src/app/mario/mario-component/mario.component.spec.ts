import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarioComponent } from './mario.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialModule } from 'src/app/config/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LevelService } from '../services/level.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('MarioComponent', () => {
  let component: MarioComponent;
  let fixture: ComponentFixture<MarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        
        MarioComponent 
      
      ],
      imports: [ 
        
        MaterialModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        SharedModule,
        RouterModule,
        RouterTestingModule,
      
      ],
      providers: [
        
        HttpClient,
        LevelService,
        AngularFirestore,
        {provide: APP_BASE_HREF, useValue : '/' }

      ]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
