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
   * TODO: Check whether localStorage is available
   * 
   */
  public async getCurrentUserId(): Promise<string> {
    
    console.log('userId')
    console.log(localStorage.getItem('userId'))

    let userId: string

    if (localStorage.getItem('userId') === undefined || localStorage.getItem('userId') === null) {

      userId = await this.createUser()
      
    } else {

      userId = localStorage.getItem('userId')
      
    }

    return new Promise<string>(async resolve => resolve(userId))

  }

  /**
   * 
   * Creates a new 
   * 
   */
  private async createUser(): Promise<string> {

    let highestUserId = await this.getHighestUserId() + 1
    console.log(highestUserId)
    let userId: string

    if (highestUserId < 10)                       userId = 'user00' + highestUserId
    if (highestUserId > 9 && highestUserId < 100) userId = 'user0' + highestUserId
    if (highestUserId > 99)                       userId = 'user' + highestUserId

    await this.angularFirestore.collection(`users`).doc(userId).set({id: highestUserId})
    localStorage.setItem('userId', userId)

    console.log('user has been created')
    return new Promise<string>(resolve => resolve(userId))

  }

  /**
   * 
   * 
   * 
   */
  private async getHighestUserId(): Promise<number> {
    
    let highestId: number = 0

    await this.angularFirestore.collection<any>(`users`).get().toPromise().then(async users => {
      
      await users.docs.forEach(user => (parseInt(user.data().id) > highestId ? highestId = parseInt(user.data().id) : null))

    })

    return new Promise<number>(resolve => resolve(highestId))

  }

  /**
   * 
   * @param user 
   * 
   */
  public async updateUser(user: User): Promise<any> {

    console.log(user)
    const uid = user.getId()
    let userId: string
    if (uid < 10) { userId = 'user00' + uid}
    if (uid > 9 && uid < 100) { userId = 'user0' + uid}
    if (uid > 99) { userId = 'user' + uid}

    await this.angularFirestore.doc<any>(`users/${userId}`).set({

      'id': user.getId(),
      'dealths': user.getDeaths()

    })

  }


  /////////////
  // Getters //
  /////////////
  /**
   * 
   * 
   * @param userId 
   * 
   */
  public async getUser(userId: string): Promise<User> {

    console.log(userId)
    let result: User

    await this.angularFirestore.doc<any>(`users/${userId}`).get().toPromise().then(user => {
      console.log(user.data())
      result = new User(parseInt(user.data().id))
    
    }) 
    
    return new Promise<User>(resolve => resolve(result))  
  
  }

  /**
   * 
   * 
   * 
   */
  public async getUsers(): Promise<any> {
    
    let result: User[] = []

    await this.angularFirestore.collection<any>(`users`).get().toPromise().then(async users => {
      
      await users.docs.forEach(user => result.push(new User(parseInt(user.data().id))))

    })

    return new Promise<User[]>(resolve => resolve(result))
    
  }

}
