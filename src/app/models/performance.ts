import { PerformanceInterface } from "../interfaces/performance.interface";

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
    public static fromInterface(performanceInterface: PerformanceInterface): Performance {
        
        const performance: Performance = new Performance(
            
            performanceInterface.defeated_by_gaps, 
            performanceInterface.defeated_by_opponent_type_1,
            performanceInterface.defeated_by_opponent_type_2,
            performanceInterface.defeated_by_opponent_type_3,
            performanceInterface.score,
            performanceInterface.time,
            performanceInterface.progress,
            performanceInterface.difficulty,
            
        )

        return performance

    }
    
    public toInterface(): PerformanceInterface {

        const performanceInterface: PerformanceInterface = {

            'defeated_by_gaps': this.defeatedByGaps,
            'defeated_by_opponent_type_1': this.defeatedByOpponentType1,
            'defeated_by_opponent_type_2': this.defeatedByOpponentType2,
            'defeated_by_opponent_type_3': this.defeatedByOpponentType3,
            'score': this.score,
            'time': this.time,
            'progress': this.progress,
            'difficulty': this.difficulty
        }

        return performanceInterface

    }
    
}