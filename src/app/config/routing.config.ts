import { Routes } from '@angular/router';
import { SurveyComponent } from '../survey/survey/survey.component';
import { MarioComponent } from '../mario/mario-component/mario.component'
import { IntroductionComponent } from '../survey/introduction/introduction.component';

export const ROUTES: Routes = [

  { path: '', component: IntroductionComponent },
  { path: 'game', component: MarioComponent },
  { path: 'survey', component: SurveyComponent },
  
]

