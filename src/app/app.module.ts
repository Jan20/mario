import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ConfigModule } from './config/config.module';
import { MaterialModule } from './config/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from './menu/menu.module'
import { MarioModule } from './mario/mario.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { SurveyModule } from './survey/survey.module'
import { EvolutionModule } from './evolution/evolution.module'

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
    MarioModule,
    AnalyticsModule,
    SurveyModule,
    EvolutionModule

  ], providers: [
    
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
