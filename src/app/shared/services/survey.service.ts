import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Session } from 'src/app/models/session';
import { Survey } from 'src/app/models/survey';
import { UserService } from 'src/app/shared/services/user.service';
import { Samples } from 'src/app/test/samples';

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

  private recentSessions: Session[] = [Samples.sampleSession1, Samples.sampleSession2, Samples.sampleSession3]

  public surveySubject: Subject<string> = new Subject<string>()

  public survey: Survey = new Survey()

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private userService: UserService,
    private angularFirestore: AngularFirestore

  ) {   


  }

  ///////////////
  // Functions //
  ///////////////

  /**
   * 
   * 
   * 
   */
  public startExperiment(): void {

    this.surveySubject.next('running')

  }

  public async storeSurvey(): Promise<string> {

    const userKey: string = await this.userService.getCurrentUserKey()

    await this.angularFirestore.doc(`users/${userKey}/surveys/survey_001`).set(this.survey.toObject())

    return new Promise<string>(resolve => resolve('surveyStored'))

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
