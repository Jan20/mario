import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarioComponent } from './mario-component/mario.component';
import { World } from './mario-game/world/world.component';
import { LevelService } from './mario-services/level.service';
import { MarioService } from './mario-services/mario.service';

@NgModule({
  imports: [

    CommonModule
  
  ],
  declarations: [

    MarioComponent,
    World

  ],
  providers: [

    MarioService,
    LevelService,

  ],
  exports: [

    MarioComponent

  ]
})
export class MarioModule { }
