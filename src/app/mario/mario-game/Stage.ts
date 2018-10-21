import { quad } from "../mario-common/webgl-utils";
import { mat4, flatten } from "../mario-common/MV";
import { GLS } from "../mario-services/gl.service";

export class Stage {

    ///////////////
    // Variables //
    ///////////////
    public stage
    public world
    public finishLine
    public texIndexMap
    public runningSum 
    public vertices
    public texCoords
    public normals 

        constructor(world, stage) {
            // DrawableObject.call(this);
            this.stage = stage;
            this.world = world;
            this.finishLine = this.stage[0].length - 1;
            // Enemy Codes (Don't use):
            // H, J, C, V
            this.texIndexMap = {
                'X': 0,
                'B': 1,
                'Y': 2,
                'L': 2,
                'P': 2,
                'F': 2,
                'G': 2,
                'S': 3,
                'D': 4,
                'Z': 5,
            };
            this.runningSum = {};
            this.vertices = {};
            this.texCoords = {};
            this.normals = {};
            for (var key in this.texIndexMap) {
                this.runningSum[key] = [0];
                this.vertices[key] = [];
                this.texCoords[key] = [];
                this.normals[key] = [];
            }
            this.generateVertices();
            //this.generateNormals(this.normals);
        }
        generateVertices() {
            for (var i = 0; i < this.stage[0].length; i++) {
                for (var j = 0; j < this.stage.length; j++) {
                    var currentSquare = this.stage[j][i];
                    if (i > 0 && j == 0) {
                        for (var key in this.texIndexMap)
                            this.runningSum[key].push(this.runningSum[key][i - 1]);
                    }
                    if (this.stage[j][i] != '.') {
                        var y = 14 - j;
                        var x = i;
                        // front, right, top, left, bottom
                        quad([x + 1, y + 1, 0], [x + 1, y, 0], [x, y + 1, 0], [x, y, 0], this.vertices[currentSquare], this.texCoords[currentSquare]);
                        quad([x + 1, y + 1, -3], [x + 1, y, -3], [x + 1, y + 1, 0], [x + 1, y, 0], this.vertices[currentSquare], this.texCoords[currentSquare]);
                        quad([x + 1, y + 1, -3], [x + 1, y + 1, 0], [x, y + 1, -3], [x, y + 1, 0], this.vertices[currentSquare], this.texCoords[currentSquare]);
                        quad([x, y + 1, 0], [x, y, 0], [x, y + 1, -3], [x, y, -3], this.vertices[currentSquare], this.texCoords[currentSquare]);
                        quad([x + 1, y, 0], [x + 1, y, -3], [x, y, 0], [x, y, -3], this.vertices[currentSquare], this.texCoords[currentSquare]);
                        this.generateNormals(this.normals[currentSquare]);
                        this.runningSum[currentSquare][i] += 30;
                        if (this.stage[j][i] == 'Z') {
                            this.finishLine = x;
                        }
                    }
                }
                ;
            }
        }
        generateNormals(nBuffer) {
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
            GLS.I().GL.disable(GLS.I().GL.BLEND);
            for (var key in this.texIndexMap) {
                if (this.vertices[key].length == 0)
                    continue;
                var xBoundLeft = Math.max(Math.floor(this.world.xBoundLeft) - 2, 0);
                var xBoundRight = Math.min(Math.floor(this.world.xBoundRight) + 2, this.stage[0].length - 1);
                var numVertices = this.runningSum[key][xBoundRight] - this.runningSum[key][xBoundLeft] +
                    +(this.runningSum[key][xBoundLeft] - ((xBoundLeft == 0) ? 0 : this.runningSum[key][xBoundLeft - 1]));
                var ctm = mat4();
                GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_MODEL, false, flatten(ctm));
                GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().V_BUFFER);
                GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.vertices[key]), GLS.I().GL.STATIC_DRAW);
                var vPosition = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vPosition");
                GLS.I().GL.vertexAttribPointer(vPosition, 3, GLS.I().GL.FLOAT, false, 0, 0);
                GLS.I().GL.enableVertexAttribArray(vPosition);
                GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().N_BUFFER);
                GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.normals[key]), GLS.I().GL.STATIC_DRAW);
                var vNormal = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vNormal");
                GLS.I().GL.vertexAttribPointer(vNormal, 3, GLS.I().GL.FLOAT, false, 0, 0);
                GLS.I().GL.enableVertexAttribArray(vNormal);
                GLS.I().GL.bindBuffer(GLS.I().GL.ARRAY_BUFFER, GLS.I().T_BUFFER);
                GLS.I().GL.bufferData(GLS.I().GL.ARRAY_BUFFER, flatten(this.texCoords[key]), GLS.I().GL.STATIC_DRAW);
                var vTexCoord = GLS.I().GL.getAttribLocation(GLS.I().PROGRAM, "vTexCoord");
                GLS.I().GL.vertexAttribPointer(vTexCoord, 2, GLS.I().GL.FLOAT, false, 0, 0);
                GLS.I().GL.enableVertexAttribArray(vTexCoord);
                GLS.I().GL.bindTexture(GLS.I().GL.TEXTURE_2D, this.world.stageTextures[this.world.currStageIndex].stage.textures[this.texIndexMap[key]]);
                GLS.I().GL.drawArrays(GLS.I().GL.TRIANGLES, ((xBoundLeft == 0) ? 0 : this.runningSum[key][xBoundLeft - 1]), numVertices);
            }
            GLS.I().GL.enable(GLS.I().GL.BLEND);
        }
    }


