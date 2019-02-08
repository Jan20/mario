import { MovableObject } from "./MoveableObject";
import { texCoord } from "../mario-common/textures";
import { GLS } from "../services/gl.service";
import { flatten, mult, translate, mat4, scale } from "../mario-common/MV";

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
    
    constructor(world, pos, yBound, powerType) {

        super(world, pos, [0, 0.1], 1)

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
        texbuffer.push(texCoord[2]);
        texbuffer.push(texCoord[1]);
        texbuffer.push(texCoord[0]);
        texbuffer.push(texCoord[2]);
        texbuffer.push(texCoord[0]);
        texbuffer.push(texCoord[3]);
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
        GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_MODEL, false, flatten(ctm));
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().T_BUFFER);
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.texCoords), GLS.I().GL.STATIC_DRAW);
    
        var vTexCoord = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vTexCoord");
    
        GLS.I().GL.vertexAttribPointer(vTexCoord, 2, GLS.I().GL.FLOAT, false, 0, 0);
        GLS.I().GL.enableVertexAttribArray(vTexCoord);
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().V_BUFFER);
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.vertices), GLS.I().GL.STATIC_DRAW);
    
        var vPosition = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vPosition");
    
        GLS.I().GL.vertexAttribPointer(vPosition, 3, GLS.I().GL.FLOAT, false, 0, 0);
        GLS.I().GL.enableVertexAttribArray(vPosition);
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().N_BUFFER);
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.normals), GLS.I().GL.STATIC_DRAW);
    
        var vNormal = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vNormal");
    
        GLS.I().GL.vertexAttribPointer(vNormal, 3, GLS.I().GL.FLOAT, false, 0, 0);
        GLS.I().GL.enableVertexAttribArray(vNormal);
        GLS.I().GL.bindTexture(GLS.I().GL.TEXTURE_2D, this.world.levelTextures.item.textures[this.powerIndex]);
        GLS.I().GL.drawArrays(GLS.I().GL.TRIANGLES, 0, this.vertices.length);

    }
}



