import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../config/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from './../config/routing.config';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu-service/menu.service';

@NgModule({
  imports: [
    
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { enableTracing: false }),
  
  ],declarations: [
  
    MenuComponent,
  
  ], providers: [
  
    MenuService
  
  ], exports: [
  
    MenuComponent,
    RouterModule,
  
  ]
})
export class MenuModule { }
