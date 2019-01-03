import { Level } from './level';
import { expect } from 'chai'

describe('Level Test', () => {

    it('toObject() should result in an serialized level object.', () => {

        const level: Level = new Level([
        
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.']

        ])

        const correctObject: string = JSON.stringify({ 
            
            key: 'level_00',
            id: 0,
            line_00: ['.', '.', '.', '.'],
            line_01: ['.', '.', '.', '.'],
            line_02: ['.', '.', '.', '.'],
            line_03: ['.', '.', '.', '.'],
            line_04: ['.', '.', '.', '.'],
            line_05: ['.', '.', '.', '.'],
            line_06: ['.', '.', '.', '.'],
            line_07: ['.', '.', '.', '.'],
            line_08: ['.', '.', '.', '.'],
            line_09: ['.', '.', '.', '.'],
            line_10: ['.', '.', '.', '.'],
            line_11: ['.', '.', '.', '.']
        
        })

        const objectUnderScrutiny: string = JSON.stringify(level.toObject('level_00', 0))

        expect(objectUnderScrutiny).to.equal(correctObject)
            
    })

})
