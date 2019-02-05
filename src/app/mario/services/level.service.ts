import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Level } from '../../models/level';
import { LevelInterface } from 'src/app/interfaces/level.interface';
import { SessionService } from 'src/app/analytics/services/session.service';
import { UserService } from 'src/app/analytics/services/user.service';
import { Session } from 'src/app/models/session';
import { CloudService } from 'src/app/cloud/cloud.service';

@Injectable({

  providedIn: 'root'

})
export class LevelService {

  ///////////////
  // Variables //
  ///////////////

  // Variable intented to store the service's current level.
  private level: Level

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private sessionService: SessionService,
    private cloudService: CloudService,

  ) {}

  ///////////////
  // Functions //
  ///////////////

  /**
   * 
   * Retrieves the level for the current session from Firestore.
   * 
   * @param userKey: Valid user key like 'user_042'.
   * @param sessionKey: Valid session key like 'session_042'.
   */
  public async getLevelFromServer(userKey: string, sessionKey: string): Promise<Level> {

    // Variable intended to store a level object.
    let level: Level

    // Defines a reference to the Firestore location at which
    // the desired level can be found. 
    const ref: string = `users/${userKey}/sessions/${sessionKey}/data/level`
    
    // Retrieves a level from Firestore.
    await this.angularFirestore.doc(ref).get().toPromise().then(result => {
      
      // Creates a level object from the result coming from Firestore.
      level = Level.fromDocumentSnapshot(result)
    
    })

    // Returns a promise that is resolved as soon as a level has been
    // successfully retrieved from Firestore.
    return new Promise<Level>(resolve => resolve(level))

  }

  /**
   * 
   * Retrieves an initial level from Firestore.
   * 
   */
  public async getInitialLevel(): Promise<Level> {

    // Retrieves the level keys of all default levels.
    const levelKeys: string[] = await this.getLevelKeysFromInitialLevels()
    
    // Retrieves the index of a random level.
    const randomIndex: number = Math.floor(Math.random() * levelKeys.length)

    // Choose a random level key.
    const levelKey = levelKeys[randomIndex]
    
    // Defines a variable intended to hold the randomly selected level.
    let level: Level

    // Retrieves an initial level from Firestore.
    await this.angularFirestore.doc(`levels/${levelKey}`).get().toPromise().then(result => {

      // Creates a new level object.
      level = Level.fromDocumentSnapshot(result)

    })

    // Returns a promise that should be resolved as soon as a random
    // level is selected.
    return new Promise<Level>(resolve => resolve(level))

  }

  /**
   * 
   * Retrievs the level keys from all defaul levels.
   * 
   */
  public async getLevelKeysFromInitialLevels(): Promise<string[]> {

    // String array intended to store the keys of the deault levels.
    let levelKeys: string[] = []

    // Retrieves all default levels from Firestore.
    await this.angularFirestore.collection(`levels`).get().toPromise().then(levels => {

      // Iterates over all default levels an writes their keys to the
      // level key array.
      levels.forEach(level => levelKeys.push(level.data()['key']))

    })

    // Returns a promise referring to the level key array.
    return new Promise<string[]>(resolve => resolve(levelKeys))

  }

  /**
   * 
   * Loads the level for the upcoming session from a pool of 
   * eight levels in total. The first session's level is selected
   * randomly from a collection of eight initial levels. The selection 
   * of levels for all futher sessions takes place in the backend in which 
   * the opponents of each further level are choosen according 
   * to the users skill level.
   * 
   */
  private async loadLevel(): Promise<Level> {

    // Receives the current user's user key.
    const userKey: string = await this.userService.getCurrentUserKey()

    // Receives the session keys of all previously stored sessions.
    const sessionKeys: string[] = await this.sessionService.getSessionKeys(userKey)

    // Defines a new variable intended to store the
    // level for the current session.
    let level: Level

    // Block should be executed if the user has not finished
    // a single session yet.
    if (sessionKeys.length === 0) {

      // Loads an initial level.
      level = await this.loadInitialLevel()
    
    } else {

      // If the user has already finished a level before,
      // a session with an evolved level should have been created
      // within the service-side backend. Hence sessions are stored
      // in order from the first to the last one, choosing the last
      // session in the collection should yield a freshly created one.
      const i: number = sessionKeys.length - 1

      // Retrieves the last session stored at Firestore.
      const session: Session = await this.sessionService.getSession(userKey, sessionKeys[i])

      console.log(session)

      // If the current session has been created but not yet
      // finished, the level for that specific session is loaded
      // from the Firstore.
      if (session.status === 'created') {

        // Retrieves the level stored under current session from Firestore.
        level = await this.getLevelFromServer(userKey, sessionKeys[i])
        console.log(level)
        // Write the session to the session service.
        this.sessionService.setSession(session)

        // Write the freshly fetched level to the session service.
        this.sessionService.setLevel(level)

      }

      if (session.status === 'finished') {

        await this.cloudService.evolveLevel(userKey)

        // Retrieves the level stored under current session from Firestore.
        level = await this.getLevelFromServer(userKey, sessionKeys[i + 1])

      }

    }

    // Returns a promise referring to the level defined above.
    return new Promise<Level>(resolve => resolve(level))

  }

  /**
   * 
   * Auxiliary function to load an initial level that is invoked
   * when the user has not completed a single session yet.
   * 
   */
  private async loadInitialLevel(): Promise<Level> {

    // Creates a new session.
    const session: Session = await this.sessionService.generateSession()

    // Writes the newly created session to the session service.
    this.sessionService.setSession(session)

    // Selects a random level from the list of default levels.
    const level: Level = await this.getInitialLevel()

    // Writes the newly created level to the session service.
    this.sessionService.setLevel(level)

    // Returns a promise referring to the level defined above.
    return new Promise<Level>(resolve => resolve(level))

  } 

  /////////////
  // Getters //
  /////////////

  /**
   * 
   * Returns the service's current level.
   * 
   */
  public async getLevel(): Promise<Level> {

    // If no level has been defined yet, a new level should be loaded.
    this.level === undefined ? this.level = await this.loadLevel(): null

    // Returns a promise referrin to the service's current level.
    return new Promise<Level>(resolve => resolve(this.level))

  }

  /////////////
  // Setters //
  /////////////
  /**
   * 
   * Sets the service's current level to a new one.
   * 
   * @param level: A new instance of class Level.
   * 
   */
  public setLevel(level: Level): void { 
    
    this.level = level
  
  }
}