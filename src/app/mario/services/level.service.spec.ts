import { TestBed } from '@angular/core/testing';

import { LevelService } from './level.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreStub } from 'src/app/testing/Firestore-stub';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from 'src/app/config/environment';
import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = environment.firebaseConfig;

describe('LevelService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({

    imports: [

      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule.enablePersistence(),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
    
    ],
    providers: [
       
      { provide: AngularFirestore, useValue: FirestoreStub },
    
    ]  

  }));

  it('should be created', () => {
    const service: LevelService = TestBed.get(LevelService);
    expect(service).toBeTruthy();
  });
});

