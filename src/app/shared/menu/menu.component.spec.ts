// Custom Components
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Routing
import { RouterModule, Routes } from '@angular/router';

// Services

// Custom Components
import { MenuComponent } from './menu.component';
import { MaterialModule } from 'src/app/config/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        
        MenuComponent,

      ], 
      imports: [ 
        
        MaterialModule, 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        
      ], 
      providers: [

        AngularFirestore,
        {provide: APP_BASE_HREF, useValue : '/' }

      ]
      })
    .compileComponents();
  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
