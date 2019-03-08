import { SessionService } from '../../analytics/services/session.service';
import { loadImages } from '../tux-tutorial-common/textures';
import { GLS } from '../tux-tutorial/gl.service';
import { LevelService } from '../services/level.service';
import { Background } from './Background';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { Stage } from './Stage';
import { Level } from 'src/app/models/level';
import { AudioService } from '../audio/audio.service';

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
    public keyMap = []
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
                    "/assets/Images/Mario/Char/idle.png",
                    "/assets/Images/Mario/Char/idleback.png",
                    "/assets/Images/Mario/Char/walk1.png",
                    "/assets/Images/Mario/Char/walk1back.png",
                    "/assets/Images/Mario/Char/walk2.png",
                    "/assets/Images/Mario/Char/walk2back.png",
                    "/assets/Images/Mario/Char/walk3.png",
                    "/assets/Images/Mario/Char/walk3back.png",
                    "/assets/Images/Mario/Char/walk4.png",
                    "/assets/Images/Mario/Char/walk4back.png",
                    "/assets/Images/Mario/Char/walk5.png",
                    "/assets/Images/Mario/Char/walk5back.png",
                    // "/assets/Images/Mario/Char/walk4.png",
                    // "/assets/Images/Mario/Char/walk4back.png",
                    "/assets/Images/Mario/Char/jump.png",
                    "/assets/Images/Mario/Char/jumpback.png"
                ],
                'textures': []
            },
            'enemies': [
                {
                    'fileNames': [
                        "/assets/Images/Mario/Enemies/Crawler/idle.png",
                        "/assets/Images/Mario/Enemies/Crawler/idleback.png",
                        "/assets/Images/Mario/Enemies/Crawler/walk1.png",
                        "/assets/Images/Mario/Enemies/Crawler/walk1back.png",
                        "/assets/Images/Mario/Enemies/Crawler/walk2.png",
                        "/assets/Images/Mario/Enemies/Crawler/walk2back.png",
                        "/assets/Images/Mario/Enemies/Crawler/walk3.png",
                        "/assets/Images/Mario/Enemies/Crawler/walk3back.png",
                    ],
                    'textures': []
                },
                {
                    'fileNames': [
                        "/assets/Images/Mario/Enemies/Jumper/idle.png",
                        "/assets/Images/Mario/Enemies/Jumper/idleback.png"
                    ],
                    'textures': []
                },
                {
                    'fileNames': [
                        "/assets/Images/Mario/Enemies/Flyer/fly1.png",
                        "/assets/Images/Mario/Enemies/Flyer/fly1back.png",
                        "/assets/Images/Mario/Enemies/Flyer/fly2.png",
                        "/assets/Images/Mario/Enemies/Flyer/fly2back.png",
                    ],
                    'textures': []
                },
                {
                    'fileNames': [
                        "/assets/Images/Mario/Enemies/Flyer/fly1.png",
                        "/assets/Images/Mario/Enemies/Flyer/fly1back.png",
                        "/assets/Images/Mario/Enemies/Flyer/fly2.png",
                        "/assets/Images/Mario/Enemies/Flyer/fly2back.png",
                    ],
                    'textures': []
                }
            ],
            'projectile': {
                'fileNames': [
                    "/assets/Images/Mario/projectile.png"
                ],
                'textures': []
            },
            'item': {
                'fileNames': [
                    "/assets/Images/Mario/Power-ups/coin.png",
                    "/assets/Images/Mario/Power-ups/life.png",
                    "/assets/Images/Mario/Power-ups/fireball.png",
                    "/assets/Images/Mario/Power-ups/star.png",
                    "/assets/Images/Mario/Power-ups/wings.png"
                ],
                'textures': []
            },
            'background': {
                'fileNames': [
                    "/assets/Images/Mario/background.png"
                ],
                'textures': []
            },
            'stage': {
                'fileNames': [
                    "/assets/Images/Mario/Stage/groundblock.png",
                    "/assets/Images/Mario/Stage/brickblock.png",
                    "/assets/Images/Mario/Stage/itemblock.png",
                    "/assets/Images/Mario/Stage/coinblock.png",
                    "/assets/Images/Mario/Stage/blockblock.png",
                    "/assets/Images/checkerboard.jpg"
                ],
                'textures': []
            }
        }

        // for moving the player on button presses
        let world = this

        document.addEventListener('keydown', function (evt) {

            world.keyMap[evt.keyCode] = true
            if (evt.keyCode == 37) {
                world.player.texDir = 1
            }
            else if (evt.keyCode == 39) {
                world.player.texDir = 0
            }

         
        }, false)
        document.addEventListener('keyup', function (evt) {
            world.keyMap[evt.keyCode] = false
        }, false)
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
            this.sessionService.returnToControls()
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
