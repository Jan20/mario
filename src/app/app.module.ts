import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ConfigModule } from './config/config.module';
import { MaterialModule } from './config/material.module';
import { GameModule } from './game/game.module';
import { SurveyModule } from './survey/survey.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedModule } from './shared/shared.module';

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
    GameModule,
    SurveyModule,
    SharedModule,

  ],
  providers: [
    
    AngularFirestore,
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
