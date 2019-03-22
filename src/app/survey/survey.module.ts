import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GameModule } from '../game/game.module'
import { SurveyService } from '../shared/services/survey.service'
import { MaterialModule } from '../config/material.module';
import { IntroductionComponent } from './introduction/introduction.component';
import { Part1Component } from './part1/part1.component'
import { Part2Component } from './part2/part2.component'
import { Part3Component } from './part3/part3.component'
import { Part4Component } from './part4/part4.component';
import { Part5Component } from './part5/part5.component';
import { Part6Component } from './part6/part6.component';
import { ControlsComponent } from './controls/controls.component';
import { DescriptionComponent } from './description/description.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Part7Component } from './part7/part7.component';
import { Part8Component } from './part8/part8.component';
import { Part9Component } from './part9/part9.component';

@NgModule({
  imports: [

    CommonModule,
    GameModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    
    IntroductionComponent,
    DescriptionComponent,
    ControlsComponent,
    Part1Component,
    Part2Component,
    Part3Component,
    Part4Component,
    Part5Component,
    Part6Component,
    Part7Component,
    Part8Component,
    Part9Component,
    
  ],
  providers: [

    SurveyService
    
  ],
  exports: [

    MaterialModule

  ]
})
export class SurveyModule { }
