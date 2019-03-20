import { flatten, mat4, mult, translate } from "../commons/MV";
import { quad } from "../commons/webgl-utils";
import { GameService } from "../game.service";

export class Background {

    ///////////////
    // Variables //
    ///////////////
    public vertices: any[] 
    public texCoords: any[] | any[][]
    public normals: any[]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        
        private gameService: GameService,
    
    ) {

        this.vertices = []
        this.texCoords = []
        this.normals = []
        this.generateVertices(this.vertices, this.texCoords)
        this.generateNormals(this.normals)
    
    }

    ///////////////
    // Functions //
    ///////////////
    /**
     * 
     * 
     * 
     * @param vBuffer 
     * @param tBuffer 
     */
    public generateVertices(vBuffer: any, tBuffer: any): void {

        quad([16, 16, -3], [16, -1, -3], [-1, 16, -3], [-1, -1, -3], vBuffer, tBuffer)

    }

    /**
     * 
     * @param nBuffer 
     * 
     */
    public generateNormals(nBuffer: number[][]): void {

        for (var i = 0; i < 6; i++){

            nBuffer.push([1, 0, 0]);
 
        }
            
    }

    /**
     * 
     * 
     * 
     */
    public draw(): void {

        let ctm = mat4();
        
        ctm = mult(ctm, translate([this.gameService.INITIAL_CAMERA_POS[0] - this.gameService.CAMERA_POS[0], 0, 0]));
        
        this.gameService.GL.uniformMatrix4fv(this.gameService.UNIFORM_MODEL, false, flatten(ctm));
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
        
        var translatedTexCoords = [];
        
        for (var i = 0; i < this.texCoords.length; i++) {
            translatedTexCoords.push([
                this.texCoords[i][0] + (this.gameService.INITIAL_CAMERA_POS[0] - this.gameService.CAMERA_POS[0]) / 30,
                this.texCoords[i][1]
            ]);
        }
        
        this.gameService.GL.bindBuffer(this.gameService.GL.ARRAY_BUFFER, this.gameService.T_BUFFER);
        this.gameService.GL.bufferData(this.gameService.GL.ARRAY_BUFFER, flatten(translatedTexCoords), this.gameService.GL.STATIC_DRAW);
        
        var vTexCoord = this.gameService.GL.getAttribLocation(this.gameService.PROGRAM, "vTexCoord");
        
        this.gameService.GL.vertexAttribPointer(vTexCoord, 2, this.gameService.GL.FLOAT, false, 0, 0);
        this.gameService.GL.enableVertexAttribArray(vTexCoord);
        this.gameService.GL.bindTexture(this.gameService.GL.TEXTURE_2D, this.gameService.GAMEWORLD.levelTextures.background.textures[0]);
        this.gameService.GL.drawArrays(this.gameService.GL.TRIANGLES, 0, this.vertices.length);
        this.gameService.GL.uniformMatrix4fv(this.gameService.UNIFORM_PROJECTION, false, flatten(this.gameService.PERSPECTIVE));
    
    }
}



