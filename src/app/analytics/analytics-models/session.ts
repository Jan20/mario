export class Session {

    ///////////////
    // Variables //
    ///////////////
    private sessionId: number
    public totalDeaths: number
    public deathsThroughOpponents: number
    public deathsThroughGaps: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor() {

        this.totalDeaths = 0
        this.deathsThroughOpponents = 0
        this.deathsThroughGaps = 0

    }

    /////////////
    // Getters //
    /////////////
    public getSessionId(): number {

        return this.sessionId

    }

    public getTotalDeaths(): number {

        return this.totalDeaths

    }

    public getDeathsThroughOpponents(): number {

        return this.deathsThroughOpponents

    }

    public getDeathsThroughGaps(): number {

        return this.deathsThroughGaps

    }


    /////////////
    // Setters //
    /////////////
    public setSessionId(sessionId: number): void {

        this.sessionId = sessionId

    }
    
    public setTotalDeaths(totalDeaths: number): void {

        this.totalDeaths = totalDeaths
        console.log('############## DEALTH COUNT ############')
        console.log(totalDeaths)

    }

    public setDeathsThroughOpponents(deathsThroughOpponents: number): void {

        this.deathsThroughOpponents = deathsThroughOpponents

    }

    public setDeathsThroughGaps(deathsThroughGaps: number): void {

        this.deathsThroughGaps = deathsThroughGaps

    }

}