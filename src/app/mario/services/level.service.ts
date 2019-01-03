import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { generateKey } from 'src/app/misc/helper';
import { LevelList } from 'src/app/misc/level-list';
import { SerializedLevel } from '../interfaces/serialized-level';
import { Level } from '../models/level';

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

  ) { }

  ///////////////
  // Functions //
  ///////////////
  public async initialize(): Promise<void> {

    LevelList.getLevels().forEach(level => {

      this.storeLevel(level)

    })

  }

  public async storeLevel(level: Level): Promise<void> {

    const serializedLevel: SerializedLevel = level.toObject()

    this.angularFirestore.collection<SerializedLevel>('levels').doc(serializedLevel.key).set(serializedLevel)

  }

  public async fetchLevel(key: string): Promise<void> {

    this.angularFirestore.doc<SerializedLevel>(`levels/${key}`).get().toPromise().then(level => {
      
      this.currentLevel = level.data.prototype
      debugger
    })

  }



  /**
   * 
   * Returns the highest level id that can be found at firestore.
   * 
   */
  private async getHighestLevelId(): Promise<number> {
    
    //
    // Sets a default level id.
    //
    let highestLevelId: number = 0

    //
    // Iterates through all levels from firestore and
    // compares their level ids with the one stored in
    // the highestlevelId variable.
    //
    await this.angularFirestore.collection<any>(`levels`).get().toPromise().then(levels => {
      
      levels.docs.forEach(level => {

        // If the level's id is higher than
        // the former highest level id, the
        // value of the highestlevelId variable 
        // is is replaced by the one stored in
        // the levelId variable.
        level.data().id > highestLevelId ? highestLevelId = level.data().id : null

      })

    })

    // Resolves promise by returning the highest level id
    // which should always be an number.
    return new Promise<number>(resolve => resolve(highestLevelId))

  }

  /////////////
  // Getters //
  /////////////
  public getLevel(id: number): string[][] {

    return this.currentLevel.representation

  }

}
