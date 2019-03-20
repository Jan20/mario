import { GameService } from '../game.service';
import { vec2 } from './MV';

export class Textures {

    ///////////////
    // Variables //
    ///////////////

    public texCoord = [

        vec2([0,0]),
        vec2([0,1]),
        vec2([1,1]),
        vec2([1,0]),
    
    ];

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        private gameService: GameService

    ) {


    }

    public configureTexture(image, textures, i) {
    
        textures[i] = this.gameService.GL.createTexture();
        this.gameService.GL.bindTexture(this.gameService.GL.TEXTURE_2D, textures[i]);
        
        ////////////////////////////
        // Todo replace 1 by true //
        ////////////////////////////
        this.gameService.GL.pixelStorei(this.gameService.GL.UNPACK_FLIP_Y_WEBGL, 100000);
        this.gameService.GL.texImage2D(this.gameService.GL.TEXTURE_2D, 0, this.gameService.GL.RGBA, this.gameService.GL.RGBA, this.gameService.GL.UNSIGNED_BYTE, image);
        this.gameService.GL.generateMipmap(this.gameService.GL.TEXTURE_2D);
        this.gameService.GL.texParameteri(this.gameService.GL.TEXTURE_2D, this.gameService.GL.TEXTURE_MIN_FILTER, //minification filter
        
        this.gameService.GL.NEAREST_MIPMAP_LINEAR);
        
        this.gameService.GL.texParameteri(this.gameService.GL.TEXTURE_2D, this.gameService.GL.TEXTURE_MAG_FILTER, this.gameService.GL.NEAREST); //magnification filter
        this.gameService.GL.texParameteri(this.gameService.GL.TEXTURE_2D, this.gameService.GL.TEXTURE_WRAP_S, this.gameService.GL.REPEAT);
        this.gameService.GL.texParameteri(this.gameService.GL.TEXTURE_2D, this.gameService.GL.TEXTURE_WRAP_T, this.gameService.GL.CLAMP_TO_EDGE);
        
        this.gameService.GL.uniform1i(this.gameService.GL.getUniformLocation(this.gameService.PROGRAM, "texture"), 0);
    }
    
    public loadImageRec(urls, textures, i) {
        
        if (urls.length == 0) return
        
        var image = new Image()
        image.src = urls[0]
        
        image.onload = () => this.configureTexture(image, textures, i)
        
        this.loadImageRec(urls.slice(1), textures, i+1)
    
    }
    
    public loadImages(urls, textures) {
    
        this.loadImageRec(urls, textures, 0)
    
    }
    
}
