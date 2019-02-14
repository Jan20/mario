import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Helper } from 'src/app/misc/helper';
import { UserService } from './user.service';
import { Session } from '../../models/session';
import { Performance } from '../../models/performance';
import { CloudService } from 'src/app/cloud/cloud.service';
import { Level } from 'src/app/models/level';
import { Subject } from 'rxjs';
import { interval } from "rxjs";
import { firestore } from 'firebase';
import { SurveyService } from 'src/app/survey/services/survey.service';
import { Config } from 'src/app/config/config';

@Injectable({

  providedIn: 'root'

})
export class SessionService {

  ///////////////
  // Variabels //
  ///////////////

  // Holds a reference to the currently played session.
  private session: Session

  private recentSessions: Session[]

  // Holds a reference to the currently played level.
  private level: Level

  // Defines the number of lives the player starts with.
  private lives: number = Config.numberOfLives

  // 
  private consecutiveSessions: number = 0

  public statusSubject: Subject<string> = new Subject<string>()
  public sessionSubject: Subject<string> = new Subject<string>()
  public readyForSurveySubject: Subject<boolean> = new Subject<boolean>()

  public timeSubject: Subject<string> = new Subject<string>()
  public scoreSubject: Subject<string> = new Subject<string>()
  public lifeSubject: Subject<number> = new Subject<number>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private cloudService: CloudService,
    private surveyService: SurveyService

  ) {

    this.statusSubject.next('ready')

  }

  ///////////////
  // Functions //
  ///////////////
  
  /**
   *
   * Retrieves all session keys for a given user.
   *
   * @param userKey: A valid user key such as 'user_042'.
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
   * Genereates a new session object. The function is intended to
   * be used when a new level should be initialized but has been
   * created yet. That case should only occur when a new user tries
   * to play his very first session. For every consecutive session,
   * a new session obeject should have been created by the backend.
   * 
   */
  public async generateSession(): Promise<Session> {

    // Gets the current user's Id.
    const userKey: string = await this.userService.getCurrentUserKey()

    // Gets the highest session Id for the given user and increases the number by one.
    const id: number = await this.getHighestSessionId(userKey) + 1

    // Creates a session key for the current session based on the previously defined id.
    const key: string = Helper.generateKey('session', id)

    // Creates a new Performance object which values are initialized with zeros.
    const performance: Performance = new Performance(0, 0, 0, 0, 0, 0, 0, 100)

    // Initializes a new session object.
    const session: Session = new Session(key, id, 'created', firestore.Timestamp.fromDate(new Date()), performance)

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
  public async getHighestSessionId(userKey: string): Promise<number> {
    
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
   * @param outcome: The outcome of the just finished session, which can be 'completed' or 'lost'.
   *
   */
  public async storeSession(outcome: string): Promise<void> {

    // Propagates the session's outcome to the user interface. 
    this.statusSubject.next(outcome)

    // Retrieves the user id of the current user from the user service.
    const userKey: string = await this.userService.getCurrentUserKey()

    // Defines a Firestore document reference for the just finished session.
    const ref: string = `users/${userKey}/sessions/${this.session.key}`
    
    // Updates the timestamp and status of the current session.
    this.session.timestamp = firestore.Timestamp.fromDate(new Date())
    this.session.status = 'finished'

    // Stores the current session at Firestore.
    await this.angularFirestore.doc(ref).set(this.session.toObject())
    await this.angularFirestore.doc(`${ref}/data/performance`).set(this.session.performance.toObject())
    await this.angularFirestore.doc(`${ref}/data/level`).set(this.getLevel().toObject())

    // Calls the backend in order to adapt the difficulty of the next level.
    await this.cloudService.evolveLevel(userKey)

    // Checks whether the user can progress to the survey.
    await this.checkProgressToSurvey(userKey)

    // Informs the user that the current session has been stored.
    this.sessionSubject.next('stored')
    this.readyForSurveySubject.next(await this.checkProgressToSurvey(userKey))

  }

  /**
   * 
   * Checks whether the user has already finished three sessions
   * and can therefore progress to the survey.
   * 
   * @param userKey: A valid user key such as 'user_042'.
   * 
   */
  public async checkProgressToSurvey(userKey: string): Promise<boolean> {

    // Boolean variable indicating whether a user can
    // progress to the survey.
    let isReady: boolean = false

    // Retrieves all recently finished sessions.
    const recentSessions: Session[] = await this.getRecentlyFinishedSessions(userKey)

    // Checks whether at least 3 sessions have been finished while the user
    // has not finished a survey yet.
    if (recentSessions.length > 2 && !this.surveyService.surveyCompleted) {

      // Writes the recently finished sessions to the survey service.
      await this.surveyService.setRecentSessions(recentSessions)    

      // indicates that the user can progress to the survey.
      isReady = true
    
    }

    // Returns a promise which is resolved when the state
    // of the 'isReady' variable changes.
    return new Promise<boolean>(resolve => resolve(isReady))

  }
  
  /**
   * 
   * Returns an array of recently finished session. If the user has finished sessions
   * within the last 60 minutes, the function returns a list of recently
   * finished sessions and an empty list otherwise.
   * 
   * @param userKey: A valid user key such as 'user_042"
   */
  public async getRecentlyFinishedSessions(userKey: string): Promise<Session[]> {

    // Variable intented to store all recent sessions.
    let recentSessions: Session[] = []

    // Stores all previously finished sessions.
    const storedSessions: Session[] = await this.getSessions(userKey) 

    // Computes the amount of milliseconds within one hour, which should
    // result in 3,600,000 milliseconds.
    const oneHourInMilliseconds: number = 60 * 60 * 1000

    // Iterates over all previously finished sessions.
    await storedSessions.forEach(async session => {

        // A session will be regarded as to be recently finished if it has been
        // completed within the last hour. Therefore, the current date is converted
        // into milliseconds and reduced by the 3,600,000 milliseconds.
        const recentlyFinished: number = new Date().valueOf() - oneHourInMilliseconds

        // Checks whether the session of the current iteration has been finished within
        // one hour and that not more than two sessions are already stored at recent
        // sessions. If the conditions are met, the current iteration's session is added
        // to the recent sessions array.
        if (session.timestamp.toMillis() > recentlyFinished && recentSessions.length < 3) {
          
          session.status === 'finished' ? recentSessions.push(session) : null
  
        }

      }) 

    // Returns a promise which is resolved as soon as the recent sessions
    // variable is filled.
    return new Promise<Session[]>(resolve => resolve(recentSessions))

  }

  /**
   * 
   * Returns all finished sessions for a given user.
   * 
   * @param userKey: A valid user id such as 'user_042'
   * 
   */
  public async getSessions(userKey: string): Promise<Session[]> {

    // Defines an array intended to be filled with all sessions
    // stored for a given user.
    let sessions: Session[] = []

    // Defines a reference to the sessions collection at Firestore.
    const ref: string = `users/${userKey}/sessions`

    // Retrieves all sessions from Firestore that are stored for the
    // specified user.
    await this.angularFirestore.collection(ref).get().toPromise().then(firestoreSessions => {

      // Iterates over all stored sessions.
      firestoreSessions.forEach(session => {

        
        // Creates an object of class Session from the data retrieved from Firestore.
        const storedSession: Session = Session.fromObject(session.data(), null)

        // Checks whether the session under scrutiny has been finished. 
        sessions.push(storedSession)

      })

    })

    // Retruns a promise that is resolved as soon as all sessions are retrieved.
    return new Promise<Session[]>(resolve => resolve(sessions))

  }
  
  /**
   * 
   * Retrieves an existing session from the database which
   * is identified by a unique user key and a corresponding
   * session key.
   * 
   * @param userKey: A valid user key such as 'user_042' 
   * @param sessionKey: A valid session key such as 'session_042'
   */
  public async getSession(userKey: string, sessionKey: string): Promise<Session> {

    // Declaring a Session object intended to store a session retrieved
    // from the database.
    let session: Session

    // Declaring a Performance object that should only a performance
    // temporarily.
    let performance: Performance

    // Defines a reference to a performance document stored at Firebase.
    const performanceRef: string = `users/${userKey}/sessions/${sessionKey}/data/performance`

    // Retrieves a performance document from Firestore.
    await this.angularFirestore.doc(performanceRef).get().toPromise().then(result => {
      
      // Checks whether the performance document exists at Firestore. If that is the case, 
      // a new Performance object based on the data stored at Firestore is created. If the
      // reference does not link to a valid performance document, a new empty Performance
      // object is created.
      performance = result.exists ? Performance.fromObject(result.data()) : new Performance(0, 0, 0, 0, 0, 0, 0, 100)
      
    })

    // Defines a reference to a session document stored at Firebase.
    const sessionRef: string = `users/${userKey}/sessions/${sessionKey}`

    // Retrieves a session from Firestore.
    await this.angularFirestore.doc(sessionRef).get().toPromise().then(result => {

      // Checks whether a valid session document exists at Firestore. If that is
      // the case, the session variable declared above is filled with a Session
      // obejct generated from the data stored at the session document.
      result.exists ? session = Session.fromObject(result.data(), performance) : null

    })

    // Returns a promise which is resolved as soon as the session object is defined.
    return new Promise<Session>(resolve => resolve(session))

  }

  /**
   * 
   * Deletes a single session from the database.
   * 
   * @param userKey: A valid user key such as 'user_042'
   * @param sessionKey: A valid session Key such as 'session_042'
   * 
   */
  public async deleteSession(userKey: string, sessionKey: string): Promise<void> {

    // Removes the referenced document from Firestore.
    await this.angularFirestore.doc(`users/${userKey}/sessions/${sessionKey}`).delete()

  }


private startTime = new Date().getTime();
private timeElapsed = 0;

public myTimer(): void {
    
  interval(1000).subscribe( () => {
          
    const timeNow = new Date().getTime()

    this.timeElapsed += Math.floor((timeNow - this.startTime)/1000)
    
    this.session.performance.time = this.timeElapsed

    this.timeSubject.next(Helper.buildSixDigitNumber(this.timeElapsed))

    this.startTime = timeNow
    
  })

}


public resetTimer(): void {
  
  this.startTime = new Date().getTime();
	this.timeElapsed = 0;

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

  public getRecentSessions(): Session[] {

    return this.recentSessions

  }

  public getConsecutiveSessions(): number {

    return this.consecutiveSessions

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

  public setRecentSessions(recentSessions: Session[]): void {

    this.recentSessions = recentSessions

  }

  public setLevel(level: Level): void {

    this.level = level

  }

  public getLives(): number {

    return this.lives

  }


  //////////////////////
  // Helper Functions //
  //////////////////////
  public increaseDefeatedByGaps(): void {

    this.session.performance.defeatedByGaps += 1

  }

  public increaseDefeatedByOpponentType1(): void { 
    
    this.session.performance.defeatedByOpponentType1 += 1 
  
  }

  public increaseDefeatedByOpponentType2(): void {

    this.session.performance.defeatedByOpponentType2 += 1

  }

  public increaseDefeatedByOpponentType3(): void {

    this.session.performance.defeatedByOpponentType3 += 1

  }

  public increaseScore(value: number): void {

    this.session.performance.score += value
    this.scoreSubject.next(Helper.buildSixDigitNumber(this.session.performance.score))
    
  }

  public setProgress(progress: number): void {

    this.session.performance.progress = progress

  }

  public increaseLives(): void {

    this.lives += 1
    this.lifeSubject.next(this.lives)
    
  }

  public decreaseLives(): void {

    this.lives -= 1
    this.lifeSubject.next(this.lives)

  }

}