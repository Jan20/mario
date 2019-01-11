import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/app/misc/firestore.stub';

describe('SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub },
    ],


  }));

  it('getSessionKeys should return an array of session keys.', async () => {
    
    const sessionService: SessionService = TestBed.get(SessionService)

    const result: string[] = await sessionService.getSessionKeys('user_042')

    const expectedResult: string[] = ['session_042']

    expect(result).toBe(expectedResult)

  })


  it('should be created', () => {
    const service: SessionService = TestBed.get(SessionService)
    expect(service).toBeTruthy()
  })

})



