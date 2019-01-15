import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/analytics/services/user.service';
import { Samples } from 'src/app/misc/samples';
import { SessionService } from 'src/app/analytics/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(

    private userService: UserService,
    private sessionService: SessionService,
    private angularFirestore: AngularFirestore

  ) { }

  /**
   * 
   * 
   * 
   * 
   */
  public async setUp(): Promise<void> {

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser.toInterface())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession.key}`).set({

      key: Samples.sampleSession.key,
      id: Samples.sampleSession.id

    })

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession.key}/data/performance`).set(

      Samples.sampleSession.performance.toInterface()

    )

  }

  /**
   * 
   * 
   * 
   */
  public async cleanUp(): Promise<void> {

    const userKeys: string[] = await this.userService.getUserKeys()

    userKeys.forEach(async userKey => {

      const sessionKeys: string[] = await this.sessionService.getSessionKeys(userKey)

      sessionKeys.forEach(async sessionKey => await this.sessionService.deleteSession(userKey, sessionKey))

    })

    await this.userService.deleteAllUsers()

  }

}
