import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ColorComponent } from './color/color.component';
import { ConfigModule } from './config/config.module';
import { MaterialModule } from './config/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarioComponent } from './mario/mario.component';

@NgModule({
  declarations: [

    AppComponent,
    ColorComponent,
    MarioComponent
    
  ],
  imports: [
    
    BrowserModule,
    ConfigModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ], providers: [
    
    {provide: APP_BASE_HREF, useValue : '/' }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
