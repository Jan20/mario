import { SessionInterface } from "../interfaces/session.interface";
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

    ///////////////
    // Functions //
    ///////////////
    public static fromInterface(sessionInterface: SessionInterface): Session {

        const performance: Performance = new Performance(

            sessionInterface.data.performance.defeated_by_gaps,
            sessionInterface.data.performance.defeated_by_opponent_type_1,
            sessionInterface.data.performance.defeated_by_opponent_type_2,
            sessionInterface.data.performance.defeated_by_opponent_type_3


        )
      
        return new Session(sessionInterface.key, sessionInterface.id, sessionInterface.status, performance)

    }
    
    public toInterface(): SessionInterface {

        const sessionInterface: SessionInterface = {

            'key': this.key,
            'id': this.id,
            'status': this.status,
            'data': {

                'performance': {

                    'defeated_by_gaps': this.performance.defeatedByGaps,
                    'defeated_by_opponent_type_1': this.performance.defeatedByOpponentType1,
                    'defeated_by_opponent_type_2': this.performance.defeatedByOpponentType2,
                    'defeated_by_opponent_type_3': this.performance.defeatedByOpponentType3
    
                }    
            
            }
        }

        return sessionInterface

    }
    
}