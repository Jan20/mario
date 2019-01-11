import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { LevelList } from 'src/app/misc/level.list';
import { Level } from '../../models/level';
import { LevelInterface } from 'src/app/interfaces/level.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  ///////////////
  // Variables //
  ///////////////
  public levelSubject: Subject<Level> = new Subject<Level>()
  private level: Level = LevelList.getLevel(0)

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,
    private http: HttpClient,

  ) { 

    this.setLevel(LevelList.getLevel(0))

  }

  ///////////////
  // Functions //
  ///////////////
  public async initialize(): Promise<void> {

    LevelList.getLevels().forEach(level => {

      this.storeLevel(level)

    })

  }

  public async storeLevel(level: Level): Promise<void> {

    this.angularFirestore.collection<LevelInterface>('levels').doc(level.key).set(level.toInterface())

  }

  public storeLevelToSession(userKey: string, sessionKey: string, level: Level): void {

    this.angularFirestore.doc<LevelInterface>(`users/${userKey}/sessions/${sessionKey}/data/level`).set(level.toInterface())

  }

  public async getLevelFromServer(userKey: string, sessionKey: string): Promise<Level> {

    let level: Level
    let levelInterface: LevelInterface

    await this.angularFirestore.doc<LevelInterface>(`users/${userKey}/sessions/${sessionKey}/data/level`).get().toPromise().then(async level => {

      levelInterface = {

        key: level.data()['key'],
        id: level.data()['id'],
        line_00: level.data()['line_00'],
        line_01: level.data()['line_01'],
        line_02: level.data()['line_02'],
        line_03: level.data()['line_03'],
        line_04: level.data()['line_04'],
        line_05: level.data()['line_05'],
        line_06: level.data()['line_06'],
        line_07: level.data()['line_07'],
        line_08: level.data()['line_08'],
        line_09: level.data()['line_09'],
        line_10: level.data()['line_10'],
        line_11: level.data()['line_11'],
        line_12: level.data()['line_12'],
        line_13: level.data()['line_13'],
        line_14: level.data()['line_14']

      }

    })

    return new Promise<Level>(resolve => resolve(Level.fromInterface(levelInterface)))

  }

  public evolve(): void {

    // this.http.get('https://us-central1-thesis-test-002.cloudfunctions.net/function-3')

  }

  /////////////
  // Getters //
  /////////////
  public getLevel(): string[][] {

    return this.level.representation

  }

  /////////////
  // Setters //
  /////////////
  public setLevel(level: Level): void { 
    
    this.level = level
    this.levelSubject.next(level)
  
  }

}
