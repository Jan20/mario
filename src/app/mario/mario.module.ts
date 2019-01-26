import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarioComponent } from './mario-component/mario.component';
import { LevelService } from './services/level.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../config/material.module';

@NgModule({
  declarations: [

    MarioComponent,

  ],
  imports: [

    CommonModule,
    HttpClientModule,
    MaterialModule
  
  ],
  providers: [

    LevelService,

  ],
  exports: [

    MarioComponent,
    MaterialModule


  ]
})
export class MarioModule { }
