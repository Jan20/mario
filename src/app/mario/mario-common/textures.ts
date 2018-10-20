import { GLS } from '../mario-services/gl.service';
import { vec2 } from './MV';

export var texCoord = [

    vec2([0,0]),
    vec2([0,1]),
    vec2([1,1]),
    vec2([1,0]),

];

export function configureTexture(image, textures, i) {

    textures[i] = GLS.I().GL.createTexture();
    GLS.I().GL.bindTexture(GLS.I().GL.TEXTURE_2D, textures[i]);
    
    ////////////////////////////
    // Todo replace 1 by true //
    ////////////////////////////
    GLS.I().GL.pixelStorei(GLS.I().GL.UNPACK_FLIP_Y_WEBGL, 100000);
    GLS.I().GL.texImage2D(GLS.I().GL.TEXTURE_2D, 0, GLS.I().GL.RGBA, GLS.I().GL.RGBA, GLS.I().GL.UNSIGNED_BYTE, image);
    GLS.I().GL.generateMipmap(GLS.I().GL.TEXTURE_2D);
    GLS.I().GL.texParameteri(GLS.I().GL.TEXTURE_2D, GLS.I().GL.TEXTURE_MIN_FILTER, //minification filter
    
    GLS.I().GL.NEAREST_MIPMAP_LINEAR);
    
    GLS.I().GL.texParameteri(GLS.I().GL.TEXTURE_2D, GLS.I().GL.TEXTURE_MAG_FILTER, GLS.I().GL.NEAREST); //magnification filter
    GLS.I().GL.texParameteri(GLS.I().GL.TEXTURE_2D, GLS.I().GL.TEXTURE_WRAP_S, GLS.I().GL.REPEAT);
    GLS.I().GL.texParameteri(GLS.I().GL.TEXTURE_2D, GLS.I().GL.TEXTURE_WRAP_T, GLS.I().GL.CLAMP_TO_EDGE);
    
    GLS.I().GL.uniform1i(GLS.I().GL.getUniformLocation(GLS.I().PROGRAM, "texture"), 0);
}

export function loadImageRec(urls, textures, i) {
    
    if (urls.length == 0) {
        return;
    }
    
    var image = new Image();
    image.src = urls[0];
    
    image.onload = function() {
    
        configureTexture(image, textures, i);
    
    }
    console.log('loadImageRec executed')
    loadImageRec(urls.slice(1), textures, i+1);

}

export function loadImages(urls, textures) {

    loadImageRec(urls, textures, 0);

}
