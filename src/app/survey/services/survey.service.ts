import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/analytics/services/session.service';
import { Session } from 'src/app/models/session';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  
  ///////////////
  // Variables //
  ///////////////

  // Boolean variable indicating whether a user has already
  // finished a survey or not.
  public surveyCompleted: boolean = false

  private recentSessions: Session[]

  public surveySubject: Subject<string> = new Subject<string>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(


  ) {   


  }

  ///////////////
  // Functions //
  ///////////////
  public startExperiment() {

    this.surveySubject.next('running')

  }

  /////////////
  // Getters //
  /////////////
  public getRecentSessions(): Session[] {

    return this.recentSessions

  }

  /////////////
  // Setters //
  /////////////
  public setRecentSessions(recentSessions: Session[]): void {

    this.recentSessions = recentSessions

  }

}
