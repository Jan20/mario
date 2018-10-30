export class User {

    ///////////////////
    // Variables //////
    ///////////////////
    private id: number
    private deaths: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(id: number) {

        this.id = id

    }

    /////////////
    // Getters //
    /////////////
    public getId(): number {

        return this.id

    }

    public getDeaths(): number {

        return this.deaths

    }

    /////////////
    // Setters //
    /////////////
    public setDeaths(deaths: number): void {

        this.deaths = deaths

    }



}