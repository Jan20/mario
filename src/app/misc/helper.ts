export class Helper {

    /**
     * 
     * Helper function to convert an id stored
     * as a number to a string like id: 1 => 'user001' or
     * id: 45 => 'session045'
     * 
     * @param keyWord: keyword like 'session' or 'user'
     * @param id: An user id as a number
     * 
     */
    public static generateKey(keyWord: string, id: number): string {

        // Checks wether the user id is smaller than
        // ten leading to a result like 'user004'.
        if (id < 10) return `${keyWord}_00${id}`

        // If the user id is smaller than 100, a user
        // key like 'user095' should be returned.
        if (id < 100) return `${keyWord}_0${id}`

        // By default, an generic user key should
        // be returned. 
        return `${keyWord}_${id}`

    }

    /**
     * 
     * @param input 
     */
    public static buildSixDigitNumber(input: number): string {
        
        if (input < 10) return `0000${input}`
        if (input < 100) return `000${input}`
        if (input < 1000) return `00${input}`
        if (input < 10000) return `0${input}`
        
        return `${input}`

    }

}
