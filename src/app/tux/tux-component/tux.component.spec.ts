import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TuxComponent } from './tux.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialModule } from 'src/app/config/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LevelService } from '../../shared/services/level.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('TuxComponent', () => {
  let component: TuxComponent;
  let fixture: ComponentFixture<TuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        
        TuxComponent 
      
      ],
      imports: [ 
        
        MaterialModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        SharedModule,
        RouterModule,
        RouterTestingModule,
      
      ],
      providers: [
        
        HttpClient,
        LevelService,
        AngularFirestore,
        {provide: APP_BASE_HREF, useValue : '/' }

      ]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
