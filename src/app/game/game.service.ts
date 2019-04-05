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


    public resetService(): void {

        this.lightPosition = null
        this.GAMEWORLD = null
        this.FOVY = 30
        this.ASPECT_RATIO = 1
        this.PERSPECTIVE = perspective(this.FOVY, this.ASPECT_RATIO, 0.1, 500)
        this.INITIAL_CAMERA_POS = vec3(-7.5, -7.5, -7.5/Math.tan(radians(this.FOVY/2)))
        this.GL = null
        this.pixels = null
        this.UNIFORM_MODEL = null
        this.UNIFORM_CAMERA_X = null
        this.UNIFORM_PROJECTION = null
        this.UNIFORM_VIEW = null
        this.V_BUFFER = null
        this.T_BUFFER = null
        this.N_BUFFER = null
        this.S_BUFFER = null
        this.UNIFORM_LIGHTPOSITION = null
        this.UNIFORM_SHININESS = null
        this.UNIFORM_SHADOWMAP = null
        this.UNIFORM_SHADOW_VIEW = null
        this.PROGRAM = null
        this.CAMERA_POS = null
        this.INITIAL_WORLD_BOUND_LEFT = 0
        this.INITIAL_WORLD_BOUND_RIGHT = 14
        this.DRAW_BOUND = 5.5
        this.ENEMY_ALPHA_DEPTH = -0.90
        this.INITIAL_PLAYER_POS = [1, 10, 0]
        this.INITIAL_PLAYER_VEL = [0, 0]
        this.X_VELO_CONSTANTMAX = 8.0
        this.X_VELO_CONSTANT = .0175
        this.X_GROUND_FRICTION = .865
        this.X_AIR_FRICTION = .92
        this.GRAVITY_CONSTANT = -.0075
        this.JUMP_CONSTANT = .26
        this.WALK_CUTOFF = 0.003
        this.ANIM_SPEED = 40
        this.stage = 0
        this.shininess =  50

    }

}