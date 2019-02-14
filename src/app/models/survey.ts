import { Performance } from '../models/performance'
import { firestore } from 'firebase';
import { Session } from './session';

export class Survey {

    ///////////////
    // Variables //
    ///////////////
    private fun_rank_01: string
    private fun_rank_02: string
    private fun_rank_03: string

    private challenge_rank_01: string
    private challenge_rank_02: string
    private challenge_rank_03: string

    private frustration_rank_01: string
    private frustration_rank_02: string
    private frustration_rank_03: string

    private perception_opponent_type_1
    private perception_opponent_type_2
    private perception_opponent_type_3
    private perception_wide_gaps
    private perception_number_of_opponents
    private perception_opponents_at_choke_points

    private age: string
    private gender: string

    private usage: string


    //////////////////
    // Constructors //
    //////////////////
    public constructor() {}

    ///////////////
    // Functions //
    ///////////////
    
    /**
     * 
     * @param fun_rank_01 
     * @param fun_rank_02 
     * @param fun_rank_03 
     */
    public storeFunRanking(fun_rank_01: string, fun_rank_02: string, fun_rank_03: string): void {

        this.fun_rank_01 = fun_rank_01
        this.fun_rank_02 = fun_rank_02
        this.fun_rank_03 = fun_rank_03

    } 

    /**
     * 
     * @param challenge_rank_01 
     * @param challenge_rank_02 
     * @param challenge_rank_03 
     */
    public storeChallengeRanking(challenge_rank_01: string, challenge_rank_02: string, challenge_rank_03: string): void {

        this.challenge_rank_01 = challenge_rank_01
        this.challenge_rank_02 = challenge_rank_02
        this.challenge_rank_03 = challenge_rank_03
    
    }

    /**
     * 
     * @param frustration_rank_01 
     * @param frustration_rank_02 
     * @param frustration_rank_03 
     */
    public storeFrustrationRanking(frustration_rank_01: string, frustration_rank_02: string, frustration_rank_03: string) {

        this.frustration_rank_01 = frustration_rank_01
        this.frustration_rank_02 = frustration_rank_02
        this.frustration_rank_03 = frustration_rank_03

    }

    public storePerception(

        perception_opponent_type_1,
        perception_opponent_type_2,
        perception_opponent_type_3,
        perception_wide_gaps,
        perception_number_of_opponents,
        perception_opponents_at_choke_points,

    ) {

        this.perception_opponent_type_1 = perception_opponent_type_1
        this.perception_opponent_type_2 = perception_opponent_type_2
        this.perception_opponent_type_3 = perception_opponent_type_3
        this.perception_wide_gaps = perception_wide_gaps
        this.perception_number_of_opponents = perception_number_of_opponents
        this.perception_opponents_at_choke_points = perception_opponents_at_choke_points

    }
    
    public storeDemographicInformation(

        age,
        gender

    ) {

        this.age = age
        this.gender = gender

    }

    public storeUsage(usage: string) {

        this.usage = usage

    }

    public toObject(): object {

        return {

            "fun_rank_01": this.fun_rank_01,
            "fun_rank_02": this.fun_rank_02,
            "fun_rank_03": this.fun_rank_03,

            "challenge_rank_01": this.challenge_rank_01,
            "challenge_rank_02": this.challenge_rank_02,
            "challenge_rank_03": this.challenge_rank_03,
            
            "frustration_rank_01": this.frustration_rank_01,
            "frustration_rank_02": this.frustration_rank_02,
            "frustration_rank_03": this.frustration_rank_03,

            "perception_opponent_type_1": this.perception_opponent_type_1,
            "perception_opponent_type_2": this.perception_opponent_type_2,
            "perception_opponent_type_3": this.perception_opponent_type_3,
            "perception_wide_gaps": this.perception_wide_gaps,
            "perception_number_of_opponents": this.perception_number_of_opponents,
            "perception_opponents_at_choke_points": this.perception_opponents_at_choke_points,

            "age: string": this.age,
            "gender: string": this.gender,

            "usage: string": this.usage

        }

    }
    
}