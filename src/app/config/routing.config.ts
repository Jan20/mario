import { Routes } from '@angular/router';
import { ColorComponent } from '../color/color/color.component';
import { SurveyComponent } from '../survey/survey/survey.component';

export const ROUTES: Routes = [

  { path: '', component: SurveyComponent },
  { path: 'color', component: ColorComponent },
  { path: 'survey', component: SurveyComponent },
  
]

