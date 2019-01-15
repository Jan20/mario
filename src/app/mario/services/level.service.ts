import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { LevelList } from 'src/app/misc/level.list';
import { Level } from '../../models/level';
import { LevelInterface } from 'src/app/interfaces/level.interface';
import { HttpClient } from '@angular/common/http';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  ///////////////
  // Variables //
  ///////////////
  public levelSubject: Subject<Level> = new Subject<Level>()
  private level: Level

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,
    private http: HttpClient,

  ) { 

  }

  ///////////////
  // Functions //
  ///////////////
  public async initialize(): Promise<void> {

 
  }

  
  public storeLevelToSession(userKey: string, sessionKey: string, level: Level): void {

    this.angularFirestore.doc<LevelInterface>(`users/${userKey}/sessions/${sessionKey}/data/level`).set(level.toInterface())

  }

  public async getLevelFromServer(userKey: string, sessionKey: string): Promise<Level> {

    let levelInterface: LevelInterface

    await this.angularFirestore.doc<LevelInterface>(`users/${userKey}/sessions/${sessionKey}/data/level`).get().toPromise().then(level => {

      levelInterface = {

        key: level.data()['key'],
        id: level.data()['id'],
        line_00: level.data()['line_00'].split(''),
        line_01: level.data()['line_01'].split(''),
        line_02: level.data()['line_02'].split(''),
        line_03: level.data()['line_03'].split(''),
        line_04: level.data()['line_04'].split(''),
        line_05: level.data()['line_05'].split(''),
        line_06: level.data()['line_06'].split(''),
        line_07: level.data()['line_07'].split(''),
        line_08: level.data()['line_08'].split(''),
        line_09: level.data()['line_09'].split(''),
        line_10: level.data()['line_10'].split(''),
        line_11: level.data()['line_11'].split(''),
        line_12: level.data()['line_12'].split(''),
        line_13: level.data()['line_13'].split(''),
        line_14: level.data()['line_14'].split('')

      }

    })

    return new Promise<Level>(resolve => resolve(Level.fromInterface(levelInterface)))

  }

  public async getInitialLevel(levelKey: string): Promise<Level> {

    let levelInterface: LevelInterface

    await this.angularFirestore.doc<LevelInterface>(`levels/${levelKey}`).get().toPromise().then(level => {

      levelInterface = {

        key: level.data()['key'],
        id: level.data()['id'],
        line_00: level.data()['line_00'].split(''),
        line_01: level.data()['line_01'].split(''),
        line_02: level.data()['line_02'].split(''),
        line_03: level.data()['line_03'].split(''),
        line_04: level.data()['line_04'].split(''),
        line_05: level.data()['line_05'].split(''),
        line_06: level.data()['line_06'].split(''),
        line_07: level.data()['line_07'].split(''),
        line_08: level.data()['line_08'].split(''),
        line_09: level.data()['line_09'].split(''),
        line_10: level.data()['line_10'].split(''),
        line_11: level.data()['line_11'].split(''),
        line_12: level.data()['line_12'].split(''),
        line_13: level.data()['line_13'].split(''),
        line_14: level.data()['line_14'].split('')

      }

    })

    return new Promise<Level>(resolve => resolve(Level.fromInterface(levelInterface)))


  }

  /**
   * 
   * 
   * 
   */
  public async getLevelKeysFromInitialLevels(): Promise<string[]> {

    let levelKeys: string[] = []

    await this.angularFirestore.collection<LevelInterface[]>(`levels`).get().toPromise().then(levels => {

      levels.forEach(level => {

        levelKeys.push(level.data()['key'])

      })

    })

    return new Promise<string[]>(resolve => resolve(levelKeys))

  }

  public evolve(): void {

    // this.http.get('https://us-central1-thesis-test-002.cloudfunctions.net/function-3')

  }

  /////////////
  // Getters //
  /////////////
  public async getLevel(): Promise<Level> {

    if (this.level === undefined) {

      this.level = await this.getInitialLevel('level_01')

    }

    return this.level

  }

  /////////////
  // Setters //
  /////////////
  public setLevel(level: Level): void { 
    
    console.log(level)
    this.level = level
    this.levelSubject.next(level)
  
  }

}
