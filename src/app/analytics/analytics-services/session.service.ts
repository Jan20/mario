import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from './user.service'
import { Session } from '../analytics-models/session';
import { GameplayData } from '../analytics-models/gameplayData';
import { resolve } from 'q';

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
  private session: Session

  /**
   * 
   * Refers to the sessionID string that is used as key value
   * in a firestore database
   * 
   */ 
  private sessionId: string

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,

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
  public async createSessionId(): Promise<void> {

    // Gets the highest previous session ID and increases the number by one
    const highestSessionId: number = await this.getHighestSessionId() + 1

    // Since session IDs are stored as strings rather than numbers, a 
    let sessionId: string
  
    // Adds zero, one or two zeros in front of the session id in order to insure
    // a proper ordering of session in the database.
    if (highestSessionId < 10)                          sessionId = 'session00' + highestSessionId
    if (highestSessionId > 9 && highestSessionId < 100) sessionId = 'session0' + highestSessionId
    if (highestSessionId > 99)                          sessionId = 'session' + highestSessionId
    
    this.session.setSessionId(highestSessionId)
  
    // Writes the new session Id to the local sessionId variable.
    this.setSessionId(sessionId)

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
    const userId: string = await this.userService.getCurrentUserId()
    
    // Stores the temporarily highest session id.
    let highestSessionId: number = 0

    await this.angularFirestore.collection<any>(`users/${userId}/sessions`).get().toPromise().then(async sessions => {
      
      // Itereates through all sessions and compares whether the session's id
      // is heighter than the current highestSessionId. If this is the case,
      // the value of highestSessionId is replaced by the session's id.
      await sessions.docs.forEach(session => (parseInt(session.data().id) > highestSessionId ? highestSessionId = parseInt(session.data().id) : null))

    })

    // Returns a promise referring to highestSessionId's value.
    return new Promise<number>(resolve => resolve(highestSessionId))

  }

  /**
   * 
   * Stores the current session at Firestore.
   * 
   */
  public async storeGameplayData(): Promise<any> {

    // Gets the userId of the current user Id from UserService
    const userId: string = await this.userService.getCurrentUserId()
    console.log(userId)
    // Creates a new session at firestore database.

    this.angularFirestore.collection(`users/${userId}/sessions`).doc(this.sessionId).set({ 
      
      id: this.session.getSessionId(),
      questionnaireFinished: false,

    })

    this.angularFirestore.doc(`users/${userId}/sessions/${this.sessionId}/data/gameplayData`).set({ 
      
      totalDeaths: this.session.getGameplayData().getTotalDeaths(),
      deathsThroughGaps : this.session.getGameplayData().getDeathsThroughGaps(),
      deathsThroughOpponents : this.session.getGameplayData().getDeathsThroughOpponents(),      

    })

  }

  public async getAllGameplayDataFromUser(userKey: string): Promise<GameplayData[]> {

    let gameplayDatapoints: GameplayData[] = []
    const sessions: Session[] = await this.getSessions(userKey)  

    sessions.forEach(async session => {

      gameplayDatapoints.push(await this.getGameplayData(userKey, session.getSessionKey()))

    })

    return new Promise<GameplayData[]>(resolve => resolve(gameplayDatapoints))

  }

  /**
   * 
   * 
   * 
   * @param userId 
   * @param sessionKey 
   */
  public async getGameplayData(userKey: string, sessionKey: string): Promise<GameplayData> {

    let gameplayData: GameplayData

    // Creates a new session at firestore database.
    await this.angularFirestore.doc<any>(`users/${userKey}/sessions/${sessionKey}/data/gameplayData`).get().toPromise().then(gameplay => {
      
      gameplayData = new GameplayData(
        
        gameplay.data().totalDeaths,
        gameplay.data().deathsThroughOpponents,
        gameplay.data().deathsThroughGaps  
        
      )

    })

    return new Promise<GameplayData>(resolve => resolve(gameplayData))

  }


  public async getSessions(userKey: string): Promise<Session[]> {

    let sessions: Session[] = []

    await this.angularFirestore.collection(`users/${userKey}/sessions`).get().toPromise().then(sessionData => {

      sessionData.forEach(session => {

        sessions.push(new Session(session.data().id))

      })

    })

    return new Promise<Session[]>(resolve => resolve(sessions))

  }

  /////////////
  // Getters //
  /////////////
  public getSession(): Session {

    return this.session

  }

  public getSessionId(): string {

    return this.sessionId

  }

  /////////////
  // Setters //
  /////////////
  public setSession(session: Session): void {

    this.session = session

  }

  public setSessionId(sessionId: string): void {

    this.sessionId = sessionId

  }

}
