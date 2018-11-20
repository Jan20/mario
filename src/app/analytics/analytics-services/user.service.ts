import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../analytics-models/user'

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
  public async getCurrentUserId(): Promise<string> {
    
    // Retrieves a user id from the localStorage.
    // If no 'userId' can be found, the variable
    // should be null.
    let userKey: string = localStorage.getItem('userKey')

    // If no userId has been stored in the user's 
    // browser, a new user is created at the firestore
    // database and a reference set to the userId variable.
    if (userKey === undefined || userKey === null) {

      userKey = await this.createUser()
      
    }

    // Checks whether the userId stored at the user's browser
    // actually exists within the firestore database. This should
    // be always the case unless the user's entry has been explicitly
    // deleted from the database or the dataset got somehow corrupted.
    await this.angularFirestore.collection(`users`).doc(userKey).get().toPromise().then(async user => {

      user.data() === undefined ? userKey = await this.createUser() : null

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
  private async createUser(): Promise<string> {

    // Fetches the highest existing user id and
    // increases the value by one. This should
    // ensure that a user id is not used twice
    // throughtout the experiment.
    const id: number = await this.getHighestUserId() + 1

    // Constructs a key value for storing a new
    // user at firestore. The key should look
    // like 'user001'.
    const user = new User(id)

    // Creates a new entry at Firestore that 
    // corresponds to the newly created user key.
    await this.angularFirestore.collection(`users`).doc(user.getKey()).set({id: user.getId()})

    // Sets a key-value-pair for the newly created
    // user key at the user's localStorage.
    localStorage.setItem('userKey', user.getKey())

    // Returns a promise pointing to the just
    // created userKey.
    return new Promise<string>(resolve => resolve(user.getKey()))

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
    await this.angularFirestore.collection<User>(`users`).get().toPromise().then(users => {
      
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


  /////////////
  // Getters //
  /////////////
  // /**
  //  * 
  //  * 
  //  * @param userId 
  //  * 
  //  */
  // public async getUser(userId: string): Promise<User> {

  //   console.log(userId)
  //   let result: User

  //   await this.angularFirestore.doc<any>(`users/${userId}`).get().toPromise().then(user => {
  //     console.log(user.data())
  //     result = new User(parseInt(user.data().id))
    
  //   }) 
    
  //   return new Promise<User>(resolve => resolve(result))  
  
  // }

  /**
   * 
   * 
   * 
   */
  public async getUsers(): Promise<User[]> {
    
    let userArray: User[] = []

    await this.angularFirestore.collection<any>(`users`).get().toPromise().then(users => {
      
      users.docs.forEach(user => userArray.push(new User(parseInt(user.data().id))))

    })

    console.log(userArray)
    return new Promise<User[]>(resolve => resolve(userArray))
    
  }

}
