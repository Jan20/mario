import { Level } from './level';
import { expect } from 'chai'
import { Samples } from '../test/samples'
import { LevelInterface } from '../interfaces/level.interface';

describe('Level Test', () => {


    it('toInterface() should return a LevelInterface Object', () => {

        const expectedResult: LevelInterface = Samples.sampleLevelInterface

        const result: LevelInterface = Samples.sampleLevel.toInterface()
        
        expect(result.toString()).to.equal(expectedResult.toString())
            
    })

    it('fromInterface() should result in an instance of class Level.', () => {

        const expectedResult: Level = Samples.sampleLevel
        
        const result: Level = Level.fromInterface(Samples.sampleLevelInterface)

        expect(result.toInterface().toString()).to.equal(expectedResult.toInterface().toString())

    })


})
