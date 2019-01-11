import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarioComponent } from './mario-component/mario.component';
import { World } from './mario-game/world/world.component';
import { LevelService } from './services/level.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [

    MarioComponent,
    World

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
