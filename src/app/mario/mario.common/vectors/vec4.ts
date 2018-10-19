export class Vec4 {

    ///////////////
    // Variables //
    ///////////////
    private vec4: [number, number, number, number]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(arg1: number, arg2: number, arg3: number, arg4: number) {

        this.vec4 = [arg1, arg2, arg3, arg4]

    }

    /////////////
    // Getters //
    /////////////
    public getVec4(): [number, number, number, number] {

        return this.vec4

    }

    /////////////
    // Getters //
    /////////////
    public setVec4(arg1: number, arg2: number, arg3: number, arg4: number) {

        this.vec4 = [arg1, arg2, arg3, arg4]

    }

}
