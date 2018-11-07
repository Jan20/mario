/* MovableObject class
- goomba, koopa, enemies, Player, anything that moves/has lives

-virtual functions: move, draw

*/
import { World } from './World';

export class MovableObject {

	///////////////
	// Variables //
	///////////////
	public world: World
	public pos: number[]
	public velocity: [number, number]
	public lives: number

	//////////////////
	// Constructors //
	//////////////////
	public constructor(world, pos, velocity, lives) {
	
		this.world = world
		this.pos = pos
		this.velocity = velocity
		this.lives = lives
	
	}


}
