export class GameplayData {

    ///////////////
    // Variables //
    ///////////////
    private totalDeaths: number
    private deathsThroughOpponents: number
    private deathsThroughGaps: number

    //////////////////w
    // Constructors //
    //////////////////
    public constructor(
        
        totalDeaths?: number,
        deathsThroughOpponents? : number,
        deathsThroughGaps?: number    
        
    ) {

        this.totalDeaths = (totalDeaths !== undefined) ? totalDeaths : 0
        this.deathsThroughOpponents = (deathsThroughOpponents !== undefined) ? deathsThroughOpponents : 0
        this.deathsThroughGaps = (deathsThroughGaps !== undefined) ? deathsThroughGaps : 0

    }

    /////////////
    // Getters //
    /////////////
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
    public setTotalDeaths(totalDeaths: number): void {

        this.totalDeaths = totalDeaths
 
    }

    public setDeathsThroughOpponents(deathsThroughOpponents: number): void {

        this.deathsThroughOpponents = deathsThroughOpponents

    }

    public setDeathsThroughGaps(deathsThroughGaps: number): void {

        this.deathsThroughGaps = deathsThroughGaps

    }




}