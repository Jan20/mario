import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ConfigModule } from './config/config.module';
import { MaterialModule } from './config/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorModule } from './color/color.module'
import { MenuModule } from './menu/menu.module'
import { UserModule } from './user/user.module'
import { MarioModule } from './mario/mario.module'
import { AnalyticsModule } from './analytics/analytics.module'

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
    ColorModule,
    UserModule,
    MenuModule,
    MarioModule,
    AnalyticsModule

  ], providers: [
    
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
