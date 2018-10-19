export class Vec3 {
    slice(arg0: number): any {
        throw new Error("Method not implemented.");
    }

    ///////////////
    // Variables //
    ///////////////
    private vec3: [number, number, number]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(arg1: number, arg2: number, arg3: number) {

        this.vec3 = [arg1, arg2, arg3]

    }

    /////////////
    // Getters //
    /////////////
    public getVec3(): [number, number, number] {

        return this.vec3

    }

    /////////////
    // Getters //
    /////////////
    public setVec3(arg1: number, arg2: number, arg3: number) {

        this.vec3 = [arg1, arg2, arg3]

    }

}
