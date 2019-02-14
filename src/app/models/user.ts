import { UserInterface } from "../interfaces/user.interface";

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
    public static fromInterface(userInterface: UserInterface): User {
      
        return new User(userInterface.key, userInterface.id)

    }
    
    public toInterface(): UserInterface {

        const userInterface: UserInterface = {

            'key': this.key,
            'id': this.id,
        }

        return userInterface

    }

    public toObject(): Object {

        return {
            
            'key': this.key,
            'id': this.id,
        }

    }
    
}