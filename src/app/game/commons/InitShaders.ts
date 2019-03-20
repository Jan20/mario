//
//  LoadShaders.js
//

export function initShaders( gl: WebGLRenderingContext, vertexShaderText: string, fragmentShaderText: string ): WebGLProgram{

    let vertexShader: WebGLShader
    let fragmentShader: WebGLShader
    vertexShader = gl.createShader( gl.VERTEX_SHADER );
    
    gl.shaderSource( vertexShader, vertexShaderText );
    gl.compileShader( vertexShader );

    if ( !gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) ) {
        var msg = "Vertex shader failed to compile.  The error log is:"
        + "<pre>" + gl.getShaderInfoLog( vertexShader ) + "</pre>";
        alert( msg );
        return -1;
    }

    fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource( fragmentShader, fragmentShaderText );
    gl.compileShader( fragmentShader );
    
    if ( !gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) ) {
        var msg = "Fragment shader failed to compile.  The error log is:"
        + "<pre>" + gl.getShaderInfoLog( fragmentShader ) + "</pre>";
        alert( msg );
        return -1;
    }

    let program: WebGLProgram = gl.createProgram();
    gl.attachShader( program, vertexShader );
    gl.attachShader( program, fragmentShader );
    gl.linkProgram( program );
    
    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {

        var msg = "Shader program failed to link.  The error log is:"
            + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( msg );
        return -1;
    }
    return program

}
