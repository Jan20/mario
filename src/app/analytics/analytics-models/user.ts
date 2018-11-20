export class User {

    ///////////////////
    // Variables //////
    ///////////////////
    private key: string
    private id: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(id: number) {

        this.key = this.generateKey(id)
        this.id = id

    }

    ///////////////
    // Functions //
    ///////////////

    /**
     * 
     * Helper function to convert a user id stored
     * as a number to a string like id:1 => 'user001'.
     * 
     * @param userId: An user id as a number
     * 
     */
    private generateKey(userId: number): string {

        // Checks wether the user id is smaller than
        // ten leading to a result like 'user004'.
        if (userId < 10) return `user00${userId}`

        // If the user id is smaller than 100, a user
        // key like 'user095' should be returned.
        if (userId < 100) return `user0${userId}`

        // By default, an generic user key should
        // be returned. 
        return `user${userId}`

    }

    /////////////
    // Getters //
    /////////////
    public getKey(): string {

        return this.key

    }

    public getId(): number {

        return this.id

    }

}