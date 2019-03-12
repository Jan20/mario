import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuxComponent } from './tux-component/tux.component';
import { LevelService } from '../shared/services/level.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../config/material.module';
import { AudioComponent } from './audio/audio.component';
import { SharedModule } from '../shared/shared.module';
import { TutorialComponent } from './tutorial-component/tutorial.component';

@NgModule({
  declarations: [

    TuxComponent,
    AudioComponent,
    TutorialComponent,

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

    TuxComponent,
    MaterialModule,
    AudioComponent,

  ]
})
export class TuxModule { }
