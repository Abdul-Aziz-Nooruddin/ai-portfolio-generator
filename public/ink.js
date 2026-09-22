/* Studio Ink — ambient GPU Navier-Stokes fluid for the customizer landing.
   Graceful no-op on unsupported browsers / reduced motion. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var canvas = document.getElementById("studioInk");
  if (!canvas) return;
  var gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;

  var SIM = 112, ITERS = 14;
  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  var VS = compile(gl.VERTEX_SHADER,
    "precision highp float;attribute vec2 aPos;varying vec2 vUv;" +
    "void main(){vUv=aPos*0.5+0.5;gl_Position=vec4(aPos,0.0,1.0);}");
  function prog(fs) {
    var p = gl.createProgram();
    gl.attachShader(p, VS);
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    return p;
  }
  var P = {
    adv: prog("precision highp float;varying vec2 vUv;uniform sampler2D uVel;uniform sampler2D uSrc;uniform vec2 texel;uniform float dt;uniform float diss;" +
      "void main(){vec2 c=vUv-dt*texture2D(uVel,vUv).xy*texel;vec4 r=texture2D(uSrc,c);gl_FragColor=r/(1.0+diss*dt);}"),
    splat: prog("precision highp float;varying vec2 vUv;uniform sampler2D uT;uniform float asp;uniform vec3 col;uniform vec2 pt;uniform float rad;" +
      "void main(){vec2 p=vUv-pt;p.x*=asp;vec3 s=exp(-dot(p,p)/rad)*col;gl_FragColor=vec4(texture2D(uT,vUv).xyz+s,1.0);}"),
    div: prog("precision mediump float;varying vec2 vUv;uniform sampler2D uVel;uniform vec2 texel;" +
      "void main(){float l=texture2D(uVel,vUv-vec2(texel.x,0.0)).x,r=texture2D(uVel,vUv+vec2(texel.x,0.0)).x;" +
      "float t=texture2D(uVel,vUv+vec2(0.0,texel.y)).y,b=texture2D(uVel,vUv-vec2(0.0,texel.y)).y;" +
      "gl_FragColor=vec4(0.5*(r-l+t-b),0.0,0.0,1.0);}"),
    press: prog("precision mediump float;varying vec2 vUv;uniform sampler2D uP;uniform sampler2D uD;uniform vec2 texel;" +
      "void main(){float l=texture2D(uP,vUv-vec2(texel.x,0.0)).x,r=texture2D(uP,vUv+vec2(texel.x,0.0)).x;" +
      "float t=texture2D(uP,vUv+vec2(0.0,texel.y)).x,b=texture2D(uP,vUv-vec2(0.0,texel.y)).x;" +
      "gl_FragColor=vec4((l+r+b+t-texture2D(uD,vUv).x)*0.25,0.0,0.0,1.0);}"),
    grad: prog("precision mediump float;varying vec2 vUv;uniform sampler2D uP;uniform sampler2D uVel;uniform vec2 texel;" +
      "void main(){float l=texture2D(uP,vUv-vec2(texel.x,0.0)).x,r=texture2D(uP,vUv+vec2(texel.x,0.0)).x;" +
      "float t=texture2D(uP,vUv+vec2(0.0,texel.y)).x,b=texture2D(uP,vUv-vec2(0.0,texel.y)).x;" +
      "gl_FragColor=vec4(texture2D(uVel,vUv).xy-vec2(r-l,t-b),0.0,1.0);}"),
    show: prog("precision highp float;varying vec2 vUv;uniform sampler2D uT;uniform float op;" +
      "void main(){vec3 c=texture2D(uT,vUv).rgb;float a=max(max(c.r,c.g),c.b);a=pow(a,0.9);" +
      "gl_FragColor=vec4(c*op,a*op);}")
  };
  var quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
  var idxBuf = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  function fbo(w, h, int, fmt, type) {
    var t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, int, w, h, 0, fmt, type, null);
    var f = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, f);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    return { tex: t, fb: f, w: w, h: h,
      attach: function (u, unit) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); gl.uniform1i(gl.getUniformLocation(cur, u), unit); } };
  }
  function dbl(w, h, i, f, t) {
    var A = fbo(w, h, i, f, t), B = fbo(w, h, i, f, t), read = A, write = B;
    return { w: w, h: h,
      read: function () { return read; },
      writeFb: function () { return write; },
      swap: function () { var tmp = read; read = write; write = tmp; } };
  }
  var ar0 = window.innerHeight / window.innerWidth;
  var dye = dbl(384, Math.max(64, Math.floor(384 * ar0)), gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
  var vel = dbl(SIM, Math.max(64, Math.floor(SIM * ar0)), gl.RG16F, gl.RG, gl.HALF_FLOAT);
  var divF = fbo(SIM, Math.max(64, Math.floor(SIM * ar0)), gl.R16F, gl.RED, gl.HALF_FLOAT);
  var prs = dbl(SIM, Math.max(64, Math.floor(SIM * ar0)), gl.R16F, gl.RED, gl.HALF_FLOAT);

  var cur = null;
  function use(p) { cur = p; gl.useProgram(p); }
  function blit(target) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fb : null);
    gl.viewport(0, 0, target ? target.w : gl.drawingBufferWidth, target ? target.h : gl.drawingBufferHeight);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }
  function uni(p, n) { return gl.getUniformLocation(p, n); }

  var PALETTE = [[0.60, 0.20, 0.07], [0.02, 0.47, 0.34], [0.71, 0.33, 0.04]];
  function splat(x, y, dx, dy, c) {
    use(P.splat);
    gl.uniform1f(uni(P.splat, "asp"), canvas.width / canvas.height);
    gl.uniform2f(uni(P.splat, "pt"), x, y);
    gl.uniform1f(uni(P.splat, "rad"), 0.0035 * (canvas.width / canvas.height > 1 ? canvas.width / canvas.height : 1));
    gl.uniform3f(uni(P.splat, "col"), dx, dy, 0);
    vel.read().attach("uT", 0);
    blit(vel.writeFb()); vel.swap();
    gl.uniform3f(uni(P.splat, "col"), c[0] * 0.16, c[1] * 0.16, c[2] * 0.16);
    dye.read().attach("uT", 0);
    blit(dye.writeFb()); dye.swap();
  }

  var px = 0.5, py = 0.5, moved = false;
  function onMove(e) {
    var nx = e.clientX / window.innerWidth, ny = 1 - e.clientY / window.innerHeight;
    var dx = (nx - px) * 10, dy = (ny - py) * 10;
    px = nx; py = ny;
    if (Math.abs(dx) > 0.002 || Math.abs(dy) > 0.002) {
      moved = true;
      lastDelta = [dx, dy];
    }
  }
  var lastDelta = [0, 0];
  window.addEventListener("mousemove", onMove, { passive: true });

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
  }
  resize();
  window.addEventListener("resize", resize);

  var last = performance.now(), amb = 0, running = true;
  function frame(now) {
    if (!running) return;
    var dt = Math.min((now - last) / 1000, 0.0166);
    last = now;
    gl.disable(gl.BLEND);
    // divergence
    use(P.div); gl.uniform2f(uni(P.div, "texel"), 1 / vel.w, 1 / vel.h);
    vel.read().attach("uVel", 0); blit(divF);
    // pressure
    use(P.press); gl.uniform2f(uni(P.press, "texel"), 1 / vel.w, 1 / vel.h);
    for (var i = 0; i < ITERS; i++) {
      prs.read().attach("uP", 0);
      divF.attach("uD", 1);
      blit(prs.writeFb()); prs.swap();
    }
    // subtract gradient
    use(P.grad); gl.uniform2f(uni(P.grad, "texel"), 1 / vel.w, 1 / vel.h);
    prs.read().attach("uP", 0);
    vel.read().attach("uVel", 1);
    blit(vel.writeFb()); vel.swap();
    // advect velocity
    use(P.adv);
    gl.uniform2f(uni(P.adv, "texel"), 1 / vel.w, 1 / vel.h);
    gl.uniform1f(uni(P.adv, "dt"), dt);
    gl.uniform1f(uni(P.adv, "diss"), 0.25);
    vel.read().attach("uVel", 0); vel.read().attach("uSrc", 0);
    blit(vel.writeFb()); vel.swap();
    // advect dye
    gl.uniform1f(uni(P.adv, "diss"), 0.45);
    vel.read().attach("uVel", 0);
    dye.read().attach("uSrc", 1);
    blit(dye.writeFb()); dye.swap();

    if (moved && lastDelta[0] + lastDelta[1] !== 0) {
      moved = false;
      splat(px, py, lastDelta[0], lastDelta[1], PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      lastDelta = [0, 0];
    }
    amb += dt;
    if (amb > 3.2) { amb = 0; splat(0.15 + Math.random() * 0.7, 0.2 + Math.random() * 0.6, (Math.random() - .5) * 5, (Math.random() - .5) * 5, PALETTE[Math.floor(Math.random() * PALETTE.length)]); }

    // render
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    use(P.show);
    dye.read().attach("uT", 0);
    gl.uniform1f(uni(P.show, "op"), 0.85);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    blit(null);
    requestAnimationFrame(frame);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) running = false;
    else if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
  });
  requestAnimationFrame(frame);
})();
