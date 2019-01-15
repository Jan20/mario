import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { TestService } from 'src/app/test/services/test.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Samples } from 'src/app/misc/samples';

describe('SessionService', () => {

  beforeEach(() => TestBed.configureTestingModule({

    imports: [

      AngularFireModule.initializeApp(environment.firebaseConfig)

    ],
    providers: [

      AngularFirestore,
      TestService,

    ],


  }));


  it("getSessionKeys() should return ['session_042'].", async () => {

    const testService: TestService = TestBed.get(TestService)
    const sessionService: SessionService = TestBed.get(SessionService)

    await testService.setUp()

    const result: string[] = await sessionService.getSessionKeys('user_042')
    const expectedResult: string[] = ['session_042']

    expect(result).toEqual(expectedResult)

    await testService.cleanUp()

  })
  

  it("generateSession() should return 'session_001'.", async () => {
    
    const testService: TestService = TestBed.get(TestService)
    const sessionService: SessionService = TestBed.get(SessionService)

    await testService.setUp()
    

    const result: string = await sessionService.generateSession()
    const expectedResult: string = 'session_001'

    expect(result).toEqual(expectedResult)

    await testService.cleanUp()

  })

  it('should be created', () => {

    const service: SessionService = TestBed.get(SessionService)
    expect(service).toBeTruthy()

  })

})



