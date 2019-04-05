import { quad } from "../commons/webgl-utils";
import { mat4, flatten } from "../commons/MV";
import { World } from "./world";
import { GameService } from "../game.service";

export class Stage {

    ///////////////
    // Variables //
    ///////////////
    public stage: string[][]
    public world: World
    public finishLine: number
    public textureIndexMap: { [x: string]: string | number; X?: number; B?: number; Y?: number; L?: number; P?: number; F?: number; G?: number; S?: number; D?: number; Z?: number; }
    public runningSum: { [x: string]: number[]; } 
    public vertices: { [x: string]: any; }
    public texCoords: { [x: string]: any; }
    public normals: { [x: string]: any; } 

    // public 
    constructor(
        
        private gameService: GameService,
        stage: string[][]
    
    ) {

        this.stage = stage;

        //
        // The finish line is placed at the end of
        // of a stage. 
        //
        this.finishLine = this.stage[0].length - 1

        // Enemy Codes
        // H, J, C, V
        this.textureIndexMap = {
            
            'X': 0, // Ground
            'B': 1, // Brick
            'Y': 2, // Coin
            'L': 2, // Life
            'P': 2, // Snowball
            'F': 2, // Star
            'G': 2, // Wing
            'S': 3, // Brick
            'D': 4, // Brick 2
            'Z': 5, // Finish Line
        
        };
        
        this.runningSum = {}
        this.vertices = {}
        this.texCoords = {}
        this.normals = {}
        
        // Initializes a range of arrays intented
        // to provide WebGL information of what to
        // draw.
        for (let key in this.textureIndexMap) {
        
            this.runningSum[key] = [0]
            this.vertices[key] = []
            this.texCoords[key] = []
            this.normals[key] = []
        
        }

        //
        // Generates all vertices related to the 
        // current stage.
        //
        this.generateVertices()
        
    }

    private generateVertices(): void {
        
        // 
        // Iterates over every line of the stage's representation.
        //
        for (let i = 0; i < this.stage[0].length; i++) {
        
            //
            // Iterates over every character stored within one line.
            // 
            for (let j = 0; j < this.stage.length; j++) {
        
                //
                // Stores the character which is stored at the current point.
                //
                const square: string = this.stage[j][i]
            
                //
                //
                //
                if (i > 0 && j == 0) {
                    
                    for (let key in this.textureIndexMap) {

                        this.runningSum[key].push(this.runningSum[key][i - 1]);

                    }
                }

                //
                //
                //
                if (this.stage[j][i] != '.') {
                    
                    const y = 14 - j;
                    const x = i;

                    // front, right, top, left, bottom
                    quad([x + 1, y + 1, 0], [x + 1, y, 0], [x, y + 1, 0], [x, y, 0], this.vertices[square], this.texCoords[square]);
                    quad([x + 1, y + 1, -3], [x + 1, y, -3], [x + 1, y + 1, 0], [x + 1, y, 0], this.vertices[square], this.texCoords[square]);
                    quad([x + 1, y + 1, -3], [x + 1, y + 1, 0], [x, y + 1, -3], [x, y + 1, 0], this.vertices[square], this.texCoords[square]);
                    quad([x, y + 1, 0], [x, y, 0], [x, y + 1, -3], [x, y, -3], this.vertices[square], this.texCoords[square]);
                    quad([x + 1, y, 0], [x + 1, y, -3], [x, y, 0], [x, y, -3], this.vertices[square], this.texCoords[square]);
                    
                    this.generateNormals(this.normals[square])
                    
                    this.runningSum[square][i] += 30
                    
                    if (this.stage[j][i] == 'Z') {

                        this.finishLine = x;

                    }
                }
            }
            ;
        }
    }
    
    public generateNormals(nBuffer: number[][]) {
        
        // front
        nBuffer.push([0, 0, 1]);
        nBuffer.push([0, 0, 1]);
        nBuffer.push([0, 0, 1]);
        nBuffer.push([0, 0, 1]);
        nBuffer.push([0, 0, 1]);
        nBuffer.push([0, 0, 1]);
        
        // right
        nBuffer.push([1, 0, 0]);
        nBuffer.push([1, 0, 0]);
        nBuffer.push([1, 0, 0]);
        nBuffer.push([1, 0, 0]);
        nBuffer.push([1, 0, 0]);
        nBuffer.push([1, 0, 0]);
        
        // top
        nBuffer.push([0, 1, 0]);
        nBuffer.push([0, 1, 0]);
        nBuffer.push([0, 1, 0]);
        nBuffer.push([0, 1, 0]);
        nBuffer.push([0, 1, 0]);
        nBuffer.push([0, 1, 0]);
        
        // left
        nBuffer.push([-1, 0, 0]);
        nBuffer.push([-1, 0, 0]);
        nBuffer.push([-1, 0, 0]);
        nBuffer.push([-1, 0, 0]);
        nBuffer.push([-1, 0, 0]);
        nBuffer.push([-1, 0, 0]);
        
        // bottom
        nBuffer.push([0, -1, 0]);
        nBuffer.push([0, -1, 0]);
        nBuffer.push([0, -1, 0]);
        nBuffer.push([0, -1, 0]);
        nBuffer.push([0, -1, 0]);
        nBuffer.push([0, -1, 0]);
    }

    draw() {
    
        this.gameService.GL.disable(this.gameService.GL.BLEND);
    
        for (var key in this.textureIndexMap) {
            if (this.vertices[key].length == 0)
                continue;
            var xBoundLeft = Math.max(Math.floor(this.gameService.GAMEWORLD.xBoundLeft) - 2, 0);
            var xBoundRight = Math.min(Math.floor(this.gameService.GAMEWORLD.xBoundRight) + 2, this.stage[0].length - 1);
            var numVertices = this.runningSum[key][xBoundRight] - this.runningSum[key][xBoundLeft] +
                +(this.runningSum[key][xBoundLeft] - ((xBoundLeft == 0) ? 0 : this.runningSum[key][xBoundLeft - 1]));
            var ctm = mat4();
            this.gameService.GL.uniformMatrix4fv(this.gameService.UNIFORM_MODEL, false, flatten(ctm));
            this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.V_BUFFER);
            this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.vertices[key]), this.gameService.GL.STATIC_DRAW);
            var vPosition = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vPosition");
            this.gameService.GL.vertexAttribPointer(vPosition, 3, this.gameService.GL.FLOAT, false, 0, 0);
            this.gameService.GL.enableVertexAttribArray(vPosition);
            this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.N_BUFFER);
            this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.normals[key]), this.gameService.GL.STATIC_DRAW);
            var vNormal = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vNormal");
            this.gameService.GL.vertexAttribPointer(vNormal, 3, this.gameService.GL.FLOAT, false, 0, 0);
            this.gameService.GL.enableVertexAttribArray(vNormal);
            this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.T_BUFFER);
            this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(this.texCoords[key]), this.gameService.GL.STATIC_DRAW);
            var vTexCoord = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vTexCoord");
            this.gameService.GL.vertexAttribPointer(vTexCoord, 2, this.gameService.GL.FLOAT, false, 0, 0);
            this.gameService.GL.enableVertexAttribArray(vTexCoord);
            this.gameService.GL.bindTexture(this.gameService.GL.TEXTURE_2D, this.gameService.GAMEWORLD.levelTextures.stage.textures[this.textureIndexMap[key]]);
            this.gameService.GL.drawArrays(this.gameService.GL.TRIANGLES, ((xBoundLeft == 0) ? 0 : this.runningSum[key][xBoundLeft - 1]), numVertices);
        }
        this.gameService.GL.enable(this.gameService.GL.BLEND);
    }
}


