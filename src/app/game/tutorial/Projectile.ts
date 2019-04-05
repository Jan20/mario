import { GameService } from "../game.service";
import { mat4, mult, translate, rotate, flatten } from "../commons/MV"
import { MovableObject } from "./MoveableObject"
import { LevelService } from "../../shared/services/level.service";
import { SessionService } from "src/app/shared/services/session.service";
import { Level } from "src/app/models/level";
import { AudioService } from "../audio/audio.service";
import { Textures } from "../commons/textures";

export class Projectile extends MovableObject{
    
    ///////////////
    // Variables //
    ///////////////
    private vertices: any[]
    private texCoords: any[]
    private normals: any[]
    private rotationAngle: number
    private rowsToCheck: number[]
    private xBoundLeft: number
    private xBoundRight: number

    //////////////
    // Services //
    //////////////

    constructor(
        
        private gameService: GameService,
        pos: any, 
        rowsToCheck: number[],
        private levelService: LevelService,
        private sessionService: SessionService,
        private audioService: AudioService

    ) {

        super(gameService, pos, [gameService.X_VELO_CONSTANT * 12, 0], 1)
        
        this.vertices = []
        this.texCoords = []
        this.normals = []
        this.rotationAngle = 0
        this.generateVertices(this.vertices, this.texCoords, this.normals)
        this.rowsToCheck = rowsToCheck
        this.xBoundLeft = 0

        this.init()
        
    }

    public async init(): Promise<void> {

        const level: Level = await this.levelService.getLevel()

        this.xBoundRight = Math.ceil(level.representation[0].length)

        this.velocity[0] = (this.world.player.texDir == 0) ? this.velocity[0] : -this.velocity[0]
        
        for (let i = 0; i < this.rowsToCheck.length; i++) {
            
            // min
            for (let k = Math.floor(this.pos[0]); k >= 0; k--) {

                if (this.world.stage.stage[14 - (this.rowsToCheck[i])][k] != '.') {
                
                    this.xBoundLeft = k + 1
                    break
                
                }

            }
                
                // max
            for (let k = Math.floor(this.pos[0]); k < Math.ceil(level.representation[0].length); k++)
                if (this.world.stage.stage[14 - (this.rowsToCheck[i])][k] != '.') {
                    this.xBoundRight = k - 1;
                    break;
                }
        }

    }

    public generateVertices(buffer, texbuffer, normalbuffer): void {
        
        buffer.push([1, 1, 0]);
        buffer.push([0, 1, 0]);
        buffer.push([0, 0, 0]);
        buffer.push([1, 1, 0]);
        buffer.push([0, 0, 0]);
        buffer.push([1, 0, 0]);
        texbuffer.push(new Textures(this.gameService).texCoord[2]);
        texbuffer.push(new Textures(this.gameService).texCoord[1]);
        texbuffer.push(new Textures(this.gameService).texCoord[0]);
        texbuffer.push(new Textures(this.gameService).texCoord[2]);
        texbuffer.push(new Textures(this.gameService).texCoord[0]);
        texbuffer.push(new Textures(this.gameService).texCoord[3]);
        normalbuffer.push([0, 0, 1]);
        normalbuffer.push([0, 0, 1]);
        normalbuffer.push([0, 0, 1]);
        normalbuffer.push([0, 0, 1]);
        normalbuffer.push([0, 0, 1]);
        normalbuffer.push([0, 0, 1]);
    
    }
    
    public move(): void {

        this.sessionService.snowballSubject.next(true)
        
        this.pos[0] += this.velocity[0];
        
        if (this.pos[0] >= this.xBoundRight || this.pos[0] <= this.xBoundLeft) {
            this.lives = 0;
        }
        
        // HANDLE Enemy collisions, using world's list of enemies
        for (let i = 0; i < this.world.enemies.length; i++) {
            
            const currentEnemy = this.world.enemies[i];

            this.sessionService.snowballSubject.next(true)
            
            if (!(currentEnemy.pos[0] + 1 > this.xBoundLeft && currentEnemy.pos[0] - 1 < this.xBoundRight))
                continue;
            // Bounding boxes intersect
            var adjustedEnemyPos = currentEnemy.pos[0] + (1 - currentEnemy.enemyWidth) / 2;
            if ((Math.abs(this.pos[0] - adjustedEnemyPos)) * 2 < (this.velocity[0] + currentEnemy.enemyWidth) &&
                (Math.abs(this.pos[1] - currentEnemy.pos[1])) * 2 < (.5 + currentEnemy.enemyHeight)) {
                // Need to detect which collision happened, vertical or horizontal
                this.lives = 0;
                this.sessionService.increaseScore(100)
                this.audioService.playStomp()
                this.world.deadEnemies.push(this.world.enemies[i]);
                this.world.enemies.splice(i, 1);
                i--;
                currentEnemy.enemyType === 'C' ? this.sessionService.walkerSubject.next(true) : null
                currentEnemy.enemyType === 'J' ? this.sessionService.jumperSubject.next(true) : null
                currentEnemy.enemyType === 'F' ? this.sessionService.flyerSubject.next(true) : null
            }
        }
    }

    public draw(): void {
        
        this.move();
        
        var ctm = mat4();
        ctm = mult(ctm, translate([0, 0, 0.5]));
        ctm = mult(ctm, translate(this.pos));
        ctm = mult(ctm, translate([.5, .5, 0]));
        ctm = mult(ctm, rotate(this.rotationAngle, [0, 0, 1]));
        ctm = mult(ctm, translate([-.5, -.5, 0]));
        this.gameService.GL.uniformMatrix4fv(this.gameService.UNIFORM_MODEL, false, flatten(ctm));
        this.rotationAngle += 12;
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.T_BUFFER);
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.texCoords), this.gameService.GL.STATIC_DRAW);
        var vTexCoord = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vTexCoord");
        this.gameService.GL.vertexAttribPointer(vTexCoord, 2, this.gameService.GL.FLOAT, false, 0, 0);
        this.gameService.GL.enableVertexAttribArray(vTexCoord);
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.V_BUFFER);
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.vertices), this.gameService.GL.STATIC_DRAW);
        var vPosition = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vPosition");
        this.gameService.GL.vertexAttribPointer(vPosition, 3, this.gameService.GL.FLOAT, false, 0, 0);
        this.gameService.GL.enableVertexAttribArray(vPosition);
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.N_BUFFER);
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.normals), this.gameService.GL.STATIC_DRAW);
        var vNormal = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vNormal");
        this.gameService.GL.vertexAttribPointer(vNormal, 3, this.gameService.GL.FLOAT, false, 0, 0);
        this.gameService.GL.enableVertexAttribArray(vNormal);
        this.gameService.GL.bindTexture(this.gameService.GL.TEXTURE_2D, this.world.levelTextures.projectile.textures[0]);

        this.gameService.GL.drawArrays(this.gameService.GL.TRIANGLES, 0, this.vertices.length);
    }
}



