import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './analytics-services/user.service'
import { SessionService } from './analytics-services/session.service';
import { AnalyticsService } from './analytics-services/analytics.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [


  ],

  providers: [

    UserService,
    SessionService,
    AnalyticsService,

  ]

})
export class AnalyticsModule { }
