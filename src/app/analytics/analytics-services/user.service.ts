import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
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
   * 
   * 
   */
  public async checkUserStatus(): Promise<string> {

    if (localStorage.getItem('userId') === null) {

      await this.createUser()

    }
    
    return localStorage.getItem('userId')

  }

  /**
   * 
   * 
   * 
   */
  private async createUser(): Promise<void> {

    let highestUserId = await this.getHighestUserId() + 1

    if (highestUserId < 10) {

      await this.angularFirestore.collection(`users`).doc('user00' + highestUserId).set({id: highestUserId})
      localStorage.setItem('userId', 'user00' + highestUserId)
      return 
    
    } 

    if (highestUserId < 100) {

      await this.angularFirestore.collection(`users`).doc('user0' + highestUserId).set({id: highestUserId})
      localStorage.setItem('userId', 'user0' + highestUserId)
      return 
    
    }

    await this.angularFirestore.collection(`users`).doc('user' + highestUserId).set({id: highestUserId})
    localStorage.setItem('userId', 'user' + highestUserId)
    return

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
   */
  public async updateUser(user: User): Promise<any> {

    console.log(user)
    const uid = user.getId()
    let userId: string
    if (uid < 10) { userId = 'user00' + uid}
    if (uid > 9 && uid < 100) { userId = 'user0' + uid}
    if (uid > 99) { userId = 'user' + uid}

    await this.angularFirestore.doc<User>(`users/${userId}`).set({

      'id': user.getId()
      'dealths': user.getDealths()

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
