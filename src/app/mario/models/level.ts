export class Level {

    ///////////////
    // Variables //
    ///////////////
    private representation: string[][]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(representation: string[][]) {

        this.representation = representation

    }

    ///////////////
    // Functions //
    ///////////////
    public toObject() {

        let object = {}

        for (let i = 0; i < this.representation.length; i++) {

            if (i < 10) {

                object['line_0' + i] = this.representation[i]
                
            } else {

                object['line_' + i] = this.representation[i]

            }


        }

        return object

    }

    /////////////
    // Getters //
    /////////////
    getRepresentation(): string[][] {

        return this.representation

    }

    /////////////
    // Setters //
    /////////////
    setRepresentation(representation: string[][]) {

        this.representation = representation

    }
}