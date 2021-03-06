import { MovableObject } from './MoveableObject'
import { Timer } from '../commons/timer'
import { mult, flatten, mat4, translate } from '../commons/MV'
import { GameService } from '../game.service';
import { Textures } from '../commons/textures';

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
    public walkTime: number = 0
    public texIndex: number = 0

    public enemyWidth: number = .5
    public enemyHeight: number = .7

    public vertices = []
    public texCoords = []
    public normals = []

    public enemyIndex = 0
    public velocity
    public bounds: any[]

    public constructor(
        
        private gameService: GameService,
        pos, xBoundLeft, xBoundRight, yBoundLow, yBoundHigh, enemyType) {
        
        super(gameService, pos, [ENEMY_XVELO_CONSTANT, 0], 1)
        
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
            case 'F':
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


    public animIndex() {
        
        this.walkTime += this.enemyWalkTimer.getElapsedTime() / 80
        
        this.texIndex = Math.floor(this.walkTime % this.gameService.GAMEWORLD.levelTextures.enemies[this.enemyIndex].textures.length / 2) * 2
        
        if (this.velocity[0] < 0.0 || this.enemyIndex == 1 || this.enemyIndex == 3)
            this.texIndex++
        return this.texIndex
    
    }
    
    public move() {

        var adjustedPos = this.pos[0] + (1 - this.enemyWidth) / 2

        if (this.enemyType == 'C') {
            if (this.xBoundLeft == this.xBoundRight)
                this.velocity[0] = 0
            if (this.xBoundLeft < this.xBoundRight) {
                if (adjustedPos < this.xBoundLeft || adjustedPos - this.enemyWidth > this.xBoundRight)
                    this.velocity[0] = -this.velocity[0]
            }
            this.pos[0] += this.velocity[0]
        }
        // Jumpers
        else if (this.enemyType == 'J') {
            if (this.pos[1] <= this.yBoundLow)
                this.velocity[1] = ENEMY_JUMP_CONSTANT
            if (this.pos[1] > this.yBoundLow)
                this.velocity[1] += ENEMY_GRAVITY_CONSTANT
            this.pos[1] += this.velocity[1]
        }
        // Vertical Flyers
        else if (this.enemyType == 'F') {
            if (this.yBoundLow == this.yBoundHigh)
                this.velocity[1] = 0
            if (this.yBoundLow < this.yBoundHigh) {
                if (this.pos[1] < this.yBoundLow || this.pos[1] - this.enemyHeight > this.yBoundHigh)
                    this.velocity[1] = -this.velocity[1]
            }
            this.pos[1] += this.velocity[1]
        }
       
        return
    }

    public draw(): void {

        this.move()

        var ctm = mat4()
        
        ctm = mult(ctm, translate(this.pos))
        
        this.gameService.GL.uniformMatrix4fv(this.gameService.UNIFORM_MODEL, false, flatten(ctm))
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.T_BUFFER)
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.texCoords), this.gameService.GL.STATIC_DRAW)
        
        var vTexCoord = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vTexCoord")
        
        this.gameService.GL.vertexAttribPointer(vTexCoord, 2, this.gameService.GL.FLOAT, false, 0, 0)
        this.gameService.GL.enableVertexAttribArray(vTexCoord)
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.V_BUFFER)
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.vertices), this.gameService.GL.STATIC_DRAW)
        
        var vPosition = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vPosition")
        
        this.gameService.GL.vertexAttribPointer(vPosition, 3, this.gameService.GL.FLOAT, false, 0, 0)
        this.gameService.GL.enableVertexAttribArray(vPosition)
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.N_BUFFER)
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.normals), this.gameService.GL.STATIC_DRAW)
        
        var vNormal = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vNormal")
        
        this.gameService.GL.vertexAttribPointer(vNormal, 3, this.gameService.GL.FLOAT, false, 0, 0)
        this.gameService.GL.enableVertexAttribArray(vNormal)
        this.gameService.GL.bindTexture(this.gameService.GL.TEXTURE_2D, this.gameService.GAMEWORLD.levelTextures.enemies[this.enemyIndex].textures[this.animIndex()])
        this.gameService.GL.drawArrays(this.gameService.GL.TRIANGLES, 0, this.vertices.length)
    }
}




