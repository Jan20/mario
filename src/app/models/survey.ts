import { Performance } from '../models/performance'
import { firestore } from 'firebase';
import { Session } from './session';

export class Survey {

    ///////////////
    // Variables //
    ///////////////
    private fun_rank_01: string
    private fun_rank_02: string

    private challenge_rank_01: string
    private challenge_rank_02: string

    private preferred_challenge_level: number

    private perception_number_of_opponents: string
    private perception_opponents_next_to_each_other: string
    private perception_opponents_at_choke_points: string

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
     */
    public storeFunRanking(fun_rank_01: string, fun_rank_02: string): void {

        this.fun_rank_01 = fun_rank_01
        this.fun_rank_02 = fun_rank_02

    } 
    
    /**
     * 
     * @param challenge_rank_01 
     * @param challenge_rank_02 
     */
    public storeChallengeRanking(challenge_rank_01: string, challenge_rank_02: string) {

        this.challenge_rank_01 = challenge_rank_01
        this.challenge_rank_02 = challenge_rank_02

    }

    /**
     * 
     * @param preferredChallengeLevel 
     */
    public storePreferedChallengeLevel(preferredChallengeLevel): void {

        this.preferred_challenge_level = preferredChallengeLevel
    
    }
    
    public storePerceptionOfNumberOfOpponents(perception_number_of_opponents: string): void {

        this.perception_number_of_opponents = perception_number_of_opponents

    }

    public storePerceptionOfOpponentsNextToEachOther(perception_opponents_next_to_each_other: string): void {
 
        this.perception_opponents_next_to_each_other = perception_opponents_next_to_each_other

    }

    public storePerceptionOfOpponentsAtChokePoints(perception_opponents_at_choke_points: string): void {

        this.perception_opponents_at_choke_points = perception_opponents_at_choke_points

    }

    public storeAge(age: string): void  {

        this.age = age
    
    }

    public storeGender(gender: string): void {

        this.gender = gender

    }

    public storeUsage(usage: string) {

        this.usage = usage

    }

    public toObject(): object {

        return {

            "fun_rank_01": this.fun_rank_01,
            "fun_rank_02": this.fun_rank_02,

            "challenge_rank_01": this.challenge_rank_01,
            "challenge_rank_02": this.challenge_rank_02,
            
            "prefered_challenge_level": this.preferred_challenge_level,

            "perception_number_of_opponents": this.perception_number_of_opponents,
            "perception_opponents_next_to_each_other": this.perception_opponents_next_to_each_other,
            "perception_opponents_at_choke_points": this.perception_opponents_at_choke_points,

            "age: string": this.age,
            "gender: string": this.gender,

            "usage: string": this.usage

        }

    }
    
}