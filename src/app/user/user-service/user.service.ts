import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import * as firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { User } from '../user-model/user'
import { Subject } from 'rxjs'

@Injectable()
export class UserService {
  
  ///////////////
  // Variables //
  ///////////////
  private user: User
  private authState: Observable<firebase.User>

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private router: Router
  
  ) {
  
    this.angularFireAuth.authState.subscribe(user => {
  
      if (user) {
  
        return this.angularFireStore.doc<User>(`users/${user.uid}`).valueChanges().subscribe( newUser => {
  
          this.setUser(new User(newUser.userId, newUser.email, newUser.photoURL, newUser.displayName))
  
        })
  
      } else {
  
        // return Observable.of(null)
  
      }
    })
  }

  ///////////////
  // Functions // 
  ///////////////
  public googleLogin() {
  
    return this.oAuthLogin(new firebase.auth.GoogleAuthProvider())
  
  }

  private oAuthLogin(provider) {
  
    return this.angularFireAuth.auth.signInWithPopup(provider).then(credential => this.updateUserData(credential.user))

  }

  private updateUserData(user) {
    
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${user.uid}`)
    
    const data: any = {
    
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    
    }
    
    this.setUser(new User(user.uid, user.email, user.displayName, user.photoURL))
    
    return userRef.set(data, { merge: true })
  
  }

  public signOut() {
    
    this.user = null
    this.angularFireAuth.auth.signOut().then( () => this.router.navigate(['/']))
  
  }

  /////////////
  // Getters //
  /////////////
  async getUser(): Promise<any> {
    
    if (this.user) {
    
      return new Promise(resolve => resolve(this.user))
    
    } 
    
    return new Promise( resolve => {
  
      this.angularFireAuth.authState.subscribe(user => this.angularFireStore.doc<User>(`users/${user.uid}`).valueChanges().subscribe( activeUser => {
        this.user = activeUser
        resolve(activeUser)}))

    })

  }

  /////////////
  // Setters //
  /////////////
  public setUser(user: User): void {
    this.user = user
  }

}
