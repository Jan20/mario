export class Vec2 {

    ///////////////
    // Variables //
    ///////////////
    private vec2: [number, number]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(arg1: number, arg2: number) {

        this.vec2 = [arg1, arg2]

    }

    /////////////
    // Getters //
    /////////////
    public getVec2(): [number, number] {

        return this.vec2

    }

    /////////////
    // Getters //
    /////////////
    public setVec2(arg1: number, arg2: number) {

        this.vec2 = [arg1, arg2]

    }

}
