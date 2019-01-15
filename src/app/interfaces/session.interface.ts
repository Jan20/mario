import { PerformanceInterface } from "./performance.interface";

export interface SessionInterface {
    
    key: string
    id: number
    status: string
    data: {

        performance: PerformanceInterface

    }

}
