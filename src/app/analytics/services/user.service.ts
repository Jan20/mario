import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { generateKey } from 'src/app/misc/helper';
import { User } from 'src/app/models/user';
import { UserInterface } from 'src/app/interfaces/user.interface';

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
  public async getUserKeys(): Promise<string[]> {

    let userKeys: string[] = []

    await this.angularFirestore.collection<UserInterface[]>('users').get().toPromise().then(users => {
    
      users.forEach(user => userKeys.push(user.data().key))
    
    })

    return new Promise<string[]>(resolve => resolve(userKeys))

  }

  public async deleteUser(userKey: string): Promise<string> {

    this.angularFirestore.doc(`users/${userKey}`).delete()

    return new Promise<string>(resolve => resolve(`User with the Key ${userKey} has been deleted.`))

  }

  public async deleteUsers(): Promise<string> {

    const userKeys: string[] = await this.getUserKeys()

    userKeys.forEach(async userKey => {

      await this.deleteUser(userKey)

    })

    return new Promise<string>(resolve => resolve(`All users have been deleted.`))

  }

  /**
   * 
   * Tries to retrieve an UserInterfaceId for a UserInterface who
   * has already participated in a previous round
   * of the experiment. If this is the case, a
   * reference to the user's firestore id should
   * be found in the localStorage. However, for
   * every new user a new id is created. 
   * 
   */
  public async getCurrentUserKey(): Promise<string> {
    
    //
    // Retrieves a user id from the localStorage.
    // If no 'userId' can be found, the variable
    // should be null.
    //
    let userKey: string = localStorage.getItem('user_key')

    //
    // If no userId has been stored in the user's 
    // browser, a new user is created at the firestore
    // database and a reference set to the userId variable.
    //
    if (userKey === undefined || userKey === null) {

      const user = await this.createUser()
      
      userKey = user.key

    }

    //
    // Checks whether the user_id stored at the user's browser
    // actually exists within the firestore database. This should
    // be always the case unless the user's entry has been explicitly
    // deleted from the database or the dataset got somehow corrupted.
    //
    await this.angularFirestore.doc(`users/${userKey}`).get().toPromise().then(async stored_user => {

      if (stored_user.data() === undefined) {

        const user = await this.createUser()
      
        userKey = user.key

      } 

    })


    //
    // Returns a promise resolving the userId variable.
    //
    return new Promise<string>(async resolve => resolve(userKey))

  }

  /**
   * 
   * Creates a new user entry at firestore and promises
   * that the newly created user id will be returned
   * eventually.
   * 
   */
  private async createUser(): Promise<User> {

    //
    // Fetches the highest existing user id and
    // increases the value by one. This should
    // ensure that a user id is not used twice
    // throughtout the experiment.
    //
    const id: number = await this.getHighestUserId() + 1
    const key: string = generateKey('user', id)

    //
    // Constructs a key value for storing a new
    // user at firestore. The key should look
    // like 'user001'.
    //
    const user: User = new User(key, id)

    // Creates a new entry at Firestore that 
    // corresponds to the newly created user key.
    await this.angularFirestore.doc(`users/${user.key}`).set(user.toInterface())

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
    let highestUserId: number = 0

    //
    // Iterates through all users from firestore and
    // compares their user ids with the one stored in
    // the highestUserId variable.
    //
    await this.angularFirestore.collection<UserInterface[]>('users').get().toPromise().then(users => {
    
      users.docs.forEach(user => {

        // If the user's id is higher than
        // the former highest user id, the
        // value of the highestUserId variable 
        // is is replaced by the one stored in
        // the userId variable.
        user.data().id > highestUserId ? highestUserId = user.data().id : null

      })

    })

    //
    // Resolves promise by returning the highest user id
    // which should always be an number.
    //
    return new Promise<number>(resolve => resolve(highestUserId))

  }

}
