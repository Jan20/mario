export class User {

    ///////////////
    // Variables //
    ///////////////
    public key: string
    public id: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(key: string, id: number) {

        this.key = key
        this.id = id

    }

    ///////////////
    // Functions //
    ///////////////
    public toObject(): Object {

        return {
            
            'key': this.key,
            'id': this.id,
        }

    }
    
}