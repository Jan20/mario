import { quad } from "../mario-common/webgl-utils";
import { mat4, mult, translate, flatten } from "../mario-common/MV"
import { GLS } from "../mario-services/gl.service"
import { World } from "./world/world.component";

export class Background {

    ///////////////
    // Variables //
    ///////////////
    public world: World
    public vertices: any[]
    public texCoords: any[]
    public normals: any[]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(world) {

        this.world = world
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
    public generateVertices(vBuffer, tBuffer): void {

        quad([16, 16, -3], [16, -1, -3], [-1, 16, -3], [-1, -1, -3], vBuffer, tBuffer)

    }

    /**
     * 
     * @param nBuffer 
     * 
     */
    public generateNormals(nBuffer): void {

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
        
        ctm = mult(ctm, translate([GLS.I().INITIAL_CAMERA_POS[0] - GLS.I().CAMERA_POS[0], 0, 0]));
        
        GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_MODEL, false, flatten(ctm));
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
        
        var translatedTexCoords = [];
        
        for (var i = 0; i < this.texCoords.length; i++) {
            translatedTexCoords.push([
                this.texCoords[i][0] + (GLS.I().INITIAL_CAMERA_POS[0] - GLS.I().CAMERA_POS[0]) / 30,
                this.texCoords[i][1]
            ]);
        }
        
        GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().T_BUFFER);
        GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(translatedTexCoords), GLS.I().GL.STATIC_DRAW);
        
        var vTexCoord = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vTexCoord");
        
        GLS.I().GL.vertexAttribPointer(vTexCoord, 2, GLS.I().GL.FLOAT, false, 0, 0);
        GLS.I().GL.enableVertexAttribArray(vTexCoord);
        GLS.I().GL.bindTexture(GLS.I().GL.TEXTURE_2D, this.world.stageTextures[this.world.getLevelIndex()].background.textures[0]);
        GLS.I().GL.drawArrays(GLS.I().GL.TRIANGLES, 0, this.vertices.length);
        GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_PROJECTION, false, flatten(GLS.I().PERSPECTIVE));
    
    }
}



