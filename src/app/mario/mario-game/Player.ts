import { MovableObject } from './MoveableObject'
import { Timer } from '../mario-common/timer'
import { Howl } from '../mario-common/howler'
import { texCoord } from '../mario-common/textures'
import { mat4, mult, translate, flatten } from '../mario-common/MV'
import { GLS } from '../services/gl.service'
import { gameOver } from './hud'
import { Projectile } from './Projectile'
import { PowerUp } from './PowerUp'
import { Stage } from './Stage'
import { Injectable } from '@angular/core';
import { SessionService } from '../../analytics/services/session.service';
import { World } from './world/world.component';
import { LevelService } from '../services/level.service';

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
    public lives: any
    public collisionLeft: boolean
    public collisionRight: boolean
    public playerHeight: number
    public playerWidth: number
    public bounds: any[]
    public enemyKillSound: HTMLAudioElement
    public coinSound: HTMLAudioElement
    public lostLifeSound: any
    public fireballSound: HTMLAudioElement
    public powerUpAppearsSound: HTMLAudioElement
    public lifeSound: HTMLAudioElement
    public powerUpSound: HTMLAudioElement

    public constructor(
        
        world: World,
        private sessionService: SessionService,
        private levelService: LevelService,
        
    ) {
        super(world, GLS.I().INITIAL_PLAYER_POS.slice(0), GLS.I().INITIAL_PLAYER_VEL.slice(0), GLS.I().INITIAL_PLAYER_LIVES)

        this.sessionService.generateSession()
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
        this.enemyKillSound = new Audio('../assets/Sound/Stomp.mp3')
        this.coinSound = new Audio('../assets/Sound/Coin.mp3')
        
        this.lostLifeSound = new Howl({
        
            urls: ['../assets/Sound/LostLife.mp3'],
            volume: 0.5,
        
            onplay: () => {
            
                world.bgMusic[world.getLevelIndex()].pause()
            
            },
        
            onend: () => {
            
                world.bgMusic[world.getLevelIndex()].play()
            }
        
        })
    }
    
    public generateVertices(buffer, texbuffer, normalbuffer) {
    
        buffer.push([1, 1, 0])
        buffer.push([0, 1, 0])
        buffer.push([0, 0, 0])
        buffer.push([1, 1, 0])
        buffer.push([0, 0, 0])
        buffer.push([1, 0, 0])
    
        texbuffer.push(texCoord[2])
        texbuffer.push(texCoord[1])
        texbuffer.push(texCoord[0])
        texbuffer.push(texCoord[2])
        texbuffer.push(texCoord[0])
        texbuffer.push(texCoord[3])
    
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
        normalbuffer.push([0, 0, 1])
    
    }
    
    draw() {
        
        if (!GLS.I().pauseMode) {

            this.move()

        }
        
        let ctm = mat4()

        ctm = mult(ctm, translate(this.pos))
        ctm = mult(ctm, translate([0, 0, -1]))
        GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_MODEL, false, flatten(ctm))
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().T_BUFFER)
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.texCoords), GLS.I().GL.STATIC_DRAW)

        let vTexCoord = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vTexCoord")

        GLS.I().GL.vertexAttribPointer(vTexCoord, 2, GLS.I().GL.FLOAT, false, 0, 0)
        GLS.I().GL.enableVertexAttribArray(vTexCoord)
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().V_BUFFER)
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.vertices), GLS.I().GL.STATIC_DRAW)

        let vPosition = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vPosition")

        GLS.I().GL.vertexAttribPointer(vPosition, 3, GLS.I().GL.FLOAT, false, 0, 0)
        GLS.I().GL.enableVertexAttribArray(vPosition)
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().N_BUFFER)
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.normals), GLS.I().GL.STATIC_DRAW)

        let vNormal = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vNormal")

        GLS.I().GL.vertexAttribPointer(vNormal, 3, GLS.I().GL.FLOAT, false, 0, 0)
        GLS.I().GL.enableVertexAttribArray(vNormal)
        GLS.I().GL.bindTexture(GLS.I().GL.TEXTURE_2D, this.world.stageTextures[this.world.getLevelIndex()].player.textures[this.animIndex()])
        GLS.I().GL.drawArrays(GLS.I().GL.TRIANGLES, 0, this.vertices.length)

    }
    
    public animIndex(): number {

        if (this.world.getLevelIndex() == 2 || this.world.getLevelIndex() == 1) {

            GLS.I().ANIM_SPEED = 40

        } else {

            GLS.I().ANIM_SPEED = 80

        }
        
        if (Math.abs(this.velocity[0]) < GLS.I().WALK_CUTOFF) {
        
            this.texIndex = 0
            this.walkTimer.reset()
            this.walktime = 0
        
        } else {

            this.walktime += this.walkTimer.getElapsedTime() / GLS.I().ANIM_SPEED
            this.texIndex = Math.floor(this.walktime % this.world.stageTextures[this.world.getLevelIndex()].player.textures.length / 2) * 2
            
            if (this.texIndex >= this.world.stageTextures[this.world.getLevelIndex()].player.textures.length - 2) {
            
                this.texIndex = 2
                this.walkTimer.reset()
                this.walktime = 2
            
            }
        }
        // document.getElementById("2").innerHTML = "walktime: " + this.walktime
        // document.getElementById("3").innerHTML = "texIndex: " + this.texIndex
        if (!this.collisionDown) {
            this.texIndex = this.world.stageTextures[this.world.getLevelIndex()].player.textures.length - 2
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
        
        let keyMap: number[] = this.world.keyMap
        
        if (keyMap[32] && this.pos[1] < 14) {
        
            if (this.hasProjectiles && ((this.projectileTimer.getNowTime() - this.projectileTimer.prevTime) >= 600)) {
                this.projectileTimer.reset()
                this.world.projectiles.push(new Projectile(this.world, this.pos.slice(0), this.getRowsToCheck(), this.levelService))
                this.fireballSound = new Audio('../Sound/Fireball.wav')
                this.fireballSound.play()
            }
        
        }
        
        this.getBounds()
        this.setCollision()
        
        // Set Y Velocity, handle jumps
        // If on the ground
        if (this.collisionDown) {
        
            this.velocity[1] < 0 ? this.velocity[1] = 0 : null

            if ((keyMap[38]) && !this.collisionUp && !GLS.I().pauseMode) {

                this.velocity[1] = GLS.I().JUMP_CONSTANT

            }
        }
       
        // beneath something
        else if (this.collisionUp) {
        
            this.velocity[1] = GLS.I().GRAVITY_CONSTANT
        
        }
        
        // IN THE AIR
        else {

            this.velocity[1] += GLS.I().GRAVITY_CONSTANT
            
            if (this.velocity[1] <= .05 && this.velocity[1] > 0) {

                this.velocity[1] = -.045

            }
        }

        // Set X velocity and handle friction
        // 'leftArrow' 
        if (keyMap[37] && !GLS.I().pauseMode) {

            this.velocity[0] += -GLS.I().X_VELO_CONSTANT

        }

        // 'rightArrow' 
        if (keyMap[39] && !GLS.I().pauseMode)
            this.velocity[0] += GLS.I().X_VELO_CONSTANT
        this.velocity[0] *= GLS.I().X_GROUND_FRICTION
        // HANDLE STAGE COLLISIONS, using boundary positions
        // left
        if (this.velocity[0] < 0 && (this.velocity[0] + this.pos[0] < this.bounds[0])) {
            this.velocity[0] = 0
            // added 1.01 * ... to prevent getting stuck on corners
            this.pos[0] = this.bounds[0] + (1.01) * GLS.I().X_VELO_CONSTANT * GLS.I().X_GROUND_FRICTION;
        }
        // right
        else if (this.velocity[0] > 0 && (this.velocity[0] + this.pos[0] > this.bounds[1])) {
            this.velocity[0] = 0;
            this.pos[0] = this.bounds[1] - (1.01) * GLS.I().X_VELO_CONSTANT * GLS.I().X_GROUND_FRICTION;
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
            for (var i = 0; i < rowsToCheck.length; i++) {
                blockCollide = this.getStage(blockX, rowsToCheck[i] + 1);
                if (isBlock(blockCollide)) {
                    if (blockCollide == 'S') {
                        this.world.score += 150;
                        this.coinSound = new Audio('../Sound/Coin.mp3');
                        this.coinSound.play();
                    }
                    else {
                        this.powerUpAppearsSound = new Audio('../Sound/PowerUpAppears.wav');
                        this.powerUpAppearsSound.play();
                    }
                    this.world.items.push(new PowerUp(this.world, [Math.floor(blockX) + 0.25, Math.floor(blockY), 0], Math.floor(blockY + 1), blockCollide));
                    this.world.stage.stage[14 - Math.floor(blockY)][Math.floor(blockX)] = 'B';
                    this.world.stage = new Stage(this.world, this.world.stage.stage);
                    this.world.score += 100;
                    this.world.getScore()
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
        for (let i = 0; i < this.world.enemies.length; i++) {
            
            let currentEnemy = this.world.enemies[i];
            
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
                if (bDist < tDist && bDist < lDist && bDist < rDist) // && this.velocity[1] <= 0) // less lenient if velo is included
                {
                    this.world.score += 100;
                    this.world.getScore();
                    this.velocity[1] = GLS.I().JUMP_CONSTANT;
                    this.world.deadEnemies.push(this.world.enemies[i]);
                    this.world.enemies.splice(i, 1);
                    this.enemyKillSound.play();
                    return;
                }

                else {
                
                    // User looses one life.
                    this.lives--
                    currentEnemy.enemyType
                    console.log('---------------------------------------')
                    console.log(currentEnemy.enemyType)
                    console.log('---------------------------------------')

                    ////////////////////////////////////////
                    // TODO: Handle different enemy types //
                    ////////////////////////////////////////
                    let defeated_by_opponent_type_1: number = this.sessionService.session.performance.defeated_by_opponent_type_1

                    console.log('---------------------------------------')
                    console.log(defeated_by_opponent_type_1)
                    console.log('---------------------------------------')


                    this.sessionService.session.performance.defeated_by_opponent_type_1 = defeated_by_opponent_type_1 + 1
        
                    this.resetToDefault();
                    this.lostLifeSound.play();
                    this.world.getLives();
                    
                    if (this.lives === 0) {
                
                        this.sessionService.storePerformance()
                        gameOver()

                    }

                }
                
                this.pos = GLS.I().INITIAL_PLAYER_POS.slice(0);
                GLS.I().CAMERA_POS = GLS.I().INITIAL_CAMERA_POS.slice(0);
                this.world.xBoundRight = GLS.I().INITIAL_WORLD_BOUND_RIGHT;
                this.world.xBoundLeft = GLS.I().INITIAL_WORLD_BOUND_LEFT;
                this.velocity = [0, 0];
            
            }
        }

        // handle power up collision
        for (var i = 0; i < this.world.items.length; i++) {
            var curItem = this.world.items[i];
            var adjustedPlayerPos = this.pos[0] + (1 - this.playerWidth) / 2;
            var adjustedItemPos = curItem.pos[0] + (1 - curItem.powerWidth) / 2;
            if ((Math.abs(adjustedPlayerPos - adjustedItemPos)) * 2 < (this.playerWidth + curItem.powerWidth) &&
                (Math.abs(this.pos[1] - curItem.pos[1])) * 2 < (this.playerHeight + curItem.powerHeight)) {
                switch (curItem.powerType) {
                    case 'L':
                        this.lifeSound = new Audio('../Sound/1-up.wav');
                        this.lifeSound.play();
                        this.world.player.lives++;
                        this.world.getLives();
                        break;
                    case 'P':
                        this.powerUpSound = new Audio('../Sound/PowerUp.wav');
                        this.powerUpSound.play();
                        this.hasProjectiles = true;
                        break;
                    case 'F':
                        this.powerUpSound = new Audio('../Sound/PowerUp.wav');
                        this.powerUpSound.play();
                        GLS.I().X_VELO_CONSTANT = .045;
                        break;
                    case 'G':
                        this.powerUpSound = new Audio('../Sound/PowerUp.wav');
                        this.powerUpSound.play();
                        GLS.I().GRAVITY_CONSTANT = -.0055;
                        break;
                }
                var p = this; // settimeout function "this" scope issue
                setTimeout(function () {
                    GLS.I().GRAVITY_CONSTANT = -.0075;
                    GLS.I().X_VELO_CONSTANT = .0175;
                }, 20000); // holds for 10 seconds, should be longer?
                curItem.lives = 0;
            }
        }
        /*case 'L':
            this.world.player.lives++;
            this.world.getLives();
            break;
        case 'P':
            break
        case 'F':
            X_VELO_CONSTANT = .045;
            break;
        case 'G':
            GRAVITY_CONSTANT = -.0055;
            break;*/
        // handle off stage death

        if (this.pos[1] <= -.5) {
            
            this.lives--

            const defeated_by_gaps: number = this.sessionService.session.performance.defeated_by_gaps
            this.sessionService.session.performance.defeated_by_gaps = defeated_by_gaps + 1
            
            this.resetToDefault();
            this.lostLifeSound.play();
            this.world.getLives();
            
            if (this.lives === 0) {

                // need this to stop the music from playing twice, doesn't hurt the restart
                this.pos = GLS.I().INITIAL_PLAYER_POS.slice(0);
                gameOver()
                this.sessionService.storePerformance()

            
            } else {
             
                this.pos = GLS.I().INITIAL_PLAYER_POS.slice(0);
                GLS.I().CAMERA_POS = GLS.I().INITIAL_CAMERA_POS.slice(0);
                this.world.xBoundRight = GLS.I().INITIAL_WORLD_BOUND_RIGHT;
                this.world.xBoundLeft = GLS.I().INITIAL_WORLD_BOUND_LEFT;
                this.velocity = [0, 0];
            
            }
        }
    }
    
    // helper function to get stage characters
    getStage(xPos, yPos) {
        // Errors otherwise
        if (yPos < 0 || yPos > 14 || xPos < 0)
            return '.';
        var curSquare = this.world.stage.stage[14 - Math.floor(yPos)][Math.floor(xPos)];
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
        var maxX = Math.ceil(this.world.xBoundRight);
        for (var i = 0; i < rowsToCheck.length; i++)
            for (var j = Math.floor(this.pos[0] + offsetX); j < Math.ceil(this.world.xBoundRight); j++)
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

    private resetToDefault() {
    
        GLS.I().GRAVITY_CONSTANT = -.0075
        GLS.I().X_VELO_CONSTANT = .0175
        this.hasProjectiles = false
        this.world.enemies = this.world.enemies.concat(this.world.deadEnemies)
        this.world.deadEnemies = []
    
    }

}

function isBlock(block: string): boolean {

    return (block === 'S') || (block === 'Y') || (block === 'L') || (block === 'P') || (block === 'F') || (block === 'G')

}

