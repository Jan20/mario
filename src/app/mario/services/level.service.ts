import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Level } from '../../models/level';
import { LevelInterface } from 'src/app/interfaces/level.interface';
import { SessionService } from 'src/app/analytics/services/session.service';
import { UserService } from 'src/app/analytics/services/user.service';
import { Session } from 'src/app/models/session';

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

  ) { 

  }

  ///////////////
  // Functions //
  ///////////////

  /**
   * 
   * @param userKey 
   * @param sessionKey 
   */
  public async getLevelFromServer(userKey: string, sessionKey: string): Promise<Level> {

    let level: Level

    const ref: string = `users/${userKey}/sessions/${sessionKey}/data/level`
    
    await this.angularFirestore.doc(ref).get().toPromise().then(result => level = Level.fromDocumentSnapshot(result))

    return new Promise<Level>(resolve => resolve(level))

  }

  public async getInitialLevel(levelKey: string): Promise<Level> {

    let level: Level

    await this.angularFirestore.doc<LevelInterface>(`levels/${levelKey}`).get().toPromise().then(result => level = Level.fromDocumentSnapshot(result))

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
   * eight levels in total. The selection for the first level 
   * happens randomely from all levels. The selection of levels 
   * for all futher sessions takes place in the backend in which 
   * the opponents of each further level are choosen according 
   * to the users skill level.
   * 
   */
  private async loadLevel(): Promise<Level> {

    // Receives the user key of the current user.
    const userKey: string = await this.userService.getCurrentUserKey()

    // Receives the session keys of all previously stored sessions.
    const sessionKeys: string[] = await this.sessionService.getSessionKeys(userKey)

    // Defines a new variable intended to store the
    // level for the current session.
    let level: Level

    // Block should be executed if the user has not finished
    // a single session yet.
    if (sessionKeys.length === 0) {

      // Creates a new session.
      const session: Session = await this.sessionService.generateSession()

      // Writes the newly created session to the session service.
      this.sessionService.setSession(session)

      // Retrieves the level keys of all default levels.
      const levelKeys: string[] = await this.getLevelKeysFromInitialLevels()
      
      // Retrieves the index of a random level.
      const randomIndex: number = Math.floor(Math.random() * levelKeys.length)
      
      // Selects a random level from the list of default levels.
      level = await this.getInitialLevel(levelKeys[randomIndex])

      // Writes the newly created level to the session service.
      this.sessionService.setLevel(level)
    
    } else {

      // If the user has already finished a previous level,
      // a new session with an evolved level has been created
      // within the service-side backend. Hence, iterating over
      // all session keys should yield one session with the
      // status 'created'.
      const i: number = sessionKeys.length - 1

      // Retrieves a session from Firestore.
      const session: Session = await this.sessionService.getSession(userKey, sessionKeys[i])

      // If the current session has been created but not yet
      // finished, the level for that specific session is loaded
      // from Firestore.
      if (session.status === 'created') {

        // Retrieves the level stored under current session from Firestore.
        level = await this.getLevelFromServer(userKey, sessionKeys[i])

        // Write the session to the session service.
        this.sessionService.setSession(session)

        // Write the freshly fetched level to the session service.
        this.sessionService.setLevel(level)

      }

    }

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
    this.level === undefined ? this.level = await this.loadLevel() : null
    // this.level === undefined ? this.level = await this.getLevelFromServer('user_001', 'session_002') : null



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
