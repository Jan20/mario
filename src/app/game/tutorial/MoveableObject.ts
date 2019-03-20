import { World } from "./world";
import { GameService } from "../game.service";

/* MovableObject class
- goomba, koopa, enemies, Player, anything that moves/has lives

-virtual functions: move, draw

*/

export class MovableObject {

	///////////////
	// Variables //
	///////////////
	public world: World
	public pos: number[]
	public velocity: number[]
	public lives: number

	//////////////////
	// Constructors //
	//////////////////
	public constructor(gameService: GameService, pos: number[], velocity: number[], lives: number) {
	
		this.world = gameService.GAMEWORLD
		this.pos = pos
		this.velocity = velocity
		this.lives = lives
	
	}


}
