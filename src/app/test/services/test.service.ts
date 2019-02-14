import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/analytics/services/user.service';
import { SessionService } from 'src/app/analytics/services/session.service';
import { Samples } from '../samples';

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

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession.key}`).set(Samples.sampleSession.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession.key}/data/performance`).set(Samples.sampleSession.performance.toObject())

  }

  public async setUpThreeSessions() {

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession1.key}`).set(Samples.sampleSession1.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession1.key}/data/performance`).set(Samples.sampleSession1.performance.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession2.key}`).set(Samples.sampleSession2.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession2.key}/data/performance`).set(Samples.sampleSession2.performance.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession3.key}`).set(Samples.sampleSession3.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession3.key}/data/performance`).set(Samples.sampleSession3.performance.toObject())

  }

  public async setUpThreeSessionStubs() {

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession1Stub.key}`).set(Samples.sampleSession1Stub.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession2Stub.key}`).set(Samples.sampleSession2Stub.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession3Stub.key}`).set(Samples.sampleSession3Stub.toObject())

  }

  public async setUpFourSessions() {

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser.toInterface())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession1.key}`).set(Samples.sampleSession1.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession1.key}/data/performance`).set(Samples.sampleSession1.performance.toObject())

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser.toInterface())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession2.key}`).set(Samples.sampleSession2.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession2.key}/data/performance`).set(Samples.sampleSession2.performance.toObject())

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser.toInterface())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession3.key}`).set(Samples.sampleSession3.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession3.key}/data/performance`).set(Samples.sampleSession3.performance.toObject())

    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}`).set(Samples.sampleUser.toInterface())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession4.key}`).set(Samples.sampleSession4.toObject())
    await this.angularFirestore.doc(`users/${Samples.sampleUser.key}/sessions/${Samples.sampleSession4.key}/data/performance`).set(Samples.sampleSession4.performance.toObject())

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
