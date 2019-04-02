export class Performance {

    ///////////////
    // Variables //
    ///////////////
    public defeatedByGaps: number
    public defeatedByOpponentType1: number
    public defeatedByOpponentType2: number
    public defeatedByOpponentType3: number
    public score: number
    public time: number
    public progress: number
    public difficulty: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        
        defeatedByGaps: number, 
        defeatedByOpponentType1: number,
        defeatedByOpponentType2: number,
        defeatedByOpponentType3: number,
        score: number,
        time: number,
        progress: number,
        difficulty: number

    
    ) {

        this.defeatedByGaps = defeatedByGaps
        this.defeatedByOpponentType1 = defeatedByOpponentType1
        this.defeatedByOpponentType2 = defeatedByOpponentType2
        this.defeatedByOpponentType3 = defeatedByOpponentType3
        this.score = score,
        this.time = time,
        this.progress = progress,
        this.difficulty = difficulty

    }

    ///////////////
    // Functions //
    ///////////////
    public static fromObject(object: any): Performance {

        return new Performance(

            object['defeated_by_gaps'],
            object['defeated_by_opponent_type_1'],
            object['defeated_by_opponent_type_2'],
            object['defeated_by_opponent_type_3'],
            object['score'],
            object['time'],
            object['progress'],
            object['difficulty']

        )
        
    }

    public toObject(): object {

        return {
            'defeated_by_gaps': this.defeatedByGaps,
            'defeated_by_opponent_type_1': this.defeatedByOpponentType1,
            'defeated_by_opponent_type_2': this.defeatedByOpponentType2,
            'defeated_by_opponent_type_3': this.defeatedByOpponentType3,
            'score': this.score,
            'time': this.time,
            'progress': this.progress,
            'difficulty': this.difficulty
        }

    }
    
}