import { MovableObject } from "./MoveableObject";
import { GameService } from "../game.service";
import { flatten, mult, translate, mat4, scale } from "../commons/MV";
import { Textures } from "../commons/textures";

export class PowerUp extends MovableObject{
    
    public yBound: any;
    public powerType: any;
    public powerWidth: number;
    public powerHeight: number;
    public vertices: any[];
    public texCoords: any[];
    public normals: any[];
    public powerIndex: number;
    public pos: any;
    public lives: number;
    public velocity: any;
    public world: any;
    
    constructor(
        
        private gameService: GameService,
        pos, yBound, powerType) {

        super(gameService, pos, [0, 0.1], 1)

        this.yBound = yBound;
        this.powerType = powerType;
        this.powerWidth = 1;
        this.powerHeight = .7;
        this.vertices = [];
        this.texCoords = [];
        this.normals = [];
        this.powerIndex = 0;
        switch (this.powerType) {
            case 'S':
                this.powerIndex = 0;
                break;
            case 'L':
                this.powerIndex = 1;
                break;
            case 'P':
                this.powerIndex = 2;
                break;
            case 'F':
                this.powerIndex = 3;
                break;
            case 'G':
                this.powerIndex = 4;
                break;
        }
        this.generateVertices(this.vertices, this.texCoords, this.normals);
    }
    
    public generateVertices(buffer, texbuffer, normalbuffer) {
    
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
        
        if (this.pos[1] >= this.yBound) {
            
            if (this.powerType == 'S' && this.lives != 0)
                this.lives -= 1;
            return;
        }
        
        // coin moves twice as fast
        if (this.powerType == 'S'){

            this.pos[1] += (this.velocity[1] * 8);

        } else {

            this.pos[1] += this.velocity[1];

        }

        // all other power-ups move at same rate
        return;

    }

    draw() {
    
        this.move()
    
        var ctm = mat4();
    
        ctm = mult(ctm, translate(this.pos));
        ctm = mult(ctm, scale(0.75, 0.75, 0.75));
        this.gameService.GL.uniformMatrix4fv(this.gameService.UNIFORM_MODEL, false, flatten(ctm));
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
        this.gameService.GL.bindTexture(this.gameService.GL.TEXTURE_2D, this.world.levelTextures.item.textures[this.powerIndex]);
        this.gameService.GL.drawArrays(this.gameService.GL.TRIANGLES, 0, this.vertices.length);

    }
}



