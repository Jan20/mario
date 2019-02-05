import { User } from "../models/user";
import { Performance } from '../models/performance'
import { Level } from "../models/level";
import { Session } from "../models/session";
import { LevelInterface } from "../interfaces/level.interface";
import { firestore } from "firebase";

/**
*
* For test purposes only
*
*/
export class Samples {

    public static sampleUser: User = new User(
        
        'user_042',
        42
        
    )

    public static samplePerformance: Performance = new Performance(
        
        1, 
        1, 
        1, 
        0, 
        0,
        0,
        0,
        0
    
    )
    
    public static sampleSession: Session = new Session(
        
        'session_042', 
        42, 
        'created', 
        firestore.Timestamp.fromDate(new Date()),
        Samples.samplePerformance,
        
    )
    
    public static sampleLevel: Level = new Level(
    
            'level_01', 
            1,
            [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.','.'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], 
            ['.','.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'D', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'B'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'D'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'S', 'S', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.','.', 'D'], 
            ['.', 'X', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'D'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'S', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'C', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'D'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'B', 'B', 'B', 'B', '.', '.', '.', '.', '.', '.', '.', '.', 'D', '.', '.', '.', '.', '.', '.', 'D'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'C', '.', '.', '.', '.', '.', 'C', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'D', 'D', '.', '.', '.', '.', '.', '.', 'D'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'B', '.', 'B', 'B', 'B', 'B', 'B', 'B', '.', '.', '.', 'D', 'D', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'D', 'D', 'D', '.', '.', '.', '.', '.', '.', 'D'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'D', 'D', '.', '.', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', '.', 'D', 'D', 'D', 'D', '.', '.', '.', '.','.', '.', 'D'], 
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'D', 'D','.', '.', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', 'D', 'D', 'D', 'D', 'D', '.', '.', '.', '.', '.', '.', 'D'], 
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', '.', '.', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '.', '.', 'Z', 'Z', 'Z', 'D', 'D']]
            
    
    )

    public static sampleLevelInterface: LevelInterface = {

        'key': 'level_01', 
        'id': 1,
        'line_00': '...................................................',
        'line_01': '...................................................',
        'line_02': '.,.................................................',
        'line_03': '..................................D...............',
        'line_04': '.................................................B',
        'line_05': '.................................................D',
        'line_06': '...............................SS...............,.D',
        'line_07': '.X......................,.........................D',
        'line_08': '...............S..............C..................D',
        'line_09': '..............................BBBB........D......D',
        'line_10': '...............C.....C...................DD......D',
        'line_11': '..........B.BBBBBB...DD.................DDD......D',
        'line_12': '.....................DD...XXXXXXXXXXX..DDDD....,..D',
        'line_13': '.....................DD,...XXXXXXXXXXX.DDDDD......D',
        'line_14': 'XXXXXXXXXXXXXXXXXXXXXXX...XXXXXXXXXXXXXXXXX..ZZZDD',
        
    }
    
    
}