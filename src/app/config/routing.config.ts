import { Routes } from '@angular/router';
import { MarioComponent } from '../mario/mario-component/mario.component'
import { IntroductionComponent } from '../survey/introduction/introduction.component';
import { Part1Component } from '../survey/part1/part1.component';
import { Part2Component } from '../survey/part2/part2.component';
import { Part3Component } from '../survey/part3/part3.component';
import { Part4Component } from '../survey/part4/part4.component';
import { ControlsComponent } from '../survey/controls/controls.component';
import { DescriptionComponent } from '../survey/description/description.component';

export const ROUTES: Routes = [

  { path: '', component: IntroductionComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'controls', component: ControlsComponent },
  { path: 'game', component: MarioComponent },
  { path: 'survey/part_1', component: Part1Component },
  { path: 'survey/part_2', component: Part2Component },
  { path: 'survey/part_3', component: Part3Component },
  { path: 'survey/part_4', component: Part4Component },
  
]

