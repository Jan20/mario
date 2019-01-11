import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../analytics/services/session.service';
import { Howl } from '../../mario-common/howler';
import { loadImages } from '../../mario-common/textures';
import { GLS } from '../../services/gl.service';
import { LevelService } from '../../services/level.service';
import { Background } from '../Background';
import { Enemy } from '../Enemy';
import { continueGame, finishLevel, pad, pauseGame } from '../hud';
import { Player } from '../Player';
import { Stage } from '../Stage';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class World implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public levelIndex: number
  public xBoundLeft: number
  public xBoundRight: any
  public drawBound: number
  public enemies: Enemy[] = []
  public deadEnemies: Enemy[] = []
  public items: any[] = []
  public projectiles: any[] = []
  public score: number
  public keyMap: any[] = []
  public player: Player
  public stage: Stage
  public back: Background
  public marioTheme: any
  public bgMusic: any[]
  public stageTextures: any
  public level: string[][] = this.levelService.getLevel()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(
      
    private sessionService: SessionService,
    private levelService: LevelService,    
  
    ) {   

    this.xBoundLeft = GLS.I().INITIAL_WORLD_BOUND_LEFT
    this.xBoundRight = GLS.I().INITIAL_WORLD_BOUND_RIGHT
    this.drawBound = GLS.I().DRAW_BOUND
    
    //
    // might pick this index on initial screen
    //
    this.levelIndex = 0
    
    //
    // need to do this before constructing the stage
    //
    this.enemies
    this.generateEnemies()
    this.score = 0
    this.player = new Player(this, sessionService, levelService)
    this.stage = new Stage(this, this.levelService.getLevel())
   

    this.back = new Background(this)
    
    //
    // Load sounds here so I don't mess up the json magic
    //
    this.marioTheme = new Howl({
    
        urls: ['.asdf'],
        loop: true,
        buffer: true,
        volume: 0.45,
    
    })
    
    this.bgMusic = []
    this.bgMusic.push(this.marioTheme)

    this.stageTextures = [
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
                "/assets/Images/Mario/Char/walk4.png",
                "/assets/Images/Mario/Char/walk4back.png",
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
    },
      
]
      
    // for moving the player on button presses
    let world = this
    
    document.addEventListener('keydown', function (evt) {

        world.keyMap[evt.keyCode] = true
        if (evt.keyCode == 37 && !GLS.I().pauseMode) {
            world.player.texDir = 1
        }
        else if (evt.keyCode == 39 && !GLS.I().pauseMode) {
            world.player.texDir = 0
            // press 'p' for pause menu
        }
        else if (evt.keyCode == 80) {
            GLS.I().pauseMode = 1
            pauseGame()
            // change to continue
        }
        else if (evt.keyCode == 38 && GLS.I().pauseMode) {
            document.getElementById("selectRestart").style.display = "none"
            document.getElementById("selectContinue").style.display = "inline"
            GLS.I().continueOrRestart = 0
            // change to restart
        }
        else if (evt.keyCode == 40 && GLS.I().pauseMode) {
            document.getElementById("selectRestart").style.display = "inline"
            document.getElementById("selectContinue").style.display = "none"
            GLS.I().continueOrRestart = 1
            // select item in pause mode with enter key
        }
        else if (evt.keyCode == 13 && GLS.I().pauseMode) {
            if (GLS.I().continueOrRestart)
                location.reload()
            else
            continueGame()
        }
    }, false)
    document.addEventListener('keyup', function (evt) {
        world.keyMap[evt.keyCode] = false
    }, false)
    this.loadTextures()
    this.bgMusic[this.levelIndex].play()

  }

  
  
    ///////////////
    // Functions //
    ///////////////
    ngOnInit(): void {
  
  
    }


  public loadTextures() {
    
    for (let i = 0; i < this.stageTextures.length; i++) {
        for (let key in this.stageTextures[i]) {
            
            if (!Array.isArray(this.stageTextures[i][key])) {
            
                loadImages(this.stageTextures[i][key].fileNames, this.stageTextures[i][key].textures);
            
            }
            
            else {
            
                for (var j = 0; j < this.stageTextures[i][key].length; j++) {
            
                    loadImages(this.stageTextures[i][key][j].fileNames, this.stageTextures[i][key][j].textures);
            
                }
            }
        }
    }
    ;
  }

    public draw() {
        
        if (this.player.pos[0] > this.stage.finishLine) {

            finishLevel();

        }
        ///////////////////////////////////////
        // TODO: only draw what can be seen? //
        ///////////////////////////////////////
          this.back.draw();
        this.stage.draw();
        this.player.draw();

        /////////////////
        /// Todo //////////
        ////////////////////
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
  public getScore(): void {
  
      document.getElementById("score").innerHTML = pad(this.score)
      return

  }
  
  /**
   * 
   * 
   */
  public getLives(): void {
  
      document.getElementById("lives").innerHTML = this.player.lives
      return
  
  }
  
  /**
   * 
   * 
   * 
   */
  public getWorldLevel(): void {
  
      document.getElementById("worldLevel").innerHTML = (this.levelIndex + 1).toString()
      return
  
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
              var stage = this.level
              var currentSquare = stage[j][i];
              if (currentSquare == 'C') {
                  // with probability, set enemy to 'A' (smart)
                  if (Math.random() < 1) {
                      currentSquare = 'A'
                  }
                  stage[j][i] = '.'
                  // get movement bounds based on stage
                  var xMin = 0;
                  var xMax = Math.ceil(this.level[0].length);
                  //min
                  for (var k = i - 1; k >= 0; k--)
                      if (stage[j][k] != '.' || stage[j + 1][k] == '.') {
                          xMin = k + 1;
                          break;
                      }
                  // max
                  for (var k = i + 1; k < Math.ceil(this.level[0].length); k++)
                      if (stage[j][k] != '.' || stage[j + 1][k] == '.') {
                          xMax = k - 1;
                          break;
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

  /////////////
  // Getters //
  /////////////
  /**
   * 
   * 
   * 
   */
  public getLevelIndex(): number {

      return this.levelIndex

  }

  /////////////
  // Setters //
  /////////////
  /**
   * 
   * 
   * 
   * @param levelIndex 
   */
  public setLevelIndex(levelIndex: number): void {

      this.levelIndex = levelIndex

  }
}
