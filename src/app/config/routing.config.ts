import { Routes } from '@angular/router';
import { ColorComponent } from '../color/color/color.component';
import { MarioComponent } from '../mario/mario-component/mario.component';

export const ROUTES: Routes = [

  { path: '', component: MarioComponent },
  { path: 'color', component: ColorComponent },
  { path: 'mario', component: MarioComponent },
  
]

