import { MovableObject } from './MoveableObject'
import { Timer } from '../mario-common/timer'
import { mult, flatten, mat4, translate } from '../mario-common/MV'
import { texCoord } from '../mario-common/textures';
import { GLS } from '../services/gl.service'
import { World } from './world/world.component';

const ENEMY_XVELO_CONSTANT = .025
const ENEMY_GRAVITY_CONSTANT = -.0075
const ENEMY_JUMP_CONSTANT = .20

export class Enemy extends MovableObject{
    
    ///////////////
    // Variables //
    ///////////////
    public xBoundLeft: number
    public xBoundRight: number 
    public yBoundLow: number
    public yBoundHigh: number
    public enemyType: string

    public enemyWalkTimer = new Timer()
    public walkTime = 0
    public texIndex= 0

    public enemyWidth = .5
    public enemyHeight = .7

    public vertices = []
    public texCoords = []
    public normals = []

    public enemyIndex = 0
    public velocity
    public bounds: any[]

    public constructor(world: World, pos, xBoundLeft, xBoundRight, yBoundLow, yBoundHigh, enemyType) {
        
        super(world, pos, [ENEMY_XVELO_CONSTANT, 0], 1)
        
        this.xBoundLeft = xBoundLeft
        this.xBoundRight = xBoundRight
        this.yBoundLow = yBoundLow
        this.yBoundHigh = yBoundHigh
        this.enemyType = enemyType
        this.enemyWalkTimer = new Timer()
        this.enemyWalkTimer.reset()
        this.walkTime = 0
        this.texIndex = 0
        this.enemyWidth = .5
        this.enemyHeight = .7
        this.vertices = []
        this.texCoords = []
        this.normals = []
        this.enemyIndex = 0
        
        switch (this.enemyType) {
            case 'C':
                this.enemyIndex = 0
                break
            case 'J':
                this.enemyIndex = 1
                break
            case 'H':
                this.enemyIndex = 2
                break
            case 'V':
                this.enemyIndex = 3
                this.velocity[1] = ENEMY_XVELO_CONSTANT
                break
        }
        this.generateVertices(this.vertices, this.texCoords, this.normals)
        this.bounds = []
    }

    generateVertices(buffer, texbuffer, normalbuffer): void {

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


    public animIndex() {
        
        this.walkTime += this.enemyWalkTimer.getElapsedTime() / 80
        
        this.texIndex = Math.floor(this.walkTime % this.world.levelTextures.enemies[this.enemyIndex].textures.length / 2) * 2
        
        if (this.velocity[0] < 0.0 || this.enemyIndex == 1 || this.enemyIndex == 3)
            this.texIndex++
        return this.texIndex
    
    }
    
    public move() {
        var adjustedPos = this.pos[0] + (1 - this.enemyWidth) / 2
        // Ground crawler == C or Horizontal Flyers == H
        if (this.enemyType == "C" || this.enemyType == "H") {
            if (this.xBoundLeft == this.xBoundRight)
                this.velocity[0] = 0
            if (this.xBoundLeft < this.xBoundRight) {
                if (adjustedPos < this.xBoundLeft || adjustedPos - this.enemyWidth > this.xBoundRight)
                    this.velocity[0] = -this.velocity[0]
            }
            this.pos[0] += this.velocity[0]
        }
        // Vertical Flyers
        else if (this.enemyType == "V") {
            if (this.yBoundLow == this.yBoundHigh)
                this.velocity[1] = 0
            if (this.yBoundLow < this.yBoundHigh) {
                if (this.pos[1] < this.yBoundLow || this.pos[1] - this.enemyHeight > this.yBoundHigh)
                    this.velocity[1] = -this.velocity[1]
            }
            this.pos[1] += this.velocity[1]
        }
        // Jumpers
        else if (this.enemyType == 'J') {
            if (this.pos[1] <= this.yBoundLow)
                this.velocity[1] = ENEMY_JUMP_CONSTANT
            if (this.pos[1] > this.yBoundLow)
                this.velocity[1] += ENEMY_GRAVITY_CONSTANT
            this.pos[1] += this.velocity[1]
        }
        // reasonably smart AI
        else if (this.enemyType == 'A') {
            // check if mario is close
            var xDistPlayer = this.pos[0] - this.world.player.pos[0]
            var yDistPlayer = Math.abs(this.world.player.pos[1] - this.pos[1])
            // default crawler movement
            if (this.xBoundLeft == this.xBoundRight)
                this.velocity[0] = 0
            var speedUp
            if (yDistPlayer <= 1 && Math.abs(xDistPlayer) <= 4) {
                speedUp = 1.65
                if (xDistPlayer > 0) {
                    this.velocity[0] = -Math.abs(this.velocity[0])
                }
                else if (xDistPlayer < 0) {
                    this.velocity[0] = Math.abs(this.velocity[0])
                }
            }
            else {
                speedUp = 1.0
            }
            if (this.xBoundLeft < this.xBoundRight && speedUp == 1.0) {
                if (adjustedPos < this.xBoundLeft) {
                    this.velocity[0] = Math.abs(this.velocity[0])
                }
                else if (adjustedPos - this.enemyWidth > this.xBoundRight && speedUp == 1.0) {
                    this.velocity[0] = -Math.abs(this.velocity[0])
                }
            }
            this.pos[0] += this.velocity[0] * speedUp;
            this.pos[0] = Math.max(this.xBoundLeft - (1 - this.enemyWidth) / 2 - .05, this.pos[0]);
            this.pos[0] = Math.min(this.xBoundRight + (1 - this.enemyWidth) / 2 + .05, this.pos[0]);
            // intelligent projectile avoidance
            for (var i = 0; i < this.world.projectiles.length; i++) {
                var xDist = Math.abs(this.pos[0] - this.world.projectiles[i].pos[0]);
                var yDist = Math.abs(this.world.projectiles[i].pos[1] - this.pos[1]);
                if (yDist > 1) {
                    continue;
                }
                if (xDist <= 3 && xDist > 0) {
                    if (this.pos[1] <= this.yBoundLow) {
                        this.velocity[1] = ENEMY_JUMP_CONSTANT;
                        this.pos[1] += this.velocity[1];
                        return;
                    }
                }
            }
            if (this.pos[1] > this.yBoundLow) {
                this.velocity[1] += ENEMY_GRAVITY_CONSTANT
            }
            if (this.pos[1] <= this.yBoundLow) {
                this.velocity[1] = 0
                this.pos[1] = this.yBoundLow
            }
            this.pos[1] += this.velocity[1]
        }
        return
    }

    public draw(): void {

        if (!GLS.I().pauseMode) {

            this.move()

        }

        var ctm = mat4()
        
        ctm = mult(ctm, translate(this.pos))
        
        GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_MODEL, false, flatten(ctm))
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().T_BUFFER)
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.texCoords), GLS.I().GL.STATIC_DRAW)
        
        var vTexCoord = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vTexCoord")
        
        GLS.I().GL.vertexAttribPointer(vTexCoord, 2, GLS.I().GL.FLOAT, false, 0, 0)
        GLS.I().GL.enableVertexAttribArray(vTexCoord)
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().V_BUFFER)
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.vertices), GLS.I().GL.STATIC_DRAW)
        
        var vPosition = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vPosition")
        
        GLS.I().GL.vertexAttribPointer(vPosition, 3, GLS.I().GL.FLOAT, false, 0, 0)
        GLS.I().GL.enableVertexAttribArray(vPosition)
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().N_BUFFER)
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.normals), GLS.I().GL.STATIC_DRAW)
        
        var vNormal = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vNormal")
        
        GLS.I().GL.vertexAttribPointer(vNormal, 3, GLS.I().GL.FLOAT, false, 0, 0)
        GLS.I().GL.enableVertexAttribArray(vNormal)
        GLS.I().GL.bindTexture(GLS.I().GL.TEXTURE_2D, this.world.levelTextures.enemies[this.enemyIndex].textures[this.animIndex()])
        GLS.I().GL.drawArrays(GLS.I().GL.TRIANGLES, 0, this.vertices.length)
    }
}




