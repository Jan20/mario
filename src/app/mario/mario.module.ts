import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarioComponent } from './mario-component/mario.component';
import { LevelService } from './services/level.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../config/material.module';
import { AudioComponent } from './audio/audio.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [

    MarioComponent,
    AudioComponent,

  ],
  imports: [

    CommonModule,
    HttpClientModule,
    MaterialModule,
    SharedModule

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
