import { perspective, radians, vec3 } from "./commons/MV"

export class GameService {

    ///////////////
    // Variables //
    ///////////////
    public lightPosition: number[]
    public GAMEWORLD: any
        
    // correct camera view
    public FOVY: number = 30
    public ASPECT_RATIO: number = 1

    public PERSPECTIVE = perspective(this.FOVY, this.ASPECT_RATIO, 0.1, 500)

    public INITIAL_CAMERA_POS = vec3(-7.5, -7.5, -7.5/Math.tan(radians(this.FOVY/2)))

    public GL: WebGLRenderingContext
    public pixels: any
        
    public UNIFORM_MODEL: WebGLUniformLocation
    public UNIFORM_CAMERA_X: WebGLUniformLocation

    // perspective
    public UNIFORM_PROJECTION: WebGLUniformLocation
    public UNIFORM_VIEW: WebGLUniformLocation
    public V_BUFFER: WebGLBuffer
    public T_BUFFER: WebGLBuffer
    public N_BUFFER: WebGLBuffer
    public S_BUFFER: WebGLBuffer

    //light
    public UNIFORM_LIGHTPOSITION: WebGLUniformLocation
    public UNIFORM_SHININESS: WebGLUniformLocation
    public UNIFORM_SHADOWMAP: WebGLUniformLocation
    public UNIFORM_SHADOW_VIEW: WebGLUniformLocation
    public PROGRAM: WebGLProgram
    public CAMERA_POS: number[]

    /////////////////////////////
    // World Related Constants //
    /////////////////////////////
    public INITIAL_WORLD_BOUND_LEFT: number = 0
    public INITIAL_WORLD_BOUND_RIGHT: number = 14
    public DRAW_BOUND: number = 5.5
    public ENEMY_ALPHA_DEPTH: number = -0.90

    //////////////////////////////
    // Player Related Constants //
    //////////////////////////////
    public INITIAL_PLAYER_POS = [1, 10, 0]
    public INITIAL_PLAYER_VEL = [0, 0]

    public X_VELO_CONSTANTMAX: number = 8.0
    public X_VELO_CONSTANT: number = .0175
    public X_GROUND_FRICTION: number = .865
    public X_AIR_FRICTION: number = .92
    public GRAVITY_CONSTANT: number = -.0075
    public JUMP_CONSTANT: number = .26
    public WALK_CUTOFF = 0.003
    public ANIM_SPEED: number = 40
    
    ////////////
    // WEB GL //
    ////////////
    public stage: number = 0
    public shininess: number =  50

    //////////////////
    // Constructors //
    //////////////////
    public constructor() {}

}