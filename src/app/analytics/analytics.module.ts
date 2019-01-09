import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from './services/user.service'
import { SessionService } from './services/session.service'
import { AnalyticsComponent } from './analytics-component/analytics.component'
import { AngularFirestore } from '@angular/fire/firestore'

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
    AngularFirestore,

  ]

})
export class AnalyticsModule { }
