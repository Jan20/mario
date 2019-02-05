import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { TestService } from 'src/app/test/services/test.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Samples } from 'src/app/test/samples';
import { Session } from 'src/app/models/session';

describe('SessionService', () => {

  beforeEach(() => TestBed.configureTestingModule({

    imports: [

      AngularFireModule.initializeApp(environment.firebaseConfig)

    ],
    providers: [

      AngularFirestore,
      TestService,
      HttpClient,
      HttpHandler,

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
  

  it("getSession() should return 'session", async () => {

    const testService: TestService = TestBed.get(TestService)
    const sessionService: SessionService = TestBed.get(SessionService)

    await testService.setUp()

    const result: Session = await sessionService.getSession(Samples.sampleUser.key, Samples.sampleSession.key)
    const expectedResult: Session = Samples.sampleSession

    expect(result.toObject()).toEqual(expectedResult.toObject())

    await testService.cleanUp()


  })

  it("getHighestSessionId() should return '42'", async () => {

    const testService: TestService = TestBed.get(TestService)
    const sessionService: SessionService = TestBed.get(SessionService)

    await testService.setUp()

    const result: number = await sessionService.getHighestSessionId(Samples.sampleUser.key)

    expect(result).toEqual(42)

    await testService.cleanUp()

  })

  it('should be created', () => {

    const service: SessionService = TestBed.get(SessionService)
    expect(service).toBeTruthy()

  })

})



