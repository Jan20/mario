import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarioComponent } from './mario.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialModule } from 'src/app/config/material.module';
import { FirestoreStub } from 'src/app/misc/firestore.stub';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LevelService } from '../services/level.service';

describe('MarioComponent', () => {
  let component: MarioComponent;
  let fixture: ComponentFixture<MarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarioComponent ],
      imports: [ 
        
        MaterialModule,
        HttpClientModule
      
      ],
      providers: [
        
        HttpClient,
        LevelService,
        { provide: AngularFirestore, useValue: FirestoreStub },
      
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
