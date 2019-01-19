import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarioComponent } from './mario-component/mario.component';
import { LevelService } from './services/level.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [

    MarioComponent,

  ],
  imports: [

    CommonModule,
    HttpClientModule
  
  ],
  providers: [

    LevelService,

  ],
  exports: [

    MarioComponent

  ]
})
export class MarioModule { }
