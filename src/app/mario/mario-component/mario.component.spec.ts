import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarioComponent } from './mario.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialModule } from 'src/app/config/material.module';
import { FirestoreStub } from 'src/app/misc/firestore.stub';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LevelService } from '../services/level.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

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
        AngularFireModule.initializeApp(environment.firebaseConfig)
      
      ],
      providers: [
        
        HttpClient,
        LevelService,
        AngularFirestore
      
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
