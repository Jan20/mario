import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { generateKey } from 'src/app/misc/helper';
import { Session } from '../interfaces/session';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({

  providedIn: 'root'

})
export class SessionService {

  ///////////////
  // Variabels //
  ///////////////
  /**
   * 
   * Refers to an object of class Session
   * 
   */
  public session: Session

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,

  ) {}

  ///////////////
  // Functions //
  ///////////////
  /**
   * 
   * 
   * 
   */
  public async generateSession(): Promise<void> {

    // Initializes a new empty session.
    this.session = {}

    // Gets the highest previous session ID and increases the number by one.
    this.session.id = await this.getHighestSessionId() + 1

    // Writes the current session key to the session object that is going
    // to be stored at Firestore.
    this.session.key = generateKey('session', this.session.id)

    this.session.performance = {

      defeated_by_gaps: 0,
      defeated_by_opponent_type_1: 0,
      defeated_by_opponent_type_2: 0,
      defeated_by_opponent_type_3: 0

    }
   
  }

  /**
   * 
   * Returns the highest sessionId associated with the current user
   * by iterating over all previous sessions and selecting the one
   * with the highest Id.
   * 
   */
  private async getHighestSessionId(): Promise<number> {

    // Gets the current user's ID.
    const user: User = await this.userService.getCurrentUser()
    
    // Stores the temporarily highest session id.
    let highestSessionId: number = 0

    // Accesses a Firestore database
    await this.angularFirestore.collection<Session[]>(`users/${user.key}/sessions`).get().toPromise().then(sessions => {
      
      // Itereates through all sessions and compares whether the session's id
      // is heighter than the current highestSessionId. If this is the case,
      // the value of highestSessionId is replaced by the session's id.
      sessions.docs.forEach(session => session.data().id > highestSessionId ? highestSessionId = session.data().id : null)

    })

    // Returns a promise referring to highestSessionId's value.
    return new Promise<number>(resolve => resolve(highestSessionId))

  }

  /**
   * 
   * Stores the current session at Firestore.
   * 
   */
  public async storePerformance(): Promise<any> {

    console.log('---------------------------------------------------')
    console.log('storePerformance has been called')
    console.log('---------------------------------------------------')
    console.log(this.session.performance)
    // Gets the userId of the current user Id from UserService
    const user: User = await this.userService.getCurrentUser()

    // Creates a new session at firestore database.
    this.angularFirestore.doc(`users/${user.key}/sessions/${this.session.key}`).set({id: this.session.id})
    this.angularFirestore.doc(`users/${user.key}/sessions/${this.session.key}/data/performance`).set(this.session.performance)

  }

}