import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ConfigModule } from './config/config.module';
import { MaterialModule } from './config/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarioComponent } from './mario/mario.component';
import { ColorModule } from './color/color.module'

@NgModule({
  declarations: [

    AppComponent,
    MarioComponent
    
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

  ], providers: [
    
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
