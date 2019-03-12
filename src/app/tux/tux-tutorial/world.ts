import { Level } from 'src/app/models/level';
import { LevelService } from '../../shared/services/level.service';
import { SessionService } from '../../shared/services/session.service';
import { AudioService } from '../audio/audio.service';
import { loadImages } from '../tux-tutorial-common/textures';
import { GLS } from '../tux-component/gl.service';
import { Background } from './Background';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { Stage } from './Stage';

export class World {

    ///////////////
    // Variables //
    ///////////////
    public xBoundLeft: number
    public xBoundRight: number
    public drawBound: number
    public enemies: Enemy[] = []
    public deadEnemies: Enemy[] = []
    public items = []
    public projectiles  = []
    public player: Player
    public stage: Stage
    public background: Background

    public levelTextures: any
    public level: string[][]
    public sessionService: SessionService
    public audioService: AudioService

    public hasFinished: boolean = false

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        
        level: Level, 
        sessionService: SessionService, 
        levelService: LevelService,
        audioService: AudioService
        
    ) {

        this.sessionService = sessionService
        this.audioService = audioService
        this.level = level.representation

        this.xBoundLeft = GLS.I().INITIAL_WORLD_BOUND_LEFT
        this.xBoundRight = GLS.I().INITIAL_WORLD_BOUND_RIGHT
        this.drawBound = GLS.I().DRAW_BOUND

        //
        // need to do this before constructing the stage
        //
        this.enemies
        this.generateEnemies()
        this.player = new Player(this, sessionService, levelService, audioService)
        this.stage = new Stage(this, level.representation)

        this.background = new Background(this)

        this.levelTextures =
        
        {
            'player': {
                'fileNames': [
                    "/assets/Images/tux/Char/idle.png",
                    "/assets/Images/tux/Char/idleback.png",
                    "/assets/Images/tux/Char/walk1.png",
                    "/assets/Images/tux/Char/walk1back.png",
                    "/assets/Images/tux/Char/walk2.png",
                    "/assets/Images/tux/Char/walk2back.png",
                    "/assets/Images/tux/Char/walk3.png",
                    "/assets/Images/tux/Char/walk3back.png",
                    "/assets/Images/tux/Char/walk4.png",
                    "/assets/Images/tux/Char/walk4back.png",
                    "/assets/Images/tux/Char/walk5.png",
                    "/assets/Images/tux/Char/walk5back.png",
                    "/assets/Images/tux/Char/jump.png",
                    "/assets/Images/tux/Char/jumpback.png"
                ],
                'textures': []
            },
            'enemies': [
                {
                    'fileNames': [
                        "/assets/Images/tux/Enemies/Crawler/idle.png",
                        "/assets/Images/tux/Enemies/Crawler/idleback.png",
                        "/assets/Images/tux/Enemies/Crawler/walk1.png",
                        "/assets/Images/tux/Enemies/Crawler/walk1back.png",
                        "/assets/Images/tux/Enemies/Crawler/walk2.png",
                        "/assets/Images/tux/Enemies/Crawler/walk2back.png",
                        "/assets/Images/tux/Enemies/Crawler/walk3.png",
                        "/assets/Images/tux/Enemies/Crawler/walk3back.png",
                    ],
                    'textures': []
                },
                {
                    'fileNames': [
                        "/assets/Images/tux/Enemies/Jumper/idle.png",
                        "/assets/Images/tux/Enemies/Jumper/idleback.png"
                    ],
                    'textures': []
                },
                {
                    'fileNames': [
                        "/assets/Images/tux/Enemies/Flyer/fly1.png",
                        "/assets/Images/tux/Enemies/Flyer/fly1back.png",
                        "/assets/Images/tux/Enemies/Flyer/fly2.png",
                        "/assets/Images/tux/Enemies/Flyer/fly2back.png",
                    ],
                    'textures': []
                },
                {
                    'fileNames': [
                        "/assets/Images/tux/Enemies/Flyer/fly1.png",
                        "/assets/Images/tux/Enemies/Flyer/fly1back.png",
                        "/assets/Images/tux/Enemies/Flyer/fly2.png",
                        "/assets/Images/tux/Enemies/Flyer/fly2back.png",
                    ],
                    'textures': []
                }
            ],
            'projectile': {
                'fileNames': [
                    "/assets/Images/tux/projectile.png"
                ],
                'textures': []
            },
            'item': {
                'fileNames': [
                    "/assets/Images/tux/Power-ups/coin.png",
                    "/assets/Images/tux/Power-ups/life.png",
                    "/assets/Images/tux/Power-ups/fireball.png",
                    "/assets/Images/tux/Power-ups/star.png",
                    "/assets/Images/tux/Power-ups/wings.png"
                ],
                'textures': []
            },
            'background': {
                'fileNames': [
                    "/assets/Images/tux/background.png"
                ],
                'textures': []
            },
            'stage': {
                'fileNames': [
                    "/assets/Images/tux/Stage/groundblock.png",
                    "/assets/Images/tux/Stage/brickblock.png",
                    "/assets/Images/tux/Stage/itemblock.png",
                    "/assets/Images/tux/Stage/coinblock.png",
                    "/assets/Images/tux/Stage/blockblock.png",
                    "/assets/Images/checkerboard.jpg"
                ],
                'textures': []
            }
        }

        let world = this
        

        //
        // Mechanism to facilitate movements, by catching key events
        // and mapping such events to a an array 
        // 
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            
            console.log(event)
            console.log(event.keyCode)
            this.sessionService.keyArray[event.keyCode] = true
            event.key === 'ArrowLeft' ? world.player.texDir = 1 : null
            event.key === 'ArrowRight' ? world.player.texDir = 0 : null
         
        })

        document.addEventListener('keyup', (event: KeyboardEvent) => this.sessionService.keyArray[event.keyCode] = false)

  
        this.sessionService.selectActiveKeySubject.subscribe(keyCode => {

            console.log(keyCode)
            keyCode === 37 ? world.player.texDir = 1 : null
            keyCode === 39 ? world.player.texDir = 0 : null

        })

        this.loadTextures()
            
    }




    ///////////////
    // Functions //
    ///////////////
    ngOnInit(): void {


    }

    /**
     * 
     * 
     * 
     */
    public loadTextures(): void {

        for (let key in this.levelTextures) {

            if (!Array.isArray(this.levelTextures[key])) {

                loadImages(this.levelTextures[key].fileNames, this.levelTextures[key].textures);

            }

            else {

                for (var j = 0; j < this.levelTextures[key].length; j++) {

                    loadImages(this.levelTextures[key][j].fileNames, this.levelTextures[key][j].textures);

                }
            }
        }

    }

    public draw(): void {

        // Returns true if the player has reached
        // the end of the level.
        if (this.player.pos[0] > this.stage.finishLine) {
            
            this.sessionService.finishSubject.next(true)
            this.sessionService.tutorialHasBeenFinished = true
            
            this.audioService.stopMusic()
            this.sessionService.setProgress(200)
            this.audioService.playFinished()
            // Stores all collected gameplay information
            // of the current session at Firestore.
            this.sessionService.setProgress(200)
            this.player.resetToDefault()
            this.player.restartLevel()
            this.hasFinished = true
            this.sessionService.statusSubject.next('completed')
        }
        
        //
        //
        //
        this.background.draw();
        this.stage.draw();

        !this.hasFinished? this.player.draw() : null

        /////////////////
        /// Todo ////////
        /////////////////
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].pos[0] + 1 > this.xBoundLeft && this.enemies[i].pos[0] - 1 < this.xBoundRight)
                this.enemies[i].draw();
        }

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].lives == 0) {
                this.items.splice(i, 1);
                i--;
            }
            else
                this.items[i].draw();
        }

        for (var i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].lives == 0) {
                this.projectiles.splice(i, 1);
                i--;
            }
            else
                this.projectiles[i].draw();
        }

        // Update drawing boundaries based on player pos
        // Also need to adjust the CAMERA_POS variable from webgl js
        // Adjust Screen Right
        var playerEdgeDist = this.player.pos[0] - (this.xBoundRight - this.drawBound);
        
        if (playerEdgeDist > 0) {
            this.xBoundRight += playerEdgeDist;
            this.xBoundLeft += playerEdgeDist;
        }
        
        // Adjust Screen Left, only after it has moved right
        if (this.xBoundLeft > 0) {
            var playerEdgeDist = (this.xBoundLeft + this.drawBound) - this.player.pos[0];
            if (playerEdgeDist > 0) {
                this.xBoundRight -= playerEdgeDist;
                this.xBoundLeft -= playerEdgeDist;
            }
        }

        // set camera pos
        GLS.I().CAMERA_POS[0] = -((GLS.I().INITIAL_WORLD_BOUND_RIGHT + 1 - GLS.I().INITIAL_WORLD_BOUND_LEFT) / 2 + this.xBoundRight - GLS.I().INITIAL_WORLD_BOUND_RIGHT);
        GLS.I().lightPosition[0] = this.xBoundRight;

    }

    /**
     * 
     * 
     * 
     */
    public generateEnemies(): void {

        // Go through stage and create enemies
        // Might want to store the stages themselves somewhere
        // TODO store the stages somwhere
        for (let i = 0; i < this.level[0].length; i++) {
            for (let j = 0; j < this.level.length; j++) {
                // G = ground crawler
                // J = Jumper
                // A = aerial

                // Assume these are all placed smartly, too much unnecessary checking otherwise
                let stage = this.level
                let currentSquare = stage[j][i];
                
                if (currentSquare == 'C') {
                
                    // with probability, set enemy to 'A' (smart)
                    
                    currentSquare = 'A'
                    
                    
                    stage[j][i] = '.'
                    
                    // get movement bounds based on stage
                    
                    let xMin = 0;
                    let xMax = Math.ceil(this.level[0].length);
                    //min
                    for (let k = i - 1; k >= 0; k--){
                        
                        if (stage[j][k] != '.' || stage[j + 1][k] == '.') {
                            xMin = k + 1;
                            break;
                        }
                    }
                    
                    // max
                    for (var k = i + 1; k < Math.ceil(this.level[0].length); k++){

                        if (stage[j][k] != '.' || stage[j + 1][k] == '.') {
                            xMax = k - 1;
                            break;
                        }
                    
                    }
                        
                    this.enemies.push(new Enemy(this, [i, 14 - j, GLS.I().ENEMY_ALPHA_DEPTH += .00001], xMin, xMax, 14 - j, 14 - j, currentSquare));
                    stage[j][i] = '.';
                
                }
                else if (currentSquare == 'J') {
                    this.enemies.push(new Enemy(this, [i, 14 - j, GLS.I().ENEMY_ALPHA_DEPTH += .00001], i, i, 14 - j, (14 - j) + 2, currentSquare));
                    stage[j][i] = '.';
                }
                else if (currentSquare == 'H') {
                    this.enemies.push(new Enemy(this, [i, 14 - j, GLS.I().ENEMY_ALPHA_DEPTH += .00001], i, i + 3, 14 - j, 14 - j, currentSquare));
                    stage[j][i] = '.';
                }
                else if (currentSquare == 'V') {
                    this.enemies.push(new Enemy(this, [i, 14 - j, GLS.I().ENEMY_ALPHA_DEPTH += .00001], i, i, 14 - (j + 3), 14 - j, currentSquare));
                    stage[j][i] = '.';
                }
            }
        }
    }



}
