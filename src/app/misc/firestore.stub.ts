import { BehaviorSubject } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";

// const users: UserInterface[][] = [[
//   { key: 'user_001', id: 1},
//   { key: 'user_002', id: 2},
//   { key: 'user_003', id: 3}
// ]];

import { Observable } from 'rxjs';

const testUsers: UserInterface[][] = [[
  { key: 'user_001', id: 1},
  { key: 'user_002', id: 2},
  { key: 'user_003', id: 3}
]];

const users = Observable.create(testUsers)

export const FirestoreStub = {



  
  collection: () => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      get: () => {
        console.log('H-______________________safasdf_________________________________________________________________________')

        new Promise(resolve => resolve(users))
  
      }
    }),
    get: () => ({

      toPromise: () => ({

        then: () => ({

          forEach: () => { 
            
            console.log('H-_______________________________________________________________________________________________')

            return new Promise(resolve => resolve(users))
            
          }

        })

      })

    })
  }),

  doc: (user: UserInterface) => ({
    
    get: () => ({

      toPromise: () => ({

        then: () => ({

          forEach: () => { 
            console.log('H-______________________safasdf_____________________________________________fasdfasdfas__________________asdfasd__________')

            return new Promise(resolve => resolve(users))

          }

        })

      })

    }),    
    set: () => {}
    
    // new Promise(resolve => resolve({key: 'user_042', id: 42}))

  })
};