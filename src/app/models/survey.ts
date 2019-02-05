import { Performance } from '../models/performance'
import { firestore } from 'firebase';
import { Session } from './session';

export class Survey {

    ///////////////
    // Variables //
    ///////////////
    public age: string
    public gender: string


    //////////////////
    // Constructors //
    //////////////////
    public constructor(age: string, gender: string) {

        this.age = age
        this.gender = gender

    }

    // public static fromObject(object: any, performance: Performance): Session {

    //     return new Session(

    //        object['key'], 
    //        object['id'], 
    //        object['status'], 
    //        object['timestamp'],
    //        performance

    //     )

    // }

    // public toObject(): object {

    //     return {

    //         "key": this.key,
    //         "id": this.id,
    //         "status": this.status,
    //         "timestamp": this.timestamp

    //     }

    // }
    
}