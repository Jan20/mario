import { TestBed } from '@angular/core/testing'
import { UserService } from './user.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment'
import { TestService } from 'src/app/test/services/test.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [

        AngularFireModule.initializeApp(environment.firebaseConfig),

      ],
      providers: [

        TestService,
        UserService,
        AngularFirestore,
        HttpClient,
        HttpHandler,
        
      ]
  
  
    })
  
  })


  it('should be created', () => {

    const service: UserService = TestBed.get(UserService)
    expect(service).toBeTruthy()
  
  })


  it("getUserKeys() should return ['user_042']", async () => {
    
    const testService: TestService = TestBed.get(TestService)
    const userService: UserService = TestBed.get(UserService)

    await testService.setUp()

    const result: string[] = await userService.getUserKeys()

    const expectedResult: string[] = ['user_042']

    expect(result).toEqual(expectedResult)

    await testService.cleanUp()

  })


  it("getUserKeys() should return ['user_042']", async () => {
    
    const testService: TestService = TestBed.get(TestService)
    const userService: UserService = TestBed.get(UserService)

    await testService.setUp()

    const result: string[] = await userService.getUserKeys()

    const expectedResult: string[] = ['user_042']

    expect(result).toEqual(expectedResult)

    await testService.cleanUp()

  })

})