import { BehaviorSubject } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";

const users: UserInterface[] = [
  {'key': 'user_042', 'id': 42},
  {'key': 'user_043', 'id': 43},
  {'key': 'user_044', 'id': 44}
]

export const FirestoreStub = {
  
  
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      get: () => {

        new Promise(resolve => resolve({'user_key': 'user_042', 'id': 42}))
  
      }
    }),
    get: () => ({

      toPromise: () => ({

        then: () => ({

          forEach: () => { return users}

        })

      })

    })
  }),

  doc: (user: UserInterface) => ({
    
    get: () => ({

      toPromise: () => ({

        then: () => ({

          forEach: () => { return users}

        })

      })

    }),    
    set: () => {}
    
    // new Promise(resolve => resolve({key: 'user_042', id: 42}))

  })
};