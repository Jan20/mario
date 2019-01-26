import { TestBed } from '@angular/core/testing';
import { SurveyService } from './survey.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports: [

      AngularFireModule.initializeApp(environment.firebaseConfig),
      HttpClientModule,
      AngularFirestoreModule.enablePersistence(),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)

    ],
    providers: [

      AngularFirestore,
      HttpClient,
      HttpHandler,

    ]

  }));

  it('should be created', () => {
    const service: SurveyService = TestBed.get(SurveyService);
    expect(service).toBeTruthy();
  });
});
