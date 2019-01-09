import { PerformanceInterface } from "../interfaces/performance.interface";

export class Performance {

    ///////////////
    // Variables //
    ///////////////
    public defeatedByGaps: number
    public defeatedByOpponentType1: number
    public defeatedByOpponentType2: number
    public defeatedByOpponentType3: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        
        defeatedByGaps: number, 
        defeatedByOpponentType1: number,
        defeatedByOpponentType2: number,
        defeatedByOpponentType3: number
    
    ) {

        this.defeatedByGaps = defeatedByGaps
        this.defeatedByOpponentType1 = defeatedByOpponentType1
        this.defeatedByOpponentType2 = defeatedByOpponentType2
        this.defeatedByOpponentType3 = defeatedByOpponentType3

    }

    ///////////////
    // Functions //
    ///////////////
    public static fromInterface(performanceInterface: PerformanceInterface): Performance {
        
        const performance: Performance = new Performance(
            
            performanceInterface.defeated_by_gaps, 
            performanceInterface.defeated_by_opponent_type_1,
            performanceInterface.defeated_by_opponent_type_2,
            performanceInterface.defeated_by_opponent_type_3

        )

        return performance

    }
    
    public toInterface(): PerformanceInterface {

        const performanceInterface: PerformanceInterface = {

            'defeated_by_gaps': this.defeatedByGaps,
            'defeated_by_opponent_type_1': this.defeatedByOpponentType1,
            'defeated_by_opponent_type_2': this.defeatedByOpponentType2,
            'defeated_by_opponent_type_3': this.defeatedByOpponentType3,
        
        }

        return performanceInterface

    }
    
}