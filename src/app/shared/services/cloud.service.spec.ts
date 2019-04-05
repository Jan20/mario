import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { CloudService } from './cloud.service';

describe('CloudService', () => {
  beforeEach(() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

    TestBed.configureTestingModule({

    imports:[

      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)

    ],
    providers: [
      
      CloudService,
      HttpClient,
      AngularFirestore,

    ]
    })
  }) 
  
  it('should be created', () => {

    const service: CloudService = TestBed.get(CloudService);
    expect(service).toBeTruthy();
  
  });

  // it('normalizeUser() should return "Performance of user user_042 has been normalized."', async () => {

  //   const testService: TestService = TestBed.get(TestService);
  //   const cloudService: CloudService = TestBed.get(CloudService);

  //   const result: string = await cloudService.normalizeUserData('user_042')
  //   const expectedResult: string = 'Performance of user user_042 has been normalized.'

  //   expect(result).toEqual(expectedResult)

  //   await testService.cleanUp()
 
  // })

  // it('createClusters() should return "Clusters have been created."', async () => {

  //   const testService: TestService = TestBed.get(TestService);
  //   const cloudService: CloudService = TestBed.get(CloudService);

  //   await testService.setUp()
  //   await cloudService.normalizeUserData('user_042')
    
  //   const result: string = await cloudService.createClusters()
  //   const expectedResult: string = 'Clusters have been created.'

  //   expect(result).toEqual(expectedResult)

  //   await testService.cleanUp()
 
  // })


 
})
