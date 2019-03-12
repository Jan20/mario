import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ConfigModule } from './config/config.module';
import { MaterialModule } from './config/material.module';
import { TuxModule } from './tux/tux.module';
import { SurveyModule } from './survey/survey.module';
import { TestModule } from './test/test.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuModule } from './menu/menu.module'

@NgModule({
  
  declarations: [

    AppComponent,
    
  ], 
  imports: [
    
    BrowserModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ConfigModule,
    MenuModule,
    TuxModule,
    SurveyModule,
    TestModule

  ],
  providers: [
    
    AngularFirestore,
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
