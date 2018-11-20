import { Routes } from '@angular/router';
import { SurveyComponent } from '../survey/survey/survey.component';
import { AnalyticsComponent } from '../analytics/analytics/analytics.component'
import { EvolutionComponent } from '../evolution/evolution/evolution.component'

export const ROUTES: Routes = [

  // { path: '', component: AnalyticsComponent },
  { path: '', component: SurveyComponent },
  { path: 'evolution', component: EvolutionComponent },
  { path: 'survey', component: SurveyComponent },
  
]

