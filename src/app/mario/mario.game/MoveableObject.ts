/* MovableObject class
- goomba, koopa, enemies, Player, anything that moves/has lives

-virtual functions: move, draw

*/
import { DrawableObject } from './DrawableObject'

export class MovableObject {

	///////////////
	// Variables //
	///////////////
	public world
	public pos
	public velocity
	public lives

	//////////////////
	// Constructors //
	//////////////////
	public constructor(world, pos, velocity, lives) {
	
		this.world = world;
		this.pos = pos;
		this.velocity = velocity;
		this.lives = lives;
	
	}


}
