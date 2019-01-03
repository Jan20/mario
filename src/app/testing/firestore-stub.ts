import { BehaviorSubject } from "rxjs";
import { resolve } from "url";

export const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      get: () => {

        new Promise(resolve => resolve({}))
  
      }
    }),
    get: () => {

      new Promise(resolve => resolve())

    }
  }),
};