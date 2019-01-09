import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { generateKey } from 'src/app/misc/helper';
import { UserInterface } from '../../interfaces/user.interface';
import { UserService } from './user.service';
import { Session } from '../../models/session';
import { Performance } from '../../models/performance';
import { User } from 'src/app/models/user';

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

    //
    // Gets the highest previous session ID and increases the number by one.
    //
    const id: number = await this.getHighestSessionId() + 1

    //
    // Writes the current session key to the session object that is going
    // to be stored at Firestore.
    //
    const key: string = generateKey('session', id)

    //
    //
    //
    const performance: Performance = new Performance(0, 0, 0, 0)

    //
    // Initializes a new empty session.
    //
    this.session = new Session(key, id, performance)

  }

  /**
   * 
   * Returns the highest sessionId associated with the current user
   * by iterating over all previous sessions and selecting the one
   * with the highest Id.
   * 
   */
  private async getHighestSessionId(): Promise<number> {

    //
    // Gets the current user's ID.
    //
    const userKey: string = await this.userService.getCurrentUserKey()
    
    //
    // Stores the temporarily highest session id.
    //
    let highestSessionId: number = 0

    //
    // Accesses a Firestore database
    //
    await this.angularFirestore.collection<Session[]>(`users/${userKey}/sessions`).get().toPromise().then(sessions => {
      
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
  public async storePerformance(): Promise<void> {

    //
    // Gets the userId of the current user Id from UserService
    //
    const userKey: string = await this.userService.getCurrentUserKey()

    //
    // Creates a new session at firestore database.
    // this.angularFirestore.doc(`users/${user.key}/sessions/${this.session.key}`).set({id: this.session.id})
    // this.angularFirestore.doc(`users/${user.key}/sessions/${this.session.key}/data/performance`).set(this.session.performance)
    //
    this.angularFirestore.doc(`users/${userKey}/sessions/${this.session.key}`).set(this.session.toInterface())

  }

  /**
   * 
   * 
   * 
   */
  public increaseDefeatedByGaps(): void {

    this.session.performance.defeatedByGaps += 1

  }

  /**
   * 
   * 
   * 
   */
  public increaseDefeatedByOpponentType1(): void {

    this.session.performance.defeatedByOpponentType1 += 1

  }

  /**
   * 
   * 
   * 
   */
  public increaseDefeatedByOpponentType2(): void {

    this.session.performance.defeatedByOpponentType2 += 1

  }

  /**
   * 
   * 
   * 
   */
  public increaseDefeatedByOpponentType3(): void {

    this.session.performance.defeatedByOpponentType3 += 1

  }


}