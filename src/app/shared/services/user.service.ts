import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Helper } from 'src/app/shared/helper';

@Injectable({

  providedIn: 'root'

})
export class UserService {

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private angularFirestore: AngularFirestore,

  ) {}

  ///////////////
  // Functions //
  ///////////////
  /**
   * 
   * Retrieves all user keys from Firestore.
   * 
   */
  public async getUserKeys(): Promise<string[]> {

    // Defines a new empty string array intended to
    // be filled with user keys.
    let userKeys: string[] = []

    // Fetches all users stored at the 'users' collection
    // at Firestore.
    await this.angularFirestore.collection(`users`).get().toPromise().then(users => {

      // Iterates over all users within the collection and
      // pushes their keys to the array defined above.
      users.forEach(user => userKeys.push(user.data().key))
    
    })

    // Returns a promise referring to the 'userKey' array.
    return new Promise<string[]>(resolve => resolve(userKeys))

  }

  /**
   * 
   * Deletes a specific user based on the user's key.
   * 
   * @param userKey: A valid user key such as 'user_042'
   * 
   */
  public async deleteUser(userKey: string): Promise<string> {

    // Deletes the Firestore document which is identified by
    // the givin user key.
    this.angularFirestore.doc(`users/${userKey}`).delete()

    // Returns a success message as soon as the user document
    // has been deleted.
    return new Promise<string>(resolve => resolve(`User with the Key ${userKey} has been deleted.`))

  }

  /**
   * 
   * Deletes all users stored at Firestore.
   * 
   */
  public async deleteAllUsers(): Promise<string> {

    // Retrieves all user keys from Firestore.
    const userKeys: string[] = await this.getUserKeys()

    // Iterates over all user keys and deletes every single user.
    userKeys.forEach(async userKey => await this.deleteUser(userKey))

    // Returns a success message.
    return new Promise<string>(resolve => resolve(`All users have been deleted.`))

  }

  /**
   * 
   * Attempts to receive a user id for an user who
   * has already participated in a previous round
   * of the experiment. If this is the case, a
   * reference to the user's user key should
   * be found in the browser's local storage. 
   * However, for every new user, a new id is created. 
   * 
   */
  public async getCurrentUserKey(): Promise<string> {
    
    // Retrieves a user id from the localStorage.
    // If no 'userId' can be found, the variable
    // should be null.
    let userKey: string = localStorage.getItem('user_key')

    // If no userId has been stored in the user's 
    // browser, a new user is created at the firestore
    // database and a reference set to the userId variable.
    if (userKey === undefined || userKey === null) {
      
      // Creates a new user.
      const user = await this.createUser()
      
      // Writes the new user's key to the 'userKey' variable.
      userKey = user.key

    }

    // Checks whether the user_id stored at the user's browser
    // actually exists within the firestore database. This should
    // be always the case unless the user's entry has been explicitly
    // deleted from the database or the dataset got somehow corrupted.
    await this.angularFirestore.doc(`users/${userKey}`).get().toPromise().then(async stored_user => {

      // Checks whether there exist datapoints connected
      // to the given user key.
      if (stored_user.data() === undefined) {
        
        // Creates a new user.
        const user = await this.createUser()
      
        // Writes the new user's key to the 'userKey' variable.
        userKey = user.key

      } 

    })

    // Returns a promise resolving the userId variable.
    return new Promise<string>(async resolve => resolve(userKey))

  }

  /**
   * 
   * Creates a new user entry at firestore and promises
   * that the newly created user id will be returned
   * eventually.
   * 
   */
  public async createUser(): Promise<User> {

    // Fetches the highest existing user id and
    // increases the value by one. This should
    // ensure that a user id is not used twice
    // throughtout the experiment.
    const id: number = await this.getHighestUserId() + 1

    // Generates a user key corresponding to the user id
    // defined above.
    const key: string = Helper.generateKey('user', id)

    // Constructs a key value for storing a new
    // user at firestore. The key should look
    // like 'user001'.
    const user: User = new User(key, id, 'english')

    // Creates a new entry at Firestore that 
    // corresponds to the newly created user key.
    await this.angularFirestore.doc(`users/${user.key}`).set(user.toObject())

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
    
    // Sets a default user id.
    let highestUserId: number = 0

    // Iterates through all users from firestore and
    // compares their user ids with the one stored in
    // the highestUserId variable.
    await this.angularFirestore.collection('users').get().toPromise().then(users => {

      // Iterates over all users stored at Firestore.
      users.docs.forEach(user => {

        // If the user's id is higher than
        // the former highest user id, the
        // value of the highestUserId variable 
        // is is replaced by the one stored in
        // the userId variable.
        user.data().id > highestUserId ? highestUserId = user.data().id : null

      })

    })

    // Resolves promise by returning the highest user id
    // which should always be an number.
    return new Promise<number>(resolve => resolve(highestUserId))

  }

  /**
   * 
   * Stores the language setting of a given user persistently.
   * 
   */
  public storeLanguage(userKey: string, language: string): void {

    // Updates the Firestore entry of the current user by the
    // newly adopted language setting.
    this.angularFirestore.doc(`users/${userKey}`).update({
      
      'key': userKey,
      'language': language
    
    })

  }

  public async getLanguage(userKey: string): Promise<string> {

    let language = 'english'

    // Checks whether the user_id stored at the user's browser
    // actually exists within the firestore database. This should
    // be always the case unless the user's entry has been explicitly
    // deleted from the database or the dataset got somehow corrupted.
    await this.angularFirestore.doc(`users/${userKey}`).get().toPromise().then(async user => {
      
      // Creates a new user.
      language = user.data().language 
    
    })

    return new Promise<string>(resolve => resolve(language))

  }

  /**
   * 
   * Stores the language setting of a given user persistently.
   * 
   */
  public storeDeviceType(deviceType: string): void {

    this.getCurrentUserKey().then(userKey => {
    
      // Updates the Firestore entry of the current user by the
      // newly adopted language setting.
      this.angularFirestore.doc(`users/${userKey}`).update({
        
        'key': userKey,
        'deviceType': deviceType
      
      })
    
    })

  }

  /**
   * 
   * Stores the language setting of a given user persistently.
   * 
   */
  public storeTutorial(tutorial: string): void {

    this.getCurrentUserKey().then(userKey => {

      this.angularFirestore.doc(`users/${userKey}`).update({
        
        'key': userKey,
        'tutorial': tutorial
      
      })

    })
    
  }



}