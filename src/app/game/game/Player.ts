import { MovableObject } from './MoveableObject'
import { Timer } from '../commons/timer'
import { mat4, mult, translate, flatten } from '../commons/MV'
import { GameService } from '../game.service'
import { Projectile } from './Projectile'
import { PowerUp } from './PowerUp'
import { Stage } from './Stage'
import { Injectable } from '@angular/core';
import { SessionService } from '../../shared/services/session.service';
import { LevelService } from '../../shared/services/level.service';
import { AudioService } from '../audio/audio.service';
import { Textures } from '../commons/textures';

@Injectable()
export class Player extends MovableObject{
    
    ///////////////
    // Variables //
    ///////////////
    public texCoords: any[];
    public walkTimer: Timer
    public normals: any[]
    public texIndex: number
    public vertices: any[]
    public texDir: number
    public projectileTimer: Timer
    public hasProjectiles: boolean
    public walktime: number
    public collisionUp: boolean
    public collisionDown: boolean
    public collisionLeft: boolean
    public collisionRight: boolean
    public playerHeight: number
    public playerWidth: number
    public bounds: any[]
    public finished: boolean
    
    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        
        private gameService: GameService,
        private sessionService: SessionService,
        private levelService: LevelService,
        private audioService: AudioService
        
    ) {

        super(gameService, gameService.INITIAL_PLAYER_POS.slice(0), gameService.INITIAL_PLAYER_VEL.slice(0), 3)

        this.projectileTimer = new Timer()
        this.hasProjectiles = false
        this.texDir = 0
        this.vertices = []
        this.texCoords = []
        this.texIndex = 0
        this.normals = []
        this.walkTimer = new Timer()
        this.walkTimer.reset()
        this.walktime = 0
        this.generateVertices(this.vertices, this.texCoords, this.normals)
        this.collisionUp = false
        this.collisionDown = false
        this.collisionLeft = false
        this.collisionRight = false
        this.playerHeight = .5
        this.playerWidth = .5
        this.bounds = []

    }
    
    public generateVertices(buffer, texbuffer, normalbuffer) {
    
        buffer.push([1, 1, 0])
        buffer.push([0, 1, 0])
        buffer.push([0, 0, 0])
        buffer.push([1, 1, 0])
        buffer.push([0, 0, 0])
        buffer.push([1, 0, 0])
    
        texbuffer.push(new Textures(this.gameService).texCoord[2])
        texbuffer.push(new Textures(this.gameService).texCoord[1])
        texbuffer.push(new Textures(this.gameService).texCoord[0])
        texbuffer.push(new Textures(this.gameService).texCoord[2])
        texbuffer.push(new Textures(this.gameService).texCoord[0])
        texbuffer.push(new Textures(this.gameService).texCoord[3])
    
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
    
    }
    
    draw() {
        

        !this.finished ? this.move() : null
    
        let ctm = mat4()

        ctm = mult(ctm, translate(this.pos))
        ctm = mult(ctm, translate([0, 0, -1]))
        this.gameService.GL.uniformMatrix4fv(this.gameService.UNIFORM_MODEL, false, flatten(ctm))
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.T_BUFFER)
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.texCoords), this.gameService.GL.STATIC_DRAW)

        let vTexCoord = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vTexCoord")

        this.gameService.GL.vertexAttribPointer(vTexCoord, 2, this.gameService.GL.FLOAT, false, 0, 0)
        this.gameService.GL.enableVertexAttribArray(vTexCoord)
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.V_BUFFER)
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.vertices), this.gameService.GL.STATIC_DRAW)

        let vPosition = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vPosition")

        this.gameService.GL.vertexAttribPointer(vPosition, 3, this.gameService.GL.FLOAT, false, 0, 0)
        this.gameService.GL.enableVertexAttribArray(vPosition)
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.N_BUFFER)
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.normals), this.gameService.GL.STATIC_DRAW)

        let vNormal = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vNormal")

        this.gameService.GL.vertexAttribPointer(vNormal, 3, this.gameService.GL.FLOAT, false, 0, 0)
        this.gameService.GL.enableVertexAttribArray(vNormal)
        this.gameService.GL.bindTexture(this.gameService.GL.TEXTURE_2D, this.gameService.GAMEWORLD.levelTextures.player.textures[this.animIndex()])
        this.gameService.GL.drawArrays(this.gameService.GL.TRIANGLES, 0, this.vertices.length)

    }
    
    public animIndex(): number {

        if (Math.abs(this.velocity[0]) < this.gameService.WALK_CUTOFF) {
        
            this.texIndex = 0
            this.walkTimer.reset()
            this.walktime = 0
        
        } else {

            this.walktime += this.walkTimer.getElapsedTime() / this.gameService.ANIM_SPEED
            this.texIndex = Math.floor(this.walktime % this.gameService.GAMEWORLD.levelTextures.player.textures.length / 2) * 2
            
            if (this.texIndex >= this.gameService.GAMEWORLD.levelTextures.player.textures.length - 2) {
            
                this.texIndex = 2
                this.walkTimer.reset()
                this.walktime = 2
            
            }
        }

        if (!this.collisionDown) {
        
            this.texIndex = this.gameService.GAMEWORLD.levelTextures.player.textures.length - 2
            this.walkTimer.reset()
            this.walktime = 0
        
        }
        
        this.texIndex += this.texDir
        return this.texIndex
    }

    /**
     * 
     * 
     * 
     */
    public move(): void {
        
        let keyMap: boolean[] = this.sessionService.keyArray
        
        // Shoot a snowball.
        if (keyMap[32] && this.pos[1] < 14) {
        
            if (this.hasProjectiles && ((this.projectileTimer.getNowTime() - this.projectileTimer.prevTime) >= 600)) {
                
                this.projectileTimer.reset()
                this.gameService.GAMEWORLD.projectiles.push(new Projectile(
                    
                    this.gameService,
                    this.pos.slice(0), 
                    this.getRowsToCheck(), 
                    this.levelService,
                    this.sessionService,
                    this.audioService,

                ))

                // this.audioService.playFireball()
            }
        
        }
        
        this.getBounds()
        this.setCollision()
        
        // Set Y Velocity, handle jumps
        // If on the ground
        if (this.collisionDown) {
        
            this.velocity[1] < 0 ? this.velocity[1] = 0 : null

            if ((keyMap[38]) && !this.collisionUp) {

                this.velocity[1] = this.gameService.JUMP_CONSTANT

            }
        }
       
        // beneath something
        else if (this.collisionUp) {
        
            this.velocity[1] = this.gameService.GRAVITY_CONSTANT
        
        }
        
        // IN THE AIR
        else {

            this.velocity[1] += this.gameService.GRAVITY_CONSTANT
            
            if (this.velocity[1] <= .05 && this.velocity[1] > 0) {

                this.velocity[1] = -.045

            }
        }

        // Set X velocity and handle friction
        this.sessionService.keyArray[37] ? this.velocity[0] += -this.gameService.X_VELO_CONSTANT : null
        this.sessionService.keyArray[39] ? this.velocity[0] += this.gameService.X_VELO_CONSTANT : null

        this.velocity[0] *= this.gameService.X_GROUND_FRICTION
        // HANDLE STAGE COLLISIONS, using boundary positions
        // left
        if (this.velocity[0] < 0 && (this.velocity[0] + this.pos[0] < this.bounds[0])) {
            this.velocity[0] = 0
            // added 1.01 * ... to prevent getting stuck on corners
            this.pos[0] = this.bounds[0] + (1.01) * this.gameService.X_VELO_CONSTANT * this.gameService.X_GROUND_FRICTION;
        }
        // right
        else if (this.velocity[0] > 0 && (this.velocity[0] + this.pos[0] > this.bounds[1])) {
            this.velocity[0] = 0;
            this.pos[0] = this.bounds[1] - (1.01) * this.gameService.X_VELO_CONSTANT * this.gameService.X_GROUND_FRICTION;
        }
        // no x collision
        else
            this.pos[0] += this.velocity[0];
        // up
        if (this.velocity[1] > 0 && (this.velocity[1] + this.pos[1] > this.bounds[2])) {
            this.velocity[1] = 0;
            this.pos[1] = this.bounds[2];
            // handle item/score blocks
            var rowsToCheck = this.getRowsToCheck();
            var blockX = this.pos[0] + 0.5;
            var blockY = this.pos[1] + 1;
            var blockCollide = this.getStage(blockX, blockY);
            
            for (let i = 0; i < rowsToCheck.length; i++) {
                
                blockCollide = this.getStage(blockX, rowsToCheck[i] + 1);
                
                if (isBlock(blockCollide)) {
                    
                    if (blockCollide == 'S') {
                    
                        this.sessionService.increaseScore(150)
                        this.audioService.playCoin()
                    
                    } else {
                    
                        // this.audioService.playFireball()
                    
                    }

                    this.gameService.GAMEWORLD.items.push(new PowerUp(this.gameService, [Math.floor(blockX) + 0.25, Math.floor(blockY), 0], Math.floor(blockY + 1), blockCollide));
                    this.gameService.GAMEWORLD.stage.stage[14 - Math.floor(blockY)][Math.floor(blockX)] = 'X';
                    this.gameService.GAMEWORLD.stage = new Stage(this.gameService, this.gameService.GAMEWORLD.stage.stage);
                    this.sessionService.increaseScore(100)

                }
            }
        
        // down
        } else if (this.velocity[1] < 0 && (this.velocity[1] + this.pos[1] < this.bounds[3])) {
        
            this.velocity[1] = 0;
            this.pos[1] = this.bounds[3];
        
        } else {

        // no y collision
        this.pos[1] += this.velocity[1];

        }

        // HANDLE Enemy collisions, using world's list of enemies
        for (let i = 0; i < this.gameService.GAMEWORLD.enemies.length; i++) {
            
            let currentEnemy = this.gameService.GAMEWORLD.enemies[i];
            
            // Bounding boxes intersect
            var adjustedPlayerPos = this.pos[0] + (1 - this.playerWidth) / 2;
            var adjustedEnemyPos = currentEnemy.pos[0] + (1 - currentEnemy.enemyWidth) / 2;
            
            if ((Math.abs(adjustedPlayerPos - adjustedEnemyPos)) * 2 < (this.playerWidth + currentEnemy.enemyWidth) &&
                (Math.abs(this.pos[1] - currentEnemy.pos[1])) * 2 < (this.playerHeight + currentEnemy.enemyHeight)) {
                // Need to detect which collision happened, vertical or horizontal
                var playerLower = this.pos[1];
                var playerRight = this.pos[0] + this.playerWidth + (1 - this.playerWidth) / 2;
                var enemyLower = currentEnemy.pos[1];
                var enemyRight = adjustedEnemyPos + currentEnemy.enemyWidth + (1 - currentEnemy.enemyWidth) / 2;
                var bDist = enemyLower - (playerLower + this.playerHeight);
                var tDist = playerLower - (enemyLower + currentEnemy.enemyHeight);
                var lDist = playerRight - adjustedEnemyPos;
                var rDist = enemyRight - this.pos[0];

                // Top collision, must be moving down
                // && this.velocity[1] <= 0) // less lenient if velo is included
                
                // Defeating an enemy.
                if (bDist < tDist && bDist < lDist && bDist < rDist) {
                    
    
                    this.audioService.playStomp()

                    this.sessionService.increaseScore(100)
                    this.velocity[1] = this.gameService.JUMP_CONSTANT;
                    this.gameService.GAMEWORLD.deadEnemies.push(this.gameService.GAMEWORLD.enemies[i]);
                    this.gameService.GAMEWORLD.enemies.splice(i, 1);
                    return
                
                }

                else {

                    // User looses one life.
                    this.sessionService.decreaseLives()

                    // Stores the type of the opponent against the user has lost a live.
                    switch(currentEnemy.enemyType){

                        case 'C': this.sessionService.increaseDefeatedByOpponentType1(); break
                        case 'J': this.sessionService.increaseDefeatedByOpponentType2(); break
                        case 'F': this.sessionService.increaseDefeatedByOpponentType3(); break

                    }

                    if (this.sessionService.getLives() === 0) {
                        
                        this.audioService.stopMusic()
                        this.resetToDefault()
                        this.sessionService.setProgress(playerRight)
                        this.sessionService.storeSession('lost')
                        this.restartLevel()
                        this.finished = true

                    }

                    this.restartLevel()
                    this.audioService.playlostLife()
                    this.resetToDefault();

                }
                
                this.pos = this.gameService.INITIAL_PLAYER_POS.slice(0);
                this.gameService.CAMERA_POS = this.gameService.INITIAL_CAMERA_POS.slice(0);
                this.gameService.GAMEWORLD.xBoundRight = this.gameService.INITIAL_WORLD_BOUND_RIGHT;
                this.gameService.GAMEWORLD.xBoundLeft = this.gameService.INITIAL_WORLD_BOUND_LEFT;
                this.velocity = [0, 0];
            
            }
        }

        // handle power up collision
        for (var i = 0; i < this.gameService.GAMEWORLD.items.length; i++) {
                    
            var curItem = this.gameService.GAMEWORLD.items[i];
            var adjustedPlayerPos = this.pos[0] + (1 - this.playerWidth) / 2;
            var adjustedItemPos = curItem.pos[0] + (1 - curItem.powerWidth) / 2;
            
            if ((Math.abs(adjustedPlayerPos - adjustedItemPos)) * 2 < (this.playerWidth + curItem.powerWidth) &&
                (Math.abs(this.pos[1] - curItem.pos[1])) * 2 < (this.playerHeight + curItem.powerHeight)) {
                
                switch (curItem.powerType) {
                    
                    case 'L':
                        
                        this.sessionService.increaseLives()
                        break;

                    case 'P':

                        this.sessionService.powerUpSubject.next(true)
                        this.audioService.playPowerUp()
                        this.hasProjectiles = true;
                        break;

                    case 'F':
                        
                        this.gameService.X_VELO_CONSTANT = .045;
                        break

                    case 'G':
                        
                        this.gameService.GRAVITY_CONSTANT = -.0055;
                        break;
                }

                setTimeout(function () {

                    this.gameService.GRAVITY_CONSTANT = -.0075;
                    this.gameService.X_VELO_CONSTANT = .0175;

                }, 20000); // holds for 10 seconds, should be longer?
                curItem.lives = 0;
            }
        }
        
        // handle off stage death
        if (this.pos[1] <= -.5) {
            
            this.sessionService.decreaseLives()
            this.sessionService.increaseDefeatedByGaps()

            this.restartLevel()
            this.resetToDefault()
            this.audioService.playlostLife()

            if (this.sessionService.getLives() === 0) {

                this.audioService.stopMusic()
                this.sessionService.setProgress(this.pos[0])
                this.sessionService.storeSession('lost')
                // this.pos = this.gameService.INITIAL_PLAYER_POS.slice(0);
                this.restartLevel()
                this.finished = true
                
            } else {
                
                this.restartLevel()

                // this.pos = this.gameService.INITIAL_PLAYER_POS.slice(0);
                // this.gameService.CAMERA_POS = this.gameService.INITIAL_CAMERA_POS.slice(0);
                // this.gameService.GAMEWORLD.xBoundRight = this.gameService.INITIAL_WORLD_BOUND_RIGHT;
                // this.gameService.GAMEWORLD.xBoundLeft = this.gameService.INITIAL_WORLD_BOUND_LEFT;
                // this.velocity = [0, 0];
            
            }
        }
    }
    
    // helper function to get stage characters
    getStage(xPos, yPos) {
        // Errors otherwise
        if (yPos < 0 || yPos > 14 || xPos < 0)
            return '.';
        var curSquare = this.gameService.GAMEWORLD.stage.stage[14 - Math.floor(yPos)][Math.floor(xPos)];
        return (curSquare != 'E' ? curSquare : '.');
    }
    getBounds() {
        var offsetX = (1 - this.playerWidth) / 2;
        // get X bounds
        var rowsToCheck = this.getRowsToCheck();
        var minX = -1;
        // search left to find min x 
        for (var i = 0; i < rowsToCheck.length; i++)
            for (var j = Math.floor(this.pos[0] + offsetX); j >= 0; j--)
                if (this.getStage(j, rowsToCheck[i]) != '.') {
                    minX = Math.max(minX, j - offsetX);
                    break;
                }
        this.bounds[0] = minX + 1;
        var maxX = Math.ceil(this.gameService.GAMEWORLD.xBoundRight);
        for (var i = 0; i < rowsToCheck.length; i++)
            for (var j = Math.floor(this.pos[0] + offsetX); j < Math.ceil(this.gameService.GAMEWORLD.xBoundRight); j++)
                if (this.getStage(j, rowsToCheck[i]) != '.') {
                    maxX = Math.min(maxX, j + offsetX);
                    break;
                }
        this.bounds[1] = maxX - 1;
        // Get Y bounds
        var colsToCheck = this.getColsToCheck();
        var offsetY = (1 - this.playerHeight) / 3;
        var maxY = 20;
        for (var i = 0; i < colsToCheck.length; i++)
            for (var j = Math.floor(this.pos[1]); j < 15; j++)
                if (this.getStage(colsToCheck[i], j) != '.') {
                    maxY = Math.min(maxY, j + offsetY);
                    break;
                }
        this.bounds[2] = maxY - 1;
        var minY = -2;
        for (var i = 0; i < colsToCheck.length; i++)
            for (var j = Math.floor(this.pos[1]); j >= 0; j--)
                if (this.getStage(colsToCheck[i], j) != '.') {
                    minY = Math.max(minY, j);
                    break;
                }
        this.bounds[3] = minY + 1;
    }

    /**
     * 
     */
    private getColsToCheck() {
        
        let offsetX: number = (1 - this.playerWidth) / 2;
        let lowerCol: number = Math.floor(this.pos[0] + offsetX);
        let upperCol: number = this.pos[0] + offsetX + this.playerWidth;
        
        if (upperCol > 0 && (upperCol == Math.floor(upperCol))) {

            upperCol--;

        } else {

            upperCol = Math.floor(upperCol);

        }
        
        let colsToCheck = [];
        for (var i = lowerCol; i <= upperCol; i++)
            colsToCheck.push(i);
        return colsToCheck;
    }
    
    /**
     * 
     * 
     * 
     */
    private getRowsToCheck(): number[] {
        
        const lowerRow: number = Math.floor(this.pos[1])
        let upperRow = this.pos[1] + this.playerHeight
        
        // touching an edge
        if (upperRow > 0 && (upperRow == Math.floor(upperRow))){

            upperRow = upperRow - 1
            
        } else {

            upperRow = Math.floor(upperRow)

        }

        let rowsToCheck = []
        
        for (var i = lowerRow; i <= upperRow; i++) {

            rowsToCheck.push(i)

        }

        return rowsToCheck

    }

    /**
     * 
     * 
     * 
     */
    private setCollision() {
    
        this.collisionLeft = Math.abs(this.pos[0] - this.bounds[0]) <= .005;
        this.collisionRight = Math.abs(this.pos[0] - this.bounds[1]) <= .005;
        this.collisionUp = Math.abs(this.pos[1] - this.bounds[2]) <= .005;
        this.collisionDown = Math.abs(this.pos[1] - this.bounds[3]) <= .005;
    
    }

    public resetToDefault() {
    
        this.gameService.GRAVITY_CONSTANT = -.0075
        this.gameService.X_VELO_CONSTANT = .0175
        this.hasProjectiles = false
        this.gameService.GAMEWORLD.enemies = this.gameService.GAMEWORLD.enemies.concat(this.gameService.GAMEWORLD.deadEnemies)
        this.gameService.GAMEWORLD.deadEnemies = []
    
    }

    public restartLevel(): void {

        this.pos = this.gameService.INITIAL_PLAYER_POS.slice(0);
        this.gameService.CAMERA_POS = this.gameService.INITIAL_CAMERA_POS.slice(0);
        this.gameService.GAMEWORLD.xBoundRight = this.gameService.INITIAL_WORLD_BOUND_RIGHT;
        this.gameService.GAMEWORLD.xBoundLeft = this.gameService.INITIAL_WORLD_BOUND_LEFT;
        this.velocity = [0, 0];

    }

}

function isBlock(block: string): boolean {

    return (block === 'S') || (block === 'Y') || (block === 'L') || (block === 'P') || (block === 'F') || (block === 'G')

}

