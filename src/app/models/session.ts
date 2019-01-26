import { Performance } from '../models/performance'

export class Session {

    ///////////////
    // Variables //
    ///////////////
    public key: string
    public id: number
    public status: string
    public performance: Performance

    //////////////////
    // Constructors //
    //////////////////
    public constructor(key: string, id: number, status: string, performance: Performance) {

        this.key = key
        this.id = id
        this.status = status
        this.performance = performance

    }

    public toInterface(): object {

        return {

            "key": this.key,
            "id": this.id,
            "status": this.status

        }

    }
    
}