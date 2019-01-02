import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AnalyticsHelper } from '../analytics-misc/analytics-helper';
import { User } from '../analytics-interfaces/user';

@Injectable({

  providedIn: 'root'

})
export class UserService {

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,

  ) { }

  ///////////////
  // Functions //
  ///////////////
  /**
   * 
   * Tries to retrieve an userId for a user who
   * has already participated in a previous round
   * of the experiment. If this is the case, a
   * reference to the user's firestore id should
   * be found in the localStorage. However, for
   * every new user a new id is created. 
   * 
   */
  public async getCurrentUser(): Promise<User> {
    
    //
    // Retrieves a user id from the localStorage.
    // If no 'userId' can be found, the variable
    // should be null.
    //
    let user: User = {key: localStorage.getItem('user_key')}

    //
    // If no userId has been stored in the user's 
    // browser, a new user is created at the firestore
    // database and a reference set to the userId variable.
    //
    if (user.key === undefined || user.key === null) {

      user = await this.createUser()
      
    }

    //
    // Checks whether the user_id stored at the user's browser
    // actually exists within the firestore database. This should
    // be always the case unless the user's entry has been explicitly
    // deleted from the database or the dataset got somehow corrupted.
    //
    await this.angularFirestore.doc(`users/${user.key}`).get().toPromise().then(async stored_user => {

      if (stored_user.data() === undefined) {

        user = await this.createUser()
      
      } 

    })

    //
    // Returns a promise resolving the userId variable.
    //
    return new Promise<User>(async resolve => resolve(user))

  }

  /**
   * 
   * Creates a new user entry at firestore and promises
   * that the newly created user id will be returned
   * eventually.
   * 
   */
  private async createUser(): Promise<User> {

    // Fetches the highest existing user id and
    // increases the value by one. This should
    // ensure that a user id is not used twice
    // throughtout the experiment.
    const id: number = await this.getHighestUserId() + 1
    const key: string = new AnalyticsHelper().generateKey('user', id)

    // Constructs a key value for storing a new
    // user at firestore. The key should look
    // like 'user001'.
    const user: User = {id: id, key: key}

    // Creates a new entry at Firestore that 
    // corresponds to the newly created user key.
    await this.angularFirestore.doc(`users/${user.key}`).set(user)

    // Sets a key-value-pair for the newly created
    // user key at the user's localStorage.
    localStorage.setItem('user_key', user.key)

    // Returns a promise pointing to the just
    // created userKey.
    return new Promise<User>(resolve => resolve(user))

  }

  /**
   * 
   * Returns the highest user id that can be found at firestore.
   * 
   */
  private async getHighestUserId(): Promise<number> {
    
    //
    // Sets a default user id.
    //
    let highest_user_id: number = 0

    //
    // Iterates through all users from firestore and
    // compares their user ids with the one stored in
    // the highestUserId variable.
    //
    await this.angularFirestore.collection<User>(`users`).get().toPromise().then(users => {
      
      users.docs.forEach(user => {

        // If the user's id is higher than
        // the former highest user id, the
        // value of the highestUserId variable 
        // is is replaced by the one stored in
        // the userId variable.
        user.data().id > highest_user_id ? highest_user_id = user.data().id : null

      })

    })

    // Resolves promise by returning the highest user id
    // which should always be an number.
    return new Promise<number>(resolve => resolve(highest_user_id))

  }

}
