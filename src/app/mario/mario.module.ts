import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarioComponent } from './mario-component/mario.component'
import { MarioService } from './mario-services/mario.service'
import { LevelService } from './mario-services/level.service';
import { World } from './mario-game/world/world.component';

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
