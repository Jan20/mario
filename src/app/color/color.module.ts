import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color/color.component';
import { ColorService } from './color-service/color.service';
import { MaterialModule } from '../config/material.module';

@NgModule({
  imports: [
  
    CommonModule,
    MaterialModule,
  ],
  providers: [

    ColorService

  ],
  declarations: [
    
    ColorComponent
  
  ]
})
export class ColorModule { }
