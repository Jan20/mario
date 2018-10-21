import { GLS } from "../mario-services/gl.service";
import { mat4, mult, translate, rotate, flatten } from "../mario-common/MV";
import { MovableObject } from "./MoveableObject";
import { texCoord } from "../mario-common/textures";

var PROJECTILE_X_VELO = GLS.I().X_VELO_CONSTANT * 12;

export class Projectile extends MovableObject{
    vertices: any[];
    texCoords: any[];
    normals: any[];
    rotationAngle: number;
    rowsToCheck: any;
    xBoundLeft: number;
    xBoundRight: number;
    constructor(world, pos, rowsToCheck) {
        super(world, pos, [PROJECTILE_X_VELO, 0], 1)
        
        this.vertices = [];
        this.texCoords = [];
        this.normals = [];
        this.rotationAngle = 0;
        this.generateVertices(this.vertices, this.texCoords, this.normals);
        this.rowsToCheck = rowsToCheck;
        this.xBoundLeft = 0;
        this.xBoundRight = Math.ceil(GLS.I().STAGES[world.currStageIndex][0].length);
        this.velocity[0] = (this.world.player.texDir == 0) ? this.velocity[0] : -this.velocity[0];
        for (var i = 0; i < this.rowsToCheck.length; i++) {
            // min
            for (var k = Math.floor(this.pos[0]); k >= 0; k--)
                if (this.world.stage.stage[14 - (this.rowsToCheck[i])][k] != '.') {
                    this.xBoundLeft = k + 1;
                    break;
                }
            // max
            for (var k = Math.floor(this.pos[0]); k < Math.ceil(GLS.I().STAGES[world.currStageIndex][0].length); k++)
                if (this.world.stage.stage[14 - (this.rowsToCheck[i])][k] != '.') {
                    this.xBoundRight = k - 1;
                    break;
                }
        }
    }
    generateVertices(buffer, texbuffer, normalbuffer) {
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
    move() {
        this.pos[0] += this.velocity[0];
        if (this.pos[0] >= this.xBoundRight || this.pos[0] <= this.xBoundLeft) {
            this.lives = 0;
        }
        // HANDLE Enemy collisions, using world's list of enemies
        for (var i = 0; i < this.world.enemies.length; i++) {
            var curEnemy = this.world.enemies[i];
            if (!(curEnemy.pos[0] + 1 > this.xBoundLeft && curEnemy.pos[0] - 1 < this.xBoundRight))
                continue;
            // Bounding boxes intersect
            var adjustedEnemyPos = curEnemy.pos[0] + (1 - curEnemy.enemyWidth) / 2;
            if ((Math.abs(this.pos[0] - adjustedEnemyPos)) * 2 < (this.velocity[0] + curEnemy.enemyWidth) &&
                (Math.abs(this.pos[1] - curEnemy.pos[1])) * 2 < (.5 + curEnemy.enemyHeight)) {
                // Need to detect which collision happened, vertical or horizontal
                this.lives = 0;
                this.world.score += 100;
                this.world.getScore();
                var enemyKillSound = new Audio('../Sound/Stomp.mp3');
                enemyKillSound.play();
                this.world.deadEnemies.push(this.world.enemies[i]);
                this.world.enemies.splice(i, 1);
                i--;
            }
        }
    }
    draw() {
        if (!GLS.I().pauseMode) {
            this.move();
        }
        var ctm = mat4();
        ctm = mult(ctm, translate([0, 0, 0.5]));
        ctm = mult(ctm, translate(this.pos));
        ctm = mult(ctm, translate([.5, .5, 0]));
        ctm = mult(ctm, rotate(this.rotationAngle, [0, 0, 1]));
        ctm = mult(ctm, translate([-.5, -.5, 0]));
        GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_MODEL, false, flatten(ctm));
        this.rotationAngle += 12;
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
        GLS.I().GL.bindTexture(GLS.I().GL.TEXTURE_2D, this.world.stageTextures[this.world.currStageIndex].projectile.textures[0]);

        console.log(this.vertices.length)
        GLS.I().GL.drawArrays(GLS.I().GL.TRIANGLES, 0, this.vertices.length);
    }
}



