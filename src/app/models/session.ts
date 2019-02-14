import { Performance } from '../models/performance'
import { firestore } from 'firebase';

export class Session {

    ///////////////
    // Variables //
    ///////////////
    public key: string
    public id: number
    public status: string
    public timestamp: firestore.Timestamp
    public performance: Performance

    //////////////////
    // Constructors //
    //////////////////
    public constructor(key: string, id: number, status: string, timestamp: firestore.Timestamp, performance: Performance) {

        this.key = key
        this.id = id
        this.status = status
        this.timestamp = timestamp
        this.performance = performance

    }

    public static fromObject(object: Object, performance: Performance): Session {

        return new Session(

           object['key'], 
           object['id'], 
           object['status'], 
           object['timestamp'],
           performance

        )

    }

    public toObject(): object {

        return {

            "key": this.key,
            "id": this.id,
            "status": this.status,
            "timestamp": this.timestamp

        }

    }
    
}