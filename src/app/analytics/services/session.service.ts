import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { generateKey } from 'src/app/misc/helper';
import { UserService } from './user.service';
import { Session } from '../../models/session';
import { Performance } from '../../models/performance';
import { SessionInterface } from 'src/app/interfaces/session.interface';
import { Level } from 'src/app/models/level';
import { LevelInterface } from 'src/app/interfaces/level.interface';

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
  public async getSessionKeys(userKey: string): Promise<string[]> {

    let sessionKeys: string[] = []

    await this.angularFirestore.collection<Session[]>(`users/${userKey}/sessions`).get().toPromise().then(sessions => {

      sessions.forEach(session => sessionKeys.push(session.data().key))

    })

    return new Promise<string[]>(resolve => resolve(sessionKeys))
    
  }

  /**
   * 
   * 
   */
  public async generateSession(): Promise<string> {

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
    const status: string = 'created'

    //
    //
    //
    const performance: Performance = new Performance(0, 0, 0, 0)

    //
    // Initializes a new empty session.
    //
    this.session = new Session(key, id, status, performance)

    //
    // Returns the freshly created session key. 
    // 
    return new Promise<string>(resolve => resolve(key))

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
  public async storeSession(): Promise<void> {

    //
    // Gets the userId of the current user Id from UserService
    //
    const userKey: string = await this.userService.getCurrentUserKey()

    //
    //
    //
    this.angularFirestore.doc(`users/${userKey}/sessions/${this.session.key}`).set({

      key: this.session.key,
      id: this.session.id

    })

    //
    //
    //
    const ref: string = `users/${userKey}/sessions/${this.session.key}/data/performance`

    //
    // Creates a new session at firestore database.
    // this.angularFirestore.doc(`users/${user.key}/sessions/${this.session.key}`).set({id: this.session.id})
    // this.angularFirestore.doc(`users/${user.key}/sessions/${this.session.key}/data/performance`).set(this.session.performance)
    //
    this.angularFirestore.doc(ref).set(this.session.performance.toInterface())

  }
  
  /**
   * 
   * 
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

    //
    //
    //
    this.angularFirestore.doc<SessionInterface>(`users/${userKey}/sessions/${sessionKey}`).get().toPromise().then(sessionInterface => {

      session = new Session(
        
        sessionInterface.data().key,
        sessionInterface.data().id,
        sessionInterface.data().status,
        sessionInterface.data().performance,
        
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

    this.angularFirestore.doc(`users/${userKey}/sessions/${sessionKey}`).delete()

  }

  // public async getLevel(userKey: string, sessionKey: string): Promise<Level> {

  //   //
  //   //
  //   //
  //   let level: Level

  //   const ref: string = `users/${userKey}/sessions/${sessionKey}/data/level`

  //   this.angularFirestore.doc<LevelInterface>(ref).get().toPromise().then(levelInterface => {

  //     const representation: string[][] = []

  //     representation.push(
        
  //       levelInterface.data().line_00,
  //       levelInterface.data().line_01,
  //       levelInterface.data().line_02,
  //       levelInterface.data().line_03,
  //       levelInterface.data().line_04,
  //       levelInterface.data().line_05,
  //       levelInterface.data().line_06,
  //       levelInterface.data().line_07,
  //       levelInterface.data().line_08,
  //       levelInterface.data().line_09,
  //       levelInterface.data().line_10,
  //       levelInterface.data().line_11,
  //       levelInterface.data().line_12,
  //       levelInterface.data().line_13,
  //       levelInterface.data().line_14
      
  //     )

  //     level = new Level(levelInterface.data().key, levelInterface.data().id, representation)

  //   })

  //   return new Promise<Level>(resolve => resolve(level))

  // }

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