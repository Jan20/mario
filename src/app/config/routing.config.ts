import { Routes } from '@angular/router';
import { IntroductionComponent } from '../survey/introduction/introduction.component';
import { ControlsComponent } from '../survey/controls/controls.component';
import { TuxComponent } from '../tux/tux-component/tux.component'
import { DescriptionComponent } from '../survey/description/description.component';
import { TutorialComponent } from '../tux/tutorial-component/tutorial.component';
import { Part1Component } from '../survey/part1/part1.component';
import { Part2Component } from '../survey/part2/part2.component';
import { Part3Component } from '../survey/part3/part3.component';
import { Part4Component } from '../survey/part4/part4.component';
import { Part5Component } from '../survey/part5/part5.component';
import { Part6Component } from '../survey/part6/part6.component';
import { Part7Component } from '../survey/part7/part7.component';
import { Part8Component } from '../survey/part8/part8.component';
import { Part9Component } from '../survey/part9/part9.component';
import { Part10Component } from '../survey/part10/part10.component';
import { Part11Component } from '../survey/part11/part11.component';
import { Part12Component } from '../survey/part12/part12.component';

export const ROUTES: Routes = [

  { path: '', component: IntroductionComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'controls', component: ControlsComponent },
  { path: 'game', component: TuxComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'survey/part_1', component: Part1Component },
  { path: 'survey/part_2', component: Part2Component },
  { path: 'survey/part_3', component: Part3Component },
  { path: 'survey/part_4', component: Part7Component },
  { path: 'survey/part_5', component: Part8Component },
  { path: 'survey/part_6', component: Part9Component },
  { path: 'survey/part_7', component: Part10Component },
  { path: 'survey/part_8', component: Part11Component },
  { path: 'survey/part_9', component: Part12Component },
  
]

