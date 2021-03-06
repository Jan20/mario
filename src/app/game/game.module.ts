import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameComponent } from './game-component/game.component';
import { LevelService } from '../shared/services/level.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../config/material.module';
import { SharedModule } from '../shared/shared.module';
import { TutorialComponent } from './tutorial-component/tutorial.component';
import { GameService } from './game.service';

@NgModule({
  declarations: [

    GameComponent,
    TutorialComponent,

  ],
  imports: [

    CommonModule,
    HttpClientModule,
    MaterialModule,
    SharedModule

  ],
  providers: [

    GameService,
    LevelService,

  ],
  exports: [

    GameComponent,
    MaterialModule,

  ]
})
export class GameModule { }
