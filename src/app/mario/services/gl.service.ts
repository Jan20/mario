import { perspective, radians, vec3 } from "../mario-common/MV";
import { Injectable } from '@angular/core';
import { World } from "../mario-game/world";

export class GLS {

    ///////////////
    // Variables //
    ///////////////
    private static instance: GLS
    public lightPosition
    public GAMEWORLD: World
        
    // correct camera view
    public FOVY = 30
    public ASPECT_RATIO = 1;

    public PERSPECTIVE = perspective(this.FOVY, this.ASPECT_RATIO, 0.1, 500);

    public INITIAL_CAMERA_POS = vec3(-7.5, -7.5, -7.5/Math.tan(radians(this.FOVY/2)))

    public GL: WebGLRenderingContext
    public pixels;
        
    public UNIFORM_MODEL;
    public UNIFORM_CAMERA_X;

    // perspective
    public UNIFORM_PROJECTION;
    public UNIFORM_VIEW;
    public V_BUFFER;
    public T_BUFFER;
    public N_BUFFER
    public S_BUFFER

    //light
    public UNIFORM_LIGHTPOSITION;
    public UNIFORM_SHININESS;
    public UNIFORM_SHADOWMAP;
    public UNIFORM_SHADOW_VIEW;

    public PROGRAM: WebGLProgram
    public CAMERA_POS: any

    /////////////////////////////
    // World Related Constants //
    /////////////////////////////
    public INITIAL_WORLD_BOUND_LEFT: number = 0;
    public INITIAL_WORLD_BOUND_RIGHT: number = 14;
    public DRAW_BOUND: number = 5.5;

    public ENEMY_ALPHA_DEPTH: number = 0.01;

    //////////////////////////////
    // Player Related Constants //
    //////////////////////////////
    public INITIAL_PLAYER_POS = [1, 10, 0];
    public INITIAL_PLAYER_VEL = [0, 0];
    public INITIAL_PLAYER_LIVES = 3;

    public X_VELO_CONSTANTMAX = 8.0;
    public X_VELO_CONSTANT = .0175;
    public X_GROUND_FRICTION = .865;
    public X_AIR_FRICTION = .92;
    public GRAVITY_CONSTANT = -.0075;
    public JUMP_CONSTANT = .27;
    public WALK_CUTOFF = 0.003;
    // public ANIM_SPEED = 80
    public ANIM_SPEED = 40

    
    ////////////
    // WEB GL //
    ////////////
    public stage: number = 0;
    public shininess: number =  50

    //////////////////
    // Constructors //
    //////////////////
    private constructor() {}

    ///////////////
    // Functions //
    ///////////////
    public static I() {

        if (this.instance === undefined) {

            this.instance = new GLS()

        }

        return this.instance

    }

    

}