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
import { MenuModule } from './menu/menu.module';
import { SurveyModule } from './survey/survey.module';

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

  ], 
  providers: [
    
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
