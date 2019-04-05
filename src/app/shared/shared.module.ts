import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../config/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    
    SpinnerComponent,
    MenuComponent,

  ],
  imports: [
    
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule, 
    
  ],
  exports: [

    SpinnerComponent,
    MenuComponent,

  ]
})
export class SharedModule { }
