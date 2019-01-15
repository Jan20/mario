import { TestBed } from '@angular/core/testing';

import { LevelService } from './level.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/app/misc/firestore.stub';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { HttpClient, HttpClientModule } from '@angular/common/http';
export const firebaseConfig = environment.firebaseConfig;

describe('LevelService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({

    imports: [

      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule.enablePersistence(),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)

    ],
    providers: [
      
      HttpClient,
      AngularFirestore
    
    ]  

  }));

  it('should be created', () => {
  
    const service: LevelService = TestBed.get(LevelService)
    expect(service).toBeTruthy()
  
  })

})

