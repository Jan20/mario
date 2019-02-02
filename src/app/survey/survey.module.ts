import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SurveyComponent } from './survey/survey.component'
import { MarioModule } from '../mario/mario.module'
import { SurveyService } from '../survey/survey-services/survey.service'
import { MaterialModule } from '../config/material.module';
import { IntroductionComponent } from './introduction/introduction.component'

@NgModule({
  imports: [

    CommonModule,
    MarioModule,
    MaterialModule,
  
  ],
  declarations: [
    
    SurveyComponent,
    IntroductionComponent,
  
  ],
  providers: [

    SurveyService,

  ],
  exports: [

    MaterialModule

  ]
})
export class SurveyModule { }
