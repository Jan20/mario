import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { RouterModule } from '@angular/router';
import { SurveyModule } from './survey/survey.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [

        MenuModule,
        RouterModule,
        SurveyModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)

      ],
      providers: [
        
        AngularFirestore
      
      ]  
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
 

});
