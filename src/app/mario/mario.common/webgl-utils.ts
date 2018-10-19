import { ElementRef } from "@angular/core";
import { Vec2 } from "./vectors/vec2";
import { vec2 } from "./MV";
import { interval } from "rxjs";

/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

export class WebGLUtils {

  ///////////////
  // Variables //
  ///////////////
  /**
   * 
   * Message for getting a webgl browser
   * @type {string}
   * 
   */
  public GET_A_WEBGL_BROWSER: string = '' +
    'This page requires a browser that supports WebGL.<br/>' +
    '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
  
  /**
   * 
   * Message for need better hardware
   * @type {string}
   * 
   */
  public OTHER_PROBLEM: string = '' +
    "It doesn't appear your computer can support WebGL.<br/>" +
    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';



  constructor(){

    this.init()
    
  }


  public init() {

    return {
      
      create3DContext: this.create3DContext,
      setupWebGL: this.setupWebGL
    
    }  
      
  }

  
  /**
   * Creates a webgl context.
   * @param {!Canvas} canvas The canvas tag to get context
   *     from. If one is not passed in one will be created.
   * @return {!WebGLContext} The created context.
   */
  
   public create3DContext(canvas: ElementRef) {
  
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
  
    for (var ii = 0; ii < names.length; ++ii) {
  
      try {
  
        context = canvas.nativeElement.getContext(names[ii]);
  
      } catch(e) {}
  
      if (context) {
  
        break;
  
      }
  
    }
  
    return context;
  
  }

  /**
   * 
   * Creates a webgl context. If creation fails it will
   * change the contents of the container of the <canvas>
   * tag to an error message with the correct links for WebGL.
   * @param {Element} canvas. The canvas element to create a
   *     context from.
   * @param {WebGLContextCreationAttirbutes} opt_attribs Any
   *     creation attributes you want to pass in.
   * @return {WebGLRenderingContext} The created context.
   * 
   */
  public setupWebGL(canvas): WebGLRenderingContext {
    function showLink(str) {
      var container = canvas.parentNode;
      if (container) {
        container.innerHTML = '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
        '<td align="center">' +
        '<div style="display: table-cell; vertical-align: middle;">' +
        '<div style="">' + str + '</div>' +
        '</div>' +
        '</td></tr></table>';
      }
    };

    var context = this.create3DContext(canvas);

    return context;

  };
  

  
}


export function quad(v1, v2, v3, v4, vBuffer, tBuffer) {
  
  tBuffer.push(vec2([1,1]));
  tBuffer.push(vec2([0,1]));
  tBuffer.push(vec2([0,0]));
  tBuffer.push(vec2([1,1]));
  tBuffer.push(vec2([0,0]));
  tBuffer.push(vec2([1,0]));

  vBuffer.push(v1);
  vBuffer.push(v3);
  vBuffer.push(v4);
  vBuffer.push(v1);
  vBuffer.push(v4);
  vBuffer.push(v2);
}