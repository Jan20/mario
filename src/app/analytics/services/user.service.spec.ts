import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/app/misc/firestore.stub';
import { SessionService } from './session.service';

describe('UserService', () => {

  beforeEach(() => TestBed.configureTestingModule({

    providers: [
    
      { provide: AngularFirestore, useValue: FirestoreStub }
    
    ],


  }));

  it('deleteAllUsers() should delete all users stored at Firestore', async () => {

    const userService: UserService = TestBed.get(UserService)

    userService.deleteUsers()

    const result: string[] = await userService.getUserKeys()

    const expectedResult: string[] = [] 

    expect(result).toBe(expectedResult)

  })

  it('should be created', () => {

    const service: UserService = TestBed.get(UserService)
    expect(service).toBeTruthy()
  
  })

  

});
