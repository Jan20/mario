import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { TestService } from 'src/app/test/services/test.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    
    imports: [

      AngularFireModule.initializeApp(environment.firebaseConfig),

    ],
    providers: [

      AngularFirestore,      
      HttpClient,
      HttpHandler,
    
    ],

  }));

  it('should be created', () => {
  
    const service: TestService = TestBed.get(TestService);
    expect(service).toBeTruthy();
  
  });
});
