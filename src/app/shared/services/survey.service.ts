import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Survey } from 'src/app/models/survey';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  
  ///////////////
  // Variables //
  ///////////////

  // Initializes the survey with an empty survey object.
  public survey: Survey = new Survey()

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private userService: UserService,
    private angularFirestore: AngularFirestore

  ) {}

  ///////////////
  // Functions //
  ///////////////

  /**
   * 
   * Stores a survey persistently at Firestore.
   * 
   */
  public async storeSurvey(): Promise<boolean> {

    // Gets the key of the current user.
    const userKey: string = await this.userService.getCurrentUserKey()

    // Converts the survey variable to a JSON like object and stores it
    // at Firestore.
    await this.angularFirestore.doc(`users/${userKey}/surveys/survey`).set(this.survey.toObject())

    // Deletes the user key from the user's browser after the survey
    // has been stored persistendly.
    localStorage.removeItem('user_key')

    // Returns true after the survey has been sotred at Firebase.
    return new Promise<boolean>(resolve => resolve(true))

  }

}
