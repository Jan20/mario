import { LevelInterface } from '../interfaces/level.interface'

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
    public static fromInterface(levelInterface: LevelInterface): Level {
      
        const representation: string[][] = [
            
            levelInterface.line_00,
            levelInterface.line_01,
            levelInterface.line_02,
            levelInterface.line_03,
            levelInterface.line_04,
            levelInterface.line_05,
            levelInterface.line_06,
            levelInterface.line_07,
            levelInterface.line_08,
            levelInterface.line_09,
            levelInterface.line_10,
            levelInterface.line_11,
            levelInterface.line_12,
            levelInterface.line_13,
            levelInterface.line_14,
        
        ]

        return new Level(levelInterface.key, levelInterface.id, representation)

    }
    
    public toInterface(): LevelInterface {

        const levelInterface: LevelInterface = {

            'key': this.key,
            'id': this.id,
            'line_00': this.representation[0],
            'line_01': this.representation[1],
            'line_02': this.representation[2],
            'line_03': this.representation[3],
            'line_04': this.representation[4],
            'line_05': this.representation[5],
            'line_06': this.representation[6],
            'line_07': this.representation[7],
            'line_08': this.representation[8],
            'line_09': this.representation[9],
            'line_10': this.representation[10],
            'line_11': this.representation[11],
            'line_12': this.representation[12],
            'line_13': this.representation[13],
            'line_14': this.representation[14]

        }

        return levelInterface

    }

}