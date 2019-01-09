import { PerformanceInterface } from "./performance.interface";

export interface SessionInterface {
    
    key: string
    id: number
    data: {

        performance: PerformanceInterface

    }

}
