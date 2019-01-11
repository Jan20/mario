import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from '../misc/firestore.stub';

describe('TestService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub },
    ],

  }));

  it('should be created', () => {
    const service: TestService = TestBed.get(TestService);
    expect(service).toBeTruthy();
  });
});
