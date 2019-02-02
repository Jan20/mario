import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppComponent } from './app.component';
import { ConfigModule } from './config/config.module';
import { MaterialModule } from './config/material.module';
import { MarioModule } from './mario/mario.module';
import { SurveyModule } from './survey/survey.module';
import { TestModule } from './test/test.module';
import { CloudModule } from './cloud/cloud.module';
import { AngularFirestore } from '@angular/fire/firestore';

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
    MarioModule,
    AnalyticsModule,
    SurveyModule,
    CloudModule,
    TestModule

  ],
  providers: [
    
    AngularFirestore,
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
