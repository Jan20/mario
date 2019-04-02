export class Level {

    ///////////////
    // Variables //
    ///////////////
    public key: string
    public id: number
    public representation: string[][]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(key: string, id: number, representation: string[][]) {

        this.key = key
        this.id = id
        this.representation = representation

    }

    ///////////////
    // Functions //
    ///////////////
    public static fromDocumentSnapshot(result: firebase.firestore.DocumentSnapshot): Level {
        
        return new Level(

            result.data().key,
            result.data().id,
            [
              Array.from(result.data().line_00),
              Array.from(result.data().line_01),
              Array.from(result.data().line_02),
              Array.from(result.data().line_03),
              Array.from(result.data().line_04),
              Array.from(result.data().line_05),
              Array.from(result.data().line_06),
              Array.from(result.data().line_07),
              Array.from(result.data().line_08),
              Array.from(result.data().line_09),
              Array.from(result.data().line_10),
              Array.from(result.data().line_11),
              Array.from(result.data().line_12),
              Array.from(result.data().line_13),
              Array.from(result.data().line_14)
            ]
    
        )
    }

    public toObject(): Object {

        return {

            'key': this.key,
            'id': this.id,
            'line_00': this.representation[0].join(''),
            'line_01': this.representation[1].join(''),
            'line_02': this.representation[2].join(''),
            'line_03': this.representation[3].join(''),
            'line_04': this.representation[4].join(''),
            'line_05': this.representation[5].join(''),
            'line_06': this.representation[6].join(''),
            'line_07': this.representation[7].join(''),
            'line_08': this.representation[8].join(''),
            'line_09': this.representation[9].join(''),
            'line_10': this.representation[10].join(''),
            'line_11': this.representation[11].join(''),
            'line_12': this.representation[12].join(''),
            'line_13': this.representation[13].join(''),
            'line_14': this.representation[14].join('')

        }

    }

}