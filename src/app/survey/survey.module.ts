import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MarioModule } from '../mario/mario.module'
import { SurveyService } from './services/survey.service'
import { MaterialModule } from '../config/material.module';
import { IntroductionComponent } from './introduction/introduction.component';
import { Part1Component } from './part1/part1.component'
import { Part2Component } from './part2/part2.component'
import { Part3Component } from './part3/part3.component'
import { Part4Component } from './part4/part4.component';
import { ControlsComponent } from './controls/controls.component';
import { DescriptionComponent } from './description/description.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [

    CommonModule,
    MarioModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

  ],
  declarations: [
    
    IntroductionComponent,
    DescriptionComponent,
    ControlsComponent,
    Part1Component,
    Part2Component,
    Part3Component,
    Part4Component,
    
  ],
  providers: [

    SurveyService
    
  ],
  exports: [

    MaterialModule

  ]
})
export class SurveyModule { }
