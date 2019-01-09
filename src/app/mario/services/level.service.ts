import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { generateKey } from 'src/app/misc/helper';
import { LevelList } from 'src/app/misc/level.list';
import { Level } from '../../models/level';
import { LevelInterface } from 'src/app/interfaces/level.interface';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  ///////////////
  // Variables //
  ///////////////
  public levelSubject: Subject<Level> = new Subject<Level>()
  private currentLevel: Level = LevelList.getLevel(0)

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,

  ) { 

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

  /**
   * 
   * 
   * 
   * @param userKey 
   * @param sessionKey 
   */
  public async fetchLevel(userKey: string, sessionKey: string): Promise<void> {

    this.angularFirestore.doc<LevelInterface>(`users/${userKey}/sessions/${sessionKey}/level`).get().toPromise().then(level => {
      
      this.levelSubject.next(Level.fromInterface(level.data.prototype))
    
    })

  }

  /////////////
  // Getters //
  /////////////
  public getLevel(id: number): string[][] {

    return this.currentLevel.representation

  }

}
