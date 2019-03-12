import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { interval } from "rxjs";
import { SessionService } from '../../shared/services/session.service';
import { initShaders } from '../tux-game-common/InitShaders';
import { flatten, mat4, mult, translate, vec3 } from '../tux-game-common/MV';
import { WebGLUtils } from '../tux-game-common/webgl-utils';
import { World } from '../tux-game/world';
import { GLS } from './gl.service';
import { LevelService } from '../../shared/services/level.service';
import { Level } from 'src/app/models/level';
import { AudioService } from '../audio/audio.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tux',
    templateUrl: './tux.component.html',
    styleUrls: ['./tux.component.scss']
})
export class TuxComponent implements OnInit, AfterViewInit {

    ///////////////
    // Variables //
    ///////////////

    // Canvas in which the game is rendered.
    @ViewChild('canvas') canvas: ElementRef
    
    // Declares a variable indicating whether the current 
    // session has been stored at Firestore or not. 
    public isStored: boolean = false

    // 
    public readyForSurvey: boolean = false
    
    // Status variable that can either be 'ready', 'loading',
    // 'running', 'lost' or 'completed'. The status variable
    // is  
    public status: string

    // UI elements
    public score: string = `00000`
    public lives: number = this.sessionService.getLives()
    public time: string = `00000`

    //////////////////
    // Constructors //
    //////////////////
    /**
     * 
     * Default constructor
     * 
     */
    public constructor(

        private sessionService: SessionService,
        private levelService: LevelService,
        private audioService: AudioService,
        private router: Router

    ) {

        this.sessionService.readyForSurveySubject.subscribe(readyForSurvey => this.readyForSurvey = readyForSurvey)
        this.sessionService.sessionSubject.subscribe(status => {

            status === 'stored' ? this.isStored = true : this.isStored = false

        })

        this.sessionService.statusSubject.subscribe(status => this.status = status)
        this.sessionService.statusSubject.next('ready')
        
        this.sessionService.timeSubject.subscribe(time => this.time = time)
        this.sessionService.lifeSubject.subscribe(lives => this.lives = lives)
        this.sessionService.scoreSubject.subscribe(score => this.score = score)

    }

    ngOnInit(): void {

        if (this.sessionService.tutorialHasBeenFinished === true) {

            this.sessionService.tutorialHasBeenFinished = false
            location.reload()
      
        }

        this.startNewLevel()
     
    }

    /**
     * 
     * @param event 
     *
     */
    @HostListener('document:keydown', ['$event'])
    async handleKey(event: KeyboardEvent) {

        event.key === 'Enter' ? this.startNewLevel() : null

    }

    /**
     * 
     * Retrieves 
     * 
     */
    public async startNewLevel(): Promise<void> {

        // Checks whether the user can progress to the survey.
        if (this.readyForSurvey) {

            // 
            this.progressToSurvey()
            return

        }

        // Checks wheather
        if (this.status === 'ready') {

            this.status = 'loading'

            const level: Level = await this.levelService.getLevel()

            this.init(level)

            this.sessionService.statusSubject.next('running')
            this.isStored === true ? location.reload() : null

        }

        if ((this.status === 'completed' || this.status === 'lost') && this.isStored === true) {

            location.reload() 

        }
    
        // If the current session has been stored successfully,
        // a page refresh is performend. 

    }

    public selectActiveKey(keyCode: number): void {

        // Ensures that the user cannot run left and right at the same time.
        keyCode === 39 ? this.sessionService.keyArray[37] = false : null
        keyCode === 37 ? this.sessionService.keyArray[39] = false : null

        this.sessionService.keyArray[keyCode] = true
        this.sessionService.selectActiveKeySubject.next(keyCode)

    }

    public removeActiveKey(keyCode: number): void {

        this.sessionService.keyArray[keyCode] = false

    }

    /**
     * 
     * Directs the user further to the first part of the survey.
     * 
     */
    public progressToSurvey(): void {

        // Changes the current URL to the start of the survey.
        this.router.navigate(['survey/part_1'])

    }

    /**
     * 
     * @param level 
     */
    private async init(level: Level) {

        GLS.I().lightPosition = vec3(0.0, 1.0, 1.0)

        !GLS.I().GL ? alert("WebGL isn't available") : null

        const extension = GLS.I().GL.getExtension('WEBGL_depth_texture');

        !extension ? alert("Depth Texture Extension Not Applicable") : null

        GLS.I().GL.viewport(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        GLS.I().GL.clearColor(1.0, 1.0, 1.0, 1);

        GLS.I().GL.enable(GLS.I().GL.DEPTH_TEST);
        GLS.I().GL.enable(GLS.I().GL.BLEND);
        GLS.I().GL.blendFunc(GLS.I().GL.SRC_ALPHA, GLS.I().GL.ONE_MINUS_SRC_ALPHA);

        //
        //  Load shaders and initialize attribute buffers
        //

        GLS.I().PROGRAM = initShaders(GLS.I().GL, this.vertexShaderText, this.fragmentShaderText)

        GLS.I().GL.useProgram(GLS.I().PROGRAM);

        GLS.I().V_BUFFER = GLS.I().GL.createBuffer();
        GLS.I().T_BUFFER = GLS.I().GL.createBuffer();
        GLS.I().N_BUFFER = GLS.I().GL.createBuffer();
        GLS.I().S_BUFFER = GLS.I().GL.createBuffer();

        GLS.I().UNIFORM_MODEL = GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "modelMatrix");
        GLS.I().UNIFORM_PROJECTION = GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "perspectiveMatrix");
        GLS.I().UNIFORM_VIEW = GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "viewMatrix");
        GLS.I().UNIFORM_LIGHTPOSITION = GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "lightPostion");
        GLS.I().UNIFORM_SHININESS = GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "shininess");
        GLS.I().UNIFORM_SHADOWMAP = GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "shadowMap");
        GLS.I().UNIFORM_SHADOW_VIEW = GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "shadowViewMatrix");
        GLS.I().UNIFORM_CAMERA_X = GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "cameraX");

        // set initial camera position
        GLS.I().CAMERA_POS = GLS.I().INITIAL_CAMERA_POS.slice(0);

        GLS.I().GAMEWORLD = new World(level, this.sessionService, this.levelService, this.audioService)

        this.audioService.playTheme()

        // for hud initialization
        this.sessionService.resetTimer();
        this.sessionService.myTimer();

        this.render();
    }


    public render() {

        interval(1000 / 60).subscribe(() => {

            requestAnimationFrame(() => {

                GLS.I().GL.clear(GLS.I().GL.COLOR_BUFFER_BIT | GLS.I().GL.DEPTH_BUFFER_BIT);

                // Set the perspective
                GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_PROJECTION, false, flatten(GLS.I().PERSPECTIVE));


                GLS.I().GL.uniform1f(GLS.I().UNIFORM_CAMERA_X, -GLS.I().CAMERA_POS[0]);
                // Set the view
                var vtm = mat4();

                // initial CameraPos set in main to (0, 0, -40) to view all cubes
                vtm = mult(vtm, translate(GLS.I().CAMERA_POS));
                GLS.I().GL.uniformMatrix4fv(GLS.I().UNIFORM_VIEW, false, flatten(vtm));


                //  Set lighting
                GLS.I().GL.uniform3fv(GLS.I().UNIFORM_LIGHTPOSITION, flatten(GLS.I().lightPosition));
                GLS.I().GL.uniform1f(GLS.I().UNIFORM_SHININESS, GLS.I().shininess);

                // Draw the world and everything in it    
                GLS.I().GAMEWORLD.draw();
            });


        });


    }

    ngAfterViewInit() {

        GLS.I().GL = new WebGLUtils().setupWebGL(this.canvas)

    }

    /**
     * 
     * Implements 
     * 
     */
    private vertexShaderText = [

        'attribute vec4 vPosition;',
        'attribute vec3 vNormal;',
        'attribute vec2 vTexCoord;',
        '',
        'varying vec2 fTexCoord;',
        'uniform mat4 modelMatrix;',
        'uniform mat4 perspectiveMatrix;',
        'uniform mat4 viewMatrix;',
        'uniform vec3 lightPosition;',
        'uniform float cameraX;',
        '',
        'varying vec3 fL, fE, fH, fN;',
        '',
        'void main() ',
        '{',
        '    vec3 pos = (viewMatrix * modelMatrix * vPosition).xyz;',
        '    fL = normalize((viewMatrix * vec4(cameraX + 50.0, 200.0, -1.0, 1.0)).xyz - pos); ',
        '    fE = normalize(-pos);',
        '    fH = normalize(fL + fE);',
        '    fN = normalize(viewMatrix * modelMatrix * vec4(vNormal, 0.0)).xyz; ',
        '',
        '    fTexCoord = vTexCoord;',
        '    gl_Position = perspectiveMatrix * viewMatrix * modelMatrix * vPosition;',
        '} '
    ].join('\n')

    private fragmentShaderText = [

        'precision mediump float;',
        '',
        'varying vec3 fL, fE, fH, fN;',
        'varying vec2 fTexCoord;',
        '',
        'uniform sampler2D texture;',
        'uniform float shininess;',
        '',
        'void main()',
        '{',
        'float visibility = 1.0;',
        '',
        'vec4 texColor = texture2D(texture, fTexCoord); ',
        'vec4 ambient = 1.0 * texColor;',
        'float kd = max(dot(fL, fN), 0.0);',
        'vec4 diffuse = visibility * kd * 0.2 * texColor;',
        '',
        'float ks = pow(max(dot(fN, fH),0.0), shininess);',
        'vec4 specular = 0.9 * visibility * ks * vec4(1.0, 1.0, 1.0, 1.0);',
        '',
        'vec4 fColor = ambient + diffuse + specular;',
        '',
        'gl_FragColor = fColor;',
        '}'

    ].join('\n')

}
