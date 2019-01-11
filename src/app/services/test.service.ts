import { Injectable } from '@angular/core';
import { UserService } from '../analytics/services/user.service';
import { SessionService } from '../analytics/services/session.service';
import { LevelService } from '../mario/services/level.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Samples } from '../misc/samples';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(

    private userService: UserService,
    private sessionService: SessionService,
    private levelService: LevelService,
    private angularFirestore: AngularFirestore


  ) { }

  public setUpTestEnvironment(): void {

    this.userService.deleteUsers()

    this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser)
    this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession.key}`).set({

      key: Samples.sampleSession.key,
      id: Samples.sampleSession.id

    })

    this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession.key}/data/performance`).set(

      Samples.sampleSession.performance.toInterface()

    )

  }

}
