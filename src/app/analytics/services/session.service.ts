import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { generateKey } from 'src/app/misc/helper';
import { UserService } from './user.service';
import { Session } from '../../models/session';
import { Performance } from '../../models/performance';
import { SessionInterface } from 'src/app/interfaces/session.interface';
import { CloudService } from 'src/app/cloud/cloud.service';
import { debug } from 'util';
import { PerformanceInterface } from 'src/app/interfaces/performance.interface';
import { Level } from 'src/app/models/level';
import { Subject } from 'rxjs';

@Injectable({

  providedIn: 'root'

})
export class SessionService {

  ///////////////
  // Variabels //
  ///////////////

  // Holds a Session object.
  private session: Session

  // Holds a Level object
  private level: Level

  private consecutiveSessions: string[] = []

  public sessionSubject: Subject<string> = new Subject<string>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private cloudService: CloudService,

  ) {}

  ///////////////
  // Functions //
  ///////////////
  /**
   * 
   * Retrieves the keys of all sessions stored
   * for a given user.
   * 
   */
  public async getSessionKeys(userKey: string): Promise<string[]> {

    // Defines a string array intended to stored all session keys.
    let sessionKeys: string[] = []

    // Retrieves all sessions for a given user from Firestore.
    await this.angularFirestore.collection(`users/${userKey}/sessions`).get().toPromise().then(sessions => {

      // Pushes all session keys to the sessionKey array.
      sessions.forEach(session => sessionKeys.push(session.data().key))

    })

    // Returns a promise referring to the session keys arrays
    return new Promise<string[]>(resolve => resolve(sessionKeys))
    
  }

  /**
   * 
   * Genereates a new session object.
   * 
   */
  public async generateSession(): Promise<Session> {

    // Gets the current user's Id.
    const userKey: string = await this.userService.getCurrentUserKey()

    // Gets the highest session Id for the given user and increases the number by one.
    const id: number = await this.getHighestSessionId(userKey) + 1

    // Creates a session key for the current session based on the previously defined id.
    const key: string = generateKey('session', id)

    // Creates a new Performance object which values are initialized with zeros.
    const performance: Performance = new Performance(0, 0, 0, 0)

    // Initializes a new session object.
    const session: Session = new Session(key, id, 'created', performance)

    // Returns a promise referring to the freshly created session.
    return new Promise<Session>(resolve => resolve(session))

  }

  /**
   * 
   * Returns the highest sessionId associated with the current user
   * by iterating over all previous sessions and selecting the one
   * with the highest Id.
   * 
   */
  private async getHighestSessionId(userKey: string): Promise<number> {
    
    // Variable intended to store the highest session id.
    let highestSessionId: number = 0

    // Retrieves all sessions for the given user.
    await this.angularFirestore.collection(`users/${userKey}/sessions`).get().toPromise().then(sessions => {
      
      // Itereates over all sessions
      sessions.docs.forEach(session => {
        
        // Compares whether the id of the current session is higher than previously
        // stored highest session id. When this is the session id stored within the
        // 'highestSessionId" variable is replaced by the id of the current session.
        session.data()['id'] > highestSessionId ? highestSessionId = session.data()['id'] : null
      
      })

    })

    // Returns a promise referring to highestSessionId's value.
    return new Promise<number>(resolve => resolve(highestSessionId))

  }

  /**
   * 
   * Stores the current session persistently and calls
   * the project's backend in order to present the user
   * a level with a 
   * 
   */
  public async storeSession(): Promise<void> {

    // Gets the userId of the current user Id from UserService
    const userKey: string = await this.userService.getCurrentUserKey()

    // Firestore document references.
    const ref: string = `users/${userKey}/sessions/${this.session.key}`

    // Retrieves the level of the current session.
    const level: Level = this.getLevel()

    // Stores the current session at Firestore.
    await this.angularFirestore.doc(ref).set({key: this.session.key, id: this.session.id, status: 'finished'})
    await this.angularFirestore.doc(ref+`/data/performance`).set(this.session.performance.toInterface())
    await this.angularFirestore.doc(ref+`/data/level`).set(level.toInterface())

    // Calls the backend in order to 
    await this.cloudService.evolveLevel(userKey)

    this.sessionSubject.next('stored')

  }
  
  /**
   * 
   * 
   * @param userKey 
   * @param sessionKey 
   */
  public async getSession(userKey: string, sessionKey: string): Promise<Session> {

    //
    //
    //
    let session: Session
    let performance: Performance

    //
    //
    //
    const performanceReference: string = `users/${userKey}/sessions/${sessionKey}/data/performance`

    await this.angularFirestore.doc(performanceReference).get().toPromise().then(performanceInterface => {
      
      if (performanceInterface.data() != undefined) {

        performance = new Performance(
     
          performanceInterface.data()['defeated_by_gaps'],
          performanceInterface.data()['defeated_by_opponent_type_1'],
          performanceInterface.data()['defeated_by_opponent_type_2'],
          performanceInterface.data()['defeated_by_opponent_type_3']    
  
        )

      } else {

        performance = new Performance(0, 0, 0, 0)
      
      }
      
    })

    //
    //
    //
    const sessionReference = `users/${userKey}/sessions/${sessionKey}`

    //
    //
    //
    await this.angularFirestore.doc(sessionReference).get().toPromise().then(sessionInterface => {

      session = new Session(
        
        sessionInterface.data()['key'],
        sessionInterface.data()['id'],
        sessionInterface.data()['status'],
        performance

      )

    })

    return new Promise<Session>(resolve => resolve(session))

  }

  /**
   * 
   * 
   * 
   */
  public async deleteSession(userKey: string, sessionKey: string): Promise<void> {

    await this.angularFirestore.doc(`users/${userKey}/sessions/${sessionKey}`).delete()

  }

    
  /////////////
  // Getters //
  /////////////
  /**
   * 
   * Returns the session's level.
   * 
   */
  public getLevel(): Level {

    return this.level

  }

  /////////////
  // Setters //
  /////////////
  /**
   * 
   * Sets a 
   * 
   * @param session: A new object of class Session
   * 
   */
  public setSession(session: Session): void { 
    
    this.session = session 
  
  }


  public setLevel(level: Level): void {

    this.level = level

  }


  //////////////////////
  // Helper Functions //
  //////////////////////
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