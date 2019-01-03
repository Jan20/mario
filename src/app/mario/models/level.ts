import { SerializedLevel } from "../interfaces/serialized-level";

export class Level{

    ///////////////
    // Variables //
    ///////////////
    public key: string
    public id: number
    public representation: string[][]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(key?: string, id?: number, representation?: string[][], serializedLevel?: SerializedLevel) {

        this.key = key
        this.id = id
        this.representation = representation

        if (serializedLevel === undefined) {

            return

        }

        this.key = serializedLevel.key
        this.id = serializedLevel.id

        this.representation = [
            
            serializedLevel.line_00,
            serializedLevel.line_01,
            serializedLevel.line_02,
            serializedLevel.line_03,
            serializedLevel.line_04,
            serializedLevel.line_05,
            serializedLevel.line_06,
            serializedLevel.line_07,
            serializedLevel.line_08,
            serializedLevel.line_09,
            serializedLevel.line_10,
            serializedLevel.line_11,
            serializedLevel.line_12,
            serializedLevel.line_13,
            serializedLevel.line_14,
        
        ]
            
    }

    ///////////////
    // Functions //
    ///////////////
    public toObject(): SerializedLevel {

        let object: SerializedLevel = {

            key: this.key,
            id: this.id

        }

        for (let i = 0; i < this.representation.length; i++) {

            if (i < 10) {

                object['line_0' + i] = this.representation[i]
                
            } else {

                object['line_' + i] = this.representation[i]

            }


        }

        return object

    }

}