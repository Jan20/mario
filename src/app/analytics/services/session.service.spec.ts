import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreStub } from 'src/app/testing/Firestore-stub';

describe('SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub },
    ],


  }));

  it('should be created', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service).toBeTruthy();
  });
});
