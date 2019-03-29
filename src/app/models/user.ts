export class User {

    ///////////////
    // Variables //
    ///////////////
    public key: string
    public id: number
    public language: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(key: string, id: number, language: string) {

        this.key = key
        this.id = id
        this.language = language

    }

    ///////////////
    // Functions //
    ///////////////
    public toObject(): Object {

        return {
            
            'key': this.key,
            'id': this.id,
            'language': this.language
        }

    }
    
}