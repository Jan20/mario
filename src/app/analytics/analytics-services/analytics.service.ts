import { Injectable } from '@angular/core';
import { UserService } from './user.service'
import { SessionService } from './session.service'

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  ///////////////
  // Variables //
  ///////////////
  private totalDeaths: number

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private sessionService: SessionService

  ) { 

    this.totalDeaths = 0

  }

  ///////////////
  // Functions //
  ///////////////
  public storeAnalytics() {

    this.sessionService.getSession().setTotalDeaths(this.totalDeaths)
    this.sessionService.storeGameplayData()
  }

  /////////////
  // Getters //
  /////////////
  public getTotalDeaths(): number {

    return this.totalDeaths

  }

  /////////////
  // Setters //
  /////////////
  public setTotalDeaths(totalDeaths: number): void {

    this.totalDeaths = totalDeaths

  }

}
