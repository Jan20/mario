import { Routes } from '@angular/router';
import { ColorComponent } from './../color/color/color.component';
import { AppComponent } from '../app.component';

// Routing
export const ROUTES: Routes = [

  { path: '', component: AppComponent },
  { path: 'color', component: ColorComponent },
  
]