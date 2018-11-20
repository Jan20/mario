import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './analytics-services/user.service'
import { SessionService } from './analytics-services/session.service';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  imports: [
    CommonModule
  ],
  
  declarations: [

    AnalyticsComponent

  ], 
 
  providers: [

    UserService,
    SessionService,

  ]

})
export class AnalyticsModule { }
