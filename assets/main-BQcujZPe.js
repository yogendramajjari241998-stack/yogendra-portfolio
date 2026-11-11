function e(e,t={}){let n=e.getContext(`webgl2`,{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:`high-performance`,preserveDrawingBuffer:!1,...t});return n?(n.disable(n.DEPTH_TEST),n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA),n):null}function t(e,t,n,r){let i=e.createShader(t);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS))throw Error(`${r}: ${e.getShaderInfoLog(i)}`);return i}function n(e,n,r,i=`program`){let a=e.createProgram();if(e.attachShader(a,t(e,e.VERTEX_SHADER,n,`${i} vert`)),e.attachShader(a,t(e,e.FRAGMENT_SHADER,r,`${i} frag`)),e.bindAttribLocation(a,0,`aPos`),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))throw Error(`${i} link: ${e.getProgramInfoLog(a)}`);let o={},s=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let t=0;t<s;t++){let n=e.getActiveUniform(a,t);if(o[n.name]=e.getUniformLocation(a,n.name),n.size>1&&n.name.endsWith(`[0]`)){let t=n.name.slice(0,-3);o[t]=o[n.name];for(let r=1;r<n.size;r++)o[`${t}[${r}]`]=e.getUniformLocation(a,`${t}[${r}]`)}}return{p:a,u:o}}function r(e){let t=e.createVertexArray();e.bindVertexArray(t);let n=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),t}function i(e,{wrap:t=`clamp`,filter:n=`linear`}={}){let r=e.createTexture(),i=t===`repeat`?e.REPEAT:e.CLAMP_TO_EDGE,a=n===`nearest`?e.NEAREST:e.LINEAR;return e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),r}function a(e,t,n,r=!1){let i=n.videoWidth??n.naturalWidth??n.width,a=n.videoHeight??n.naturalHeight??n.height;return!i||!a?!1:(e.bindTexture(e.TEXTURE_2D,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),!0)}function o(e,t,n){return e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,t),n}function s(e){return new Promise((t,n)=>{let r=e.replace(/^\/?(public\/)?/,``),i=[`./`+r,r,e];function a(r){if(r>=i.length){n(Error(`image failed to load: ${e}`));return}let o=new Image;o.onload=()=>t(o),o.onerror=()=>a(r+1),o.src=i[r]}a(0)})}var c=`#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;          // unit quad 0..1
uniform vec4 uRect;                        // x, y, w, h in pixels
uniform vec2 uRes;
uniform vec4 uUV;                          // sub-rect in the source texture
uniform vec2 uSkew;                        // parallax / drift offset in pixels
out vec2 vUV;
out vec2 vLocal;
out vec2 vScreen;
void main(){
  vLocal = aPos;
  vUV = uUV.xy + aPos * uUV.zw;
  vec2 px = uRect.xy + aPos * uRect.zw + uSkew;
  vScreen = px / uRes;
  vec2 clip = vec2(px.x / uRes.x * 2.0 - 1.0, 1.0 - px.y / uRes.y * 2.0);
  gl_Position = vec4(clip, 0.0, 1.0);
}`,l=[.871,.106,.11],u=class{constructor(t){if(this.canvas=t,this.gl=e(t),this.ok=!!this.gl,!this.ok)return;let a=this.gl;this.quad=r(a),this.progs={bg:n(a,c,`#version 300 es
precision highp float;
in vec2 vScreen;
uniform sampler2D uGrain;
uniform vec2 uRes;
uniform float uTime;
uniform float uEmber;      // 0..1 glow behind the type
uniform vec2  uEmberAt;    // normalised centre
uniform float uAspect;
out vec4 frag;

void main(){
  vec2 p = vScreen;
  float g = texture(uGrain, p * (uRes / 512.0) * 0.6 + vec2(uTime * 0.004, 0.0)).r;

  vec3 col = vec3(0.008, 0.008, 0.010);
  col += (g - 0.5) * 0.035;                       // mottled plate

  vec2 d = (p - uEmberAt) * vec2(uAspect, 1.0);
  float ember = exp(-dot(d, d) * 2.4);
  col += vec3(0.115, 0.012, 0.014) * ember * uEmber;

  vec2 v = (p - 0.5) * vec2(uAspect, 1.0);
  float vig = 1.0 - smoothstep(0.38, 1.15, length(v));
  col *= mix(0.35, 1.0, vig);

  frag = vec4(col, 1.0);
}`,`bg`),letter:n(a,c,`#version 300 es
precision highp float;
in vec2 vUV;
in vec2 vLocal;
in vec2 vScreen;
uniform sampler2D uGlyph;
uniform sampler2D uGrunge;
uniform vec2  uGrungeScale;
uniform vec2  uGrungeOffset;
uniform vec3  uInk;
uniform float uOpacity;
uniform float uReveal;      // 0..1 dissolve
uniform float uSoften;      // simulated defocus while materialising
uniform float uEdgeLight;
uniform float uWear;        // how distressed the paint is
uniform float uWearGain;    // contrast of the wear pattern
out vec4 frag;

// Directional smear along the axis the letter is travelling. Blurring in x too
// would sample the NEIGHBOURING letter out of the shared atlas and ghost it into
// this one; a vertical-only smear is also the honest read of a rising object.
float glyph(vec2 uv, float r){
  if(r < 0.0002) return texture(uGlyph, uv).r;
  float a = texture(uGlyph, uv).r * 0.30;
  a += texture(uGlyph, uv + vec2(0.0,  r      )).r * 0.20;
  a += texture(uGlyph, uv + vec2(0.0, -r      )).r * 0.20;
  a += texture(uGlyph, uv + vec2(0.0,  r * 2.1)).r * 0.15;
  a += texture(uGlyph, uv + vec2(0.0, -r * 2.1)).r * 0.15;
  return a;
}

void main(){
  float cov = glyph(vUV, uSoften);
  if(cov <= 0.001) discard;

  // Two octaves of the same worn plate: a coarse one for blotching and abrasion,
  // a fine one for the scratches. Sampled in SCREEN space, so it reads as one
  // continuous distressed sheet lying across the whole wordmark.
  vec2 gu = vScreen * uGrungeScale + uGrungeOffset;
  float tex = texture(uGrunge, gu).r;
  float tex2 = texture(uGrunge, gu * 3.1 + vec2(0.37, 0.11)).r;
  float wear = mix(tex, tex2, 0.42);
  wear = clamp((wear - 0.5) * uWearGain + 0.5, 0.0, 1.0);

  // the artwork red is not flat: scratches drop it toward a dried oxblood, and
  // the untouched paint sits a little hotter than the base ink
  vec3 col = uInk * mix(1.0 - uWear, 1.0 + uWear * 0.30, wear);
  col = mix(col, uInk * vec3(0.42, 0.30, 0.30),
            smoothstep(0.30, 0.02, wear) * uWear * 1.2);

  // a hair of lift along the top of each stroke, as if lit from above
  float lift = smoothstep(0.0, 0.22, 1.0 - vLocal.y);
  col += uInk * lift * uEdgeLight * 0.28;

  // dissolve: threshold the texture so the letter emerges in flecks rather than
  // fading uniformly. n is the "appears last" field - low n surfaces first, so
  // the letter builds from its base upward through the worn grain.
  float n = wear * 0.55 + vLocal.y * 0.45;
  float m = clamp((uReveal * 1.4 - n) / 0.4, 0.0, 1.0);
  float a = cov * uOpacity * m;

  frag = vec4(col * a, a);
}`,`letter`),figure:n(a,c,`#version 300 es
precision highp float;
in vec2 vUV;
in vec2 vLocal;
in vec2 vScreen;
uniform sampler2D uClip;      // packed video
uniform sampler2D uGrunge;
uniform sampler2D uMask;      // glyph coverage, when clipping into a letter
uniform vec4  uMaskUV;
uniform float uUseMask;
uniform float uOpacity;
uniform float uReveal;
uniform float uFeetFade;      // dissolve the floor contact into darkness
uniform float uTopFade;
uniform float uExposure;
uniform float uLift;          // shadow lift toward cool blue
uniform float uRimRed;        // bounce from the red typography
uniform float uContrast;
uniform float uDesat;
uniform vec2  uTexel;
uniform float uFloorY;        // frame-space start of the glossy-floor band
uniform vec2  uBand;          // wordmark cap-top / baseline in screen space
out vec4 frag;

// uv arrives in FRAME space (0..1 over the source video). That lets a figure be
// drawn on a quad that is not its own rectangle - which is exactly what putting
// a person inside a letter requires: the quad is the glyph, the sampling is his.
vec4 sampleClip(vec2 uv){
  if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
  // colour occupies the left half, matte the right; inset by a texel so chroma
  // subsampling across the seam cannot bleed one into the other
  vec2 c = vec2(clamp(uv.x * 0.5, uTexel.x, 0.5 - uTexel.x), uv.y);
  vec3 col = texture(uClip, c).rgb;
  float a = texture(uClip, c + vec2(0.5, 0.0)).r;
  return vec4(col, a);
}

void main(){
  vec4 s = sampleClip(vUV);
  float a = s.a;
  if(a <= 0.004) discard;
  vec3 col = s.rgb / max(a, 0.06);        // undo premultiply before grading

  // --- grade -------------------------------------------------------------
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(l), col, 1.0 - uDesat);
  col = (col - 0.5) * uContrast + 0.5;
  col *= uExposure;
  col += vec3(0.010, 0.014, 0.030) * uLift * (1.0 - smoothstep(0.0, 0.5, l));

  // Red bounce from the wall of type behind him. Keyed off the MATTE, not the
  // quad, so it lands as a rim light on his actual silhouette - and gated to
  // the rows where the wordmark actually sits behind him. A red edge on his
  // shins, below the baseline where there is only blackness, reads as a fault.
  float edge = 1.0 - smoothstep(0.20, 0.90, s.a);
  float behindType = smoothstep(uBand.x - 0.04, uBand.x + 0.03, vScreen.y)
                   * (1.0 - smoothstep(uBand.y - 0.02, uBand.y + 0.05, vScreen.y));
  col += vec3(0.80, 0.10, 0.11) * uRimRed * edge * mix(0.12, 1.0, behindType);

  col = max(col, vec3(0.0));

  // --- coverage ----------------------------------------------------------
  if(uUseMask > 0.5){
    vec2 mu = uMaskUV.xy + vLocal * uMaskUV.zw;
    a *= texture(uMask, mu).r;
  }
  a *= smoothstep(0.0, uFeetFade, 1.0 - vLocal.y);
  a *= smoothstep(0.0, uTopFade, vLocal.y);

  // Glossy-floor band of the source frame. Reflections and specular smears
  // around the shoes survive the key with high alpha, so gating coverage alone
  // cannot remove them - they are bright PIXELS, not soft edges. The band is
  // therefore also driven down toward black, which both kills the halo and
  // reads correctly: he is standing in darkness, not on a lit studio floor.
  if(uFloorY < 1.0 && vUV.y > uFloorY){
    float depth = clamp((vUV.y - uFloorY) / max(1.0 - uFloorY, 1e-3), 0.0, 1.0);
    a *= mix(1.0, smoothstep(0.40, 0.82, a), min(depth * 1.6, 1.0));
    col *= mix(1.0, 0.10, smoothstep(0.0, 0.95, depth));
  }

  float n = texture(uGrunge, vLocal * vec2(1.7, 0.9) + vec2(0.13, 0.41)).r;
  float field = n * 0.45 + (1.0 - vLocal.y) * 0.55;   // surfaces feet-first
  a *= clamp((uReveal * 1.4 - field) / 0.4, 0.0, 1.0) * uOpacity;

  frag = vec4(col * a, a);
}`,`figure`),shadow:n(a,c,`#version 300 es
precision highp float;
in vec2 vLocal;
uniform float uOpacity;
uniform vec2  uFalloff;   // horizontal, vertical softness
out vec4 frag;
void main(){
  vec2 d = (vLocal - vec2(0.5, 1.0)) / uFalloff;
  float a = exp(-dot(d, d) * 3.0) * uOpacity;
  frag = vec4(0.0, 0.0, 0.0, clamp(a, 0.0, 1.0));
}`,`shadow`),post:n(a,c,`#version 300 es
precision highp float;
in vec2 vScreen;
uniform sampler2D uGrain;
uniform vec2 uRes;
uniform float uTime;
uniform float uAmount;
uniform float uAspect;
uniform float uFlash;
out vec4 frag;
void main(){
  vec2 p = vScreen;
  vec2 jitter = vec2(fract(sin(uTime * 12.9898) * 43758.5453),
                     fract(sin(uTime * 78.233) * 12345.6789));
  float g = texture(uGrain, p * (uRes / 512.0) + jitter).r - 0.5;
  vec2 v = (p - 0.5) * vec2(uAspect, 1.0);
  float vig = smoothstep(0.42, 1.2, length(v));
  vec3 col = vec3(g * uAmount);
  col += vec3(0.085, 0.008, 0.011) * uFlash;
  frag = vec4(col, vig * 0.55 + uFlash * 0.1);
}`,`post`)},this.tex={glyph:i(a),grunge:i(a,{wrap:`repeat`}),grain:i(a,{wrap:`repeat`}),hero:i(a)},this.maxTexture=a.getParameter(a.MAX_TEXTURE_SIZE),this.res=[1,1],this.word=null,this.layout=null,this.parallax={x:0,y:0},this.wear=.44,this.wearGain=2.1,this.wearScale=5.6}async loadTextures({grunge:e,grain:t}){let[n,r]=await Promise.all([s(e),s(t)]);a(this.gl,this.tex.grunge,n),a(this.gl,this.tex.grain,r)}setWord(e){this.word=e,a(this.gl,this.tex.glyph,e.canvas)}resize(e){this.layout=e;let{w:t,h:n,dpr:r}=e,i=Math.round(t*r),a=Math.round(n*r);(this.canvas.width!==i||this.canvas.height!==a)&&(this.canvas.width=i,this.canvas.height=a),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${n}px`,this.res=[i,a],this.gl.viewport(0,0,i,a)}_quad(e,t,n=[0,0,1,1],r=[0,0]){let i=this.gl;i.uniform4f(e.u.uRect,t[0],t[1],t[2],t[3]),i.uniform2f(e.u.uRes,this.res[0],this.res[1]),e.u.uUV&&i.uniform4f(e.u.uUV,n[0],n[1],n[2],n[3]),e.u.uSkew&&i.uniform2f(e.u.uSkew,r[0],r[1]),i.drawArrays(i.TRIANGLE_STRIP,0,4)}letterRect(e){let{word:t,dpr:n}=this.layout,r=this.word,i=t.w*n/r.ink.w,a=r.letters[e];return[t.x*n+(a.x-r.ink.x)*i,t.y*n+(a.y-r.ink.y)*i,a.w*i,a.h*i]}render(e,t,n){if(!this.ok||!this.word||!this.layout)return;let r=this.gl,[i,a]=this.res,s=this.layout.dpr,c=i/a;r.bindVertexArray(this.quad),r.clearColor(0,0,0,1),r.clear(r.COLOR_BUFFER_BIT);let u=this.parallax.x,d=this.parallax.y;{let n=this.progs.bg;r.useProgram(n.p),r.uniform1i(n.u.uGrain,o(r,this.tex.grain,0)),r.uniform1f(n.u.uTime,t),r.uniform1f(n.u.uEmber,e.ember),r.uniform1f(n.u.uAspect,c),r.uniform2f(n.u.uEmberAt,this.layout.ember.x,this.layout.ember.y),this._quad(n,[0,0,i,a])}u*30*s,d*18*s,this._heroGeometry(n.hero,e.hero);{let t=this.progs.letter;r.useProgram(t.p),r.uniform1i(t.u.uGlyph,o(r,this.tex.glyph,0)),r.uniform1i(t.u.uGrunge,o(r,this.tex.grunge,1)),r.uniform3f(t.u.uInk,l[0],l[1],l[2]),r.uniform2f(t.u.uGrungeScale,c*this.wearScale,this.wearScale),r.uniform2f(t.u.uGrungeOffset,.12,.31),r.uniform1f(t.u.uWear,this.wear),r.uniform1f(t.u.uWearGain,this.wearGain);for(let n=0;n<this.word.letters.length;n++){let i=this.word.letters[n],a=e.letters[n];if(a.opacity<=.001)continue;let o=this.letterRect(n),c=a.dy*o[3];r.uniform1f(t.u.uOpacity,a.opacity),r.uniform1f(t.u.uReveal,a.reveal),r.uniform1f(t.u.uSoften,a.soften*.026*(i.v1-i.v0)),r.uniform1f(t.u.uEdgeLight,a.edge),this._quad(t,o,[i.u0,i.v0,i.u1-i.u0,i.v1-i.v0],[u*14*s,c+d*9*s])}}{let n=this.progs.post;r.useProgram(n.p),r.uniform1i(n.u.uGrain,o(r,this.tex.grain,0)),r.uniform1f(n.u.uTime,t),r.uniform1f(n.u.uAmount,e.grain),r.uniform1f(n.u.uAspect,c),r.uniform1f(n.u.uFlash,e.flash),this._quad(n,[0,0,i,a])}r.bindVertexArray(null)}_heroGeometry(e,t){if(!e||!e.ready||t.opacity<=.001)return null;let n=this.layout.dpr,{hero:r}=this.layout,i=e.box(),a=Math.max(i[3]-i[1],.001),o=(i[0]+i[2])*.5,s=r.h*n*t.scale,c=s/a,l=c*(e.w/e.h);return{wantH:s,rect:[r.cx*n-l*o,r.feet*n+t.dy*s-c*i[3],l,c]}}_heroShadow(e,t,n){if(!e)return;let r=this.gl,i=this.layout.dpr,{hero:a}=this.layout,o=this.progs.shadow;r.useProgram(o.p),r.uniform1f(o.u.uOpacity,.46*t.shadow),r.uniform2f(o.u.uFalloff,.3,.46);let s=e.wantH*.5,c=e.wantH*.6;this._quad(o,[a.cx*i-s/2+n[0]*.55,a.feet*i-c,s,c])}_heroFigure(e,t,n,r){if(!t)return;let i=this.gl;e.poll()&&a(i,this.tex.hero,e.el);let s=this.progs.figure;i.useProgram(s.p),i.uniform1i(s.u.uClip,o(i,this.tex.hero,0)),i.uniform1i(s.u.uGrunge,o(i,this.tex.grunge,1)),i.uniform1i(s.u.uMask,o(i,this.tex.glyph,2)),i.uniform1f(s.u.uUseMask,0),i.uniform4f(s.u.uMaskUV,0,0,1,1),i.uniform2f(s.u.uTexel,.5/(e.w*2),.5/e.h),i.uniform1f(s.u.uOpacity,n.opacity*e.seamFade()),i.uniform1f(s.u.uReveal,n.reveal),i.uniform1f(s.u.uFeetFade,.085),i.uniform1f(s.u.uTopFade,.012),i.uniform1f(s.u.uExposure,1.24),i.uniform1f(s.u.uLift,1.35),i.uniform1f(s.u.uRimRed,.3),i.uniform1f(s.u.uContrast,1.13),i.uniform1f(s.u.uDesat,.2),i.uniform1f(s.u.uFloorY,.845);let{word:c,h:l}=this.layout;i.uniform2f(s.u.uBand,c.y/l,(c.y+c.h)/l),this._quad(s,t.rect,[0,0,1,1],r)}},d=class{constructor({src:e,poster:t,w:n,h:r,track:i,loopFade:a=.55}){this.w=n,this.h=r,this.track=i||null,this.loopFade=a,this.ready=!1,this.needsUpload=!1,this._lastTime=-1;let o=document.createElement(`video`);o.muted=!0,o.defaultMuted=!0,o.loop=!0,o.playsInline=!0,o.setAttribute(`playsinline`,``),o.setAttribute(`webkit-playsinline`,``),o.preload=`auto`,o.crossOrigin=`anonymous`,o.disablePictureInPicture=!0,t&&(o.poster=t);for(let t of e){let e=document.createElement(`source`);e.src=t.url,e.type=t.type,o.appendChild(e)}this.el=o,this.duration=0,o.addEventListener(`loadedmetadata`,()=>{this.duration=o.duration}),o.addEventListener(`canplay`,()=>{this.ready=!0}),o.load()}whenReady(){return this.el.readyState>=3?Promise.resolve(this):new Promise(e=>{let t=()=>{n(),e(this)},n=()=>{this.el.removeEventListener(`canplaythrough`,t),this.el.removeEventListener(`canplay`,t),this.el.removeEventListener(`error`,t)};this.el.addEventListener(`canplaythrough`,t,{once:!0}),this.el.addEventListener(`canplay`,t,{once:!0}),this.el.addEventListener(`error`,t,{once:!0})})}async play(){try{return await this.el.play(),!0}catch{return!1}}pause(){this.el.pause()}poll(){let e=this.el.currentTime;return e!==this._lastTime&&this.el.readyState>=2&&(this._lastTime=e,!0)}box(){if(!this.track||!this.track.length)return[.25,.05,.75,.98];let e=this.duration||1,t=Math.min(this.track.length-1,Math.max(0,Math.floor(this.el.currentTime/e*this.track.length)));return this.track[t]}seamFade(){let e=this.duration;if(!e||!this.loopFade)return 1;let t=this.el.currentTime,n=this.loopFade;return t>e-n?Math.max(0,(e-t)/n):t<n?Math.min(1,t/n):1}},f=`YOGENDRA`,p=3.52;function m(e,t){let n=document.createElement(`canvas`);return n.width=Math.max(1,Math.ceil(e)),n.height=Math.max(1,Math.ceil(t)),n.getContext(`2d`,{willReadFrequently:!1})}function h(e,t){let n=e.measureText(t);return{advance:n.width,left:n.actualBoundingBoxLeft,right:n.actualBoundingBoxRight,ascent:n.actualBoundingBoxAscent,descent:n.actualBoundingBoxDescent}}function g(e,t=4096){let n=m(8,8);n.font=`400px Anton, "Arial Narrow", Impact, sans-serif`,n.textBaseline=`alphabetic`;let r=e/(h(n,`H`).ascent||288)*400;n.font=`${r}px Anton, "Arial Narrow", Impact, sans-serif`;let i=-.012*e,a=[...f].map(e=>h(n,e)),o=0,s=1/0,c=-1/0,l=a.map((e,t)=>{let n=o;return s=Math.min(s,n-e.left),c=Math.max(c,n+e.right),o+=e.advance+i,{char:f[t],pen:n,m:e}}),u=c-s,d=p*e/u,g=Math.ceil(e*.06),_=l.map(e=>({char:e.char,penX:e.pen*d,x0:(e.pen-e.m.left)*d,x1:(e.pen+e.m.right)*d,m:e.m})),v=s*d,y=c*d,b=Math.max(0,...a.map(e=>e.descent)),x=Math.ceil(y-v)+g*2,S=Math.ceil(e+b)+g*2,C=1;x>t&&(C=t/x),S*C>t&&(C=t/S),C<1&&(r*=C,x=Math.floor(x*C),S=Math.floor(S*C));let w=m(x,S);w.font=`${r}px Anton, "Arial Narrow", Impact, sans-serif`,w.textBaseline=`alphabetic`,w.fillStyle=`#fff`,w.setTransform(d*C,0,0,C,-v*C+g,e*C+g);let T=_.map(t=>{w.fillText(t.char,t.penX/d,0);let n=(t.x0-v)*C+g,r=(t.x1-t.x0)*C;return{char:t.char,x:n,y:g+(e-t.m.ascent)*C,w:r,h:t.m.ascent*C}});return w.setTransform(1,0,0,1,0,0),{canvas:w.canvas,width:x,height:S,pad:g,fit:C,ink:{x:g,y:g,w:(y-v)*C,h:e*C},letters:T.map(e=>({...e,u0:e.x/x,v0:e.y/S,u1:(e.x+e.w)/x,v1:(e.y+e.h)/S}))}}async function _(){if(document.fonts)try{await Promise.all([document.fonts.load(`400 200px Anton`),document.fonts.load(`700 40px Oswald`),document.fonts.load(`400 40px Oswald`)]),await document.fonts.ready}catch{}}var v={wordWidth:.9344,capHeight:.532,vCentre:.5361,legend:{x:.8812,y:.2678,h:.0422},artist:{x:.015,y:.6878,h:.0367},dotsBR:{x:.9844,y:.95},arrows:{left:.0181,right:.975,top:.345,bottom:.625,count:5}};function y(e,t){let n=t/e>1.05,r=e<760,i=v.wordWidth*e/p,a=v.capHeight*t,o=Math.min(i,a);n&&(o=Math.min(i*1,t*.3));let s=o*p,c=e*.5,l=n?t*.5:t*v.vCentre,u=l-o*.5,d=l+o*.5,f={x:c-s*.5,y:u,w:s,h:o,capH:o,baseline:d},m=o*1.35,h=d+o*.22;return n&&(m=t*.54,h=t*.885),{w:e,h:t,dpr:Math.min(window.devicePixelRatio||1,2),portrait:n,narrow:r,word:f,hero:{h:m,cx:c,feet:h},welcomeY:n?h-m-t*.075:t*.175,legend:n?{x:e*.955,y:u-t*.052,h:20,alignRight:!0}:{x:e*v.legend.x,y:t*v.legend.y,h:Math.max(18,t*v.legend.h)},artist:n?{x:e*.045,y:d+t*.055,h:19}:{x:e*v.artist.x,y:t*v.artist.y,h:Math.max(16,t*v.artist.h)},ember:{x:.5,y:l/t}}}var b=8,x=class{constructor(e=document){this.root=document.documentElement,this.welcome=e.getElementById(`welcome`),this.chipArtist=e.getElementById(`chipArtist`),this.chipLegend=e.getElementById(`chipLegend`),this.arrowsL=e.getElementById(`arrowsL`),this.arrowsR=e.getElementById(`arrowsR`),this.dotsBR=e.getElementById(`dotsBR`),this.rule=e.getElementById(`hdrRule`),this.rulePath=e.getElementById(`hdrRulePath`),this.hdr=e.getElementById(`hdr`),this._build()}_build(){for(let[e,t]of[[this.arrowsL,v.arrows.count],[this.arrowsR,v.arrows.count]]){e.innerHTML=``;for(let n=0;n<t;n++){let t=document.createElement(`i`);t.style.setProperty(`--i`,n),e.appendChild(t)}}for(let e of[this.dotsBR]){e.innerHTML=``;for(let t=0;t<16;t++){let n=document.createElement(`i`),r=t%b,i=t/b|0;n.style.setProperty(`--i`,r+i*2),e.appendChild(n)}}this.hdr.querySelectorAll(`.hdr__nav li`).forEach((e,t)=>{e.style.setProperty(`--i`,t)})}apply(e){let t=this.root.style,{w:n,h:r,word:i,portrait:a}=e;t.setProperty(`--welcome-y`,`${e.welcomeY}px`),t.setProperty(`--welcome-size`,`${S(i.capH*.125,12,30)}px`);let o=S(i.capH*(a?.11:.075),9.5,18);t.setProperty(`--chip-size`,`${o}px`),t.setProperty(`--artist-x`,`${e.artist.x}px`),t.setProperty(`--artist-y`,`${e.artist.y}px`);let s=this.chipLegend.getBoundingClientRect().width||0,c=e.legend.alignRight?e.legend.x-s:e.legend.x;t.setProperty(`--legend-x`,`${c}px`),t.setProperty(`--legend-y`,`${e.legend.y}px`),this.root.classList.toggle(`is-portrait`,!!a),t.setProperty(`--arrow-l`,`${n*v.arrows.left}px`),t.setProperty(`--arrow-r`,`${n*v.arrows.right}px`),t.setProperty(`--arrow-top`,`${r*v.arrows.top}px`),t.setProperty(`--arrow-span`,`${r*(v.arrows.bottom-v.arrows.top)}px`);let l=S(r*.0125,5,11);t.setProperty(`--arrow-h`,`${l}px`),t.setProperty(`--arrow-w`,`${l*1.55}px`);let u=S(n*.0088,5,15);t.setProperty(`--dot-size`,`${u}px`),t.setProperty(`--dot-gap`,`${u*.62}px`),t.setProperty(`--dots-br-x`,`${n*v.dotsBR.x}px`),t.setProperty(`--dots-br-y`,`${r*v.dotsBR.y}px`),this._rule(e),this.portrait=a}_rule(e){let{w:t}=e,n=this.hdr.getBoundingClientRect().height||70,r=Math.round(n)-.5,i=Math.min(26,Math.max(12,t*.016)),a=Math.min(14,i*.55),o=[[0,r-a],[i,r],[t-i,r],[t,r-a]];this.rule.setAttribute(`viewBox`,`0 0 ${t} ${Math.ceil(n)+2}`),this.rulePath.setAttribute(`points`,o.map(e=>e.join(`,`)).join(` `));let s=this.rulePath.getTotalLength?this.rulePath.getTotalLength():t+80;this.rule.style.setProperty(`--len`,`${Math.ceil(s)}`)}};function S(e,t,n){return Math.round(Math.min(n,Math.max(t,e))*100)/100}var C=(e,t=0,n=1)=>e<t?t:e>n?n:e,w=(e,t,n)=>e+(t-e)*n,T=(e,t,n)=>C((e-t)/(n-t)),E=e=>1-(1-e)**3,D=e=>e>=1?1:1-2**(-10*e),ee=e=>1-(1-e)**5,O=(e,t,n)=>{let r=C((n-e)/(t-e));return r*r*(3-2*r)},k=(e,t,n,r)=>w(e,t,1-Math.exp(-n*r)),A={heroIn:.3,heroInDur:2.05,letters:2.1,letterStagger:.145,letterDur:1.65,ember:2.45,welcome:2.9,artist:3.18,legend:3.32,arrows:3.46,dots:3.62,header:4.45,settled:6.25};function te(e){return e.map((e,t)=>({i:t,d:Math.abs((e.u0+e.u1)/2-.5)})).sort((e,t)=>e.d-t.d).map((e,t)=>({i:e.i,rank:t})).reduce((e,t)=>(e[t.i]=t.rank,e),[])}function j(e,t,n){let r=T(e,A.heroIn,A.heroIn+A.heroInDur),i=ee(r),a={reveal:r,opacity:O(0,.35,r),scale:w(.885,1,i),dy:w(.045,0,i),shadow:O(.25,.9,r)},o=[];for(let r=0;r<t;r++){let t=A.letters+n[r]*A.letterStagger,i=T(e,t,t+A.letterDur),a=D(i);o.push({reveal:T(e,t,t+A.letterDur*.82),opacity:O(0,.18,i),dy:w(.34,0,a),soften:w(1,0,E(C(i*1.15))),edge:O(.35,1,i)})}return{hero:a,letters:o,ember:O(0,1,T(e,A.ember,A.ember+2.2)),flash:Math.max(.17*ne(T(e,A.letters+.25,A.letters+1.25)),.1*ne(T(e,A.welcome,A.welcome+.5))),grain:w(.075,.034,O(0,1,T(e,.2,3.2))),settled:e>=A.settled,progress:C(e/A.settled)}}function ne(e){return e<=0||e>=1?0:Math.sin(e*Math.PI)**2}var M=[[A.welcome,`welcome`],[A.artist,`artist`],[A.legend,`legend`],[A.arrows,`arrows`],[A.dots,`dots`],[A.header,`header`],[A.settled,`settled`]],re=.45;async function ie(){let e=document.getElementById(`universe`),t=document.getElementById(`uniFilm`),n=document.getElementById(`uniVeil`);if(!e||!t||!n)return null;let r=matchMedia(`(prefers-reduced-motion: reduce)`).matches,i={visible:!1,raf:0,entered:!1},a=()=>{t.play().catch(()=>{let e=()=>{t.play().catch(()=>{})};window.addEventListener(`pointerdown`,e,{once:!0}),window.addEventListener(`scroll`,e,{once:!0})})},o=()=>{let e=()=>{if(!i.visible)return;let r=t.duration||10,a=t.currentTime,o=r-a,s=Math.min(1,Math.min(a,Math.max(o,0))/re);n.style.opacity=i.entered?String((1-s)*.92):`1`,i.raf=t.requestVideoFrameCallback?t.requestVideoFrameCallback(e):requestAnimationFrame(e)};i.raf=t.requestVideoFrameCallback?t.requestVideoFrameCallback(e):requestAnimationFrame(e)};return new IntersectionObserver(s=>{for(let c of s)i.visible=c.isIntersecting,c.isIntersecting?(i.entered||(i.entered=!0,e.classList.add(`is-on`),n.style.opacity=`0`),r?(t.currentTime=Math.min(6.5,(t.duration||10)*.6),t.pause(),n.style.opacity=`0`):(a(),o())):t.pause()},{threshold:.3}).observe(e),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?t.pause():i.visible&&!r&&a()}),t.addEventListener(`error`,()=>e.classList.add(`is-fallback`),{once:!0}),window.addEventListener(`load`,()=>{!i.entered&&t.preload!==`auto`&&(t.preload=`auto`,t.load())},{once:!0}),{film:t,section:e}}var N=`#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;
out vec2 vUV;
void main(){
  vUV = vec2(aPos.x, 1.0 - aPos.y);
  gl_Position = vec4(aPos * 2.0 - 1.0, 0.0, 1.0);
}`,ae=`#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uGrain;
uniform vec2  uRes;
uniform float uTime;
uniform float uAspect;
uniform float uWake;      // 0..1 the room comes up
uniform float uRings;     // 0..1 the floor mechanism engages
uniform vec2  uFloor;     // centre of the ring system, normalised
uniform vec2  uPivot;     // the clock's hand pivot
uniform float uHeat;      // how hot the active end of the timeline is
uniform vec2  uActive;    // screen position of the active year
uniform vec2  uFig;       // where the figure stands (x, feet y)
out vec4 frag;

const vec3 AMBER = vec3(1.00, 0.56, 0.20);
const vec3 EMBER = vec3(1.00, 0.22, 0.07);

// perspective floor: squash y so the rings read as ellipses lying flat
vec2 floorSpace(vec2 p, vec2 c){
  vec2 d = (p - c) * vec2(uAspect, 1.0);
  d.y /= 0.30;                       // viewing angle
  return d;
}

void main(){
  vec2 p = vUV;
  vec3 col = vec3(0.013, 0.010, 0.009);

  // --- ambient: a warm pool under the clock ------------------------------
  vec2 dp = (p - uPivot) * vec2(uAspect, 1.0);
  col += AMBER * 0.045 * exp(-dot(dp, dp) * 1.1) * uWake;

  // --- the floor ----------------------------------------------------------
  float horizon = 0.545;
  {
    // smoothstep rather than a hard cut: branching on the horizon leaves a
    // visible seam straight across the frame
    float onFloor = smoothstep(horizon - 0.05, horizon + 0.06, p.y);
    float depth = clamp((p.y - horizon) / (1.0 - horizon), 0.0, 1.0);

    // concentric rings. Each is offset in phase and speed so the mechanism
    // reads as several independent parts, not one spinning disc.
    vec2 fp = floorSpace(p, uFloor);
    float r = length(fp);
    float a = atan(fp.y, fp.x);

    // The pool of warm light behind the figure. The reference never lights the
    // man himself - it lights the floor BEHIND him and lets his silhouette
    // read dark against it. This is most of what makes him visible.
    vec2 fd = vec2((p.x - uFig.x) * uAspect, (p.y - uFig.y + 0.10) * 2.1);
    float pool = exp(-dot(fd, fd) * 3.4);
    col += vec3(1.0, 0.44, 0.16) * pool * 0.16 * uWake;

    float rings = 0.0;
    for(int i = 0; i < 5; i++){
      float fi = float(i);
      float R = 0.16 + fi * 0.135;
      float spin = uTime * (0.05 + fi * 0.023) * (mod(fi, 2.0) < 0.5 ? 1.0 : -1.4);
      float band = smoothstep(0.010, 0.0, abs(r - R));
      // a slow sweep of brightness travelling round each ring
      float sweep = 0.55 + 0.45 * sin(a * (1.0 + fi) + spin * 6.0);
      rings += band * sweep * (1.0 - fi * 0.14);
    }
    col += AMBER * rings * 0.5 * uRings * (1.0 - depth * 0.35) * onFloor
         * (1.0 + pool * 2.2);

    // wet reflection of the light above, streaked toward the viewer
    float streak = exp(-abs(p.x - uFloor.x) * uAspect * 2.0);
    col += AMBER * streak * 0.16 * (1.0 - depth) * uWake * onFloor;
    // the active year's heat spills onto the floor beneath it
    float hx = exp(-abs(p.x - uActive.x) * uAspect * 3.2);
    col += EMBER * hx * 0.20 * (1.0 - depth) * uHeat * onFloor;

    col *= mix(1.0, 0.35, depth * onFloor);
  }

  // --- vignette + grain ---------------------------------------------------
  float g = texture(uGrain, p * (uRes / 512.0) * 0.5 + vec2(uTime * 0.002, 0.0)).r;
  col += (g - 0.5) * 0.024;
  vec2 v = (p - 0.5) * vec2(uAspect, 1.0);
  col *= 1.0 - smoothstep(0.44, 1.16, length(v)) * 0.9;

  frag = vec4(col, 1.0);
}`,oe=`#version 300 es
precision highp float;
in vec2 vUV;
uniform vec2  uRes;
uniform float uTime;
uniform float uAspect;
uniform vec2  uPivot;     // where the hand turns
uniform vec2  uDialC;     // centre of the dial itself — not the same point
uniform float uDial;      // dial radius, in height units
uniform float uReveal;    // 0..1 the dial draws itself in
uniform float uHand;      // hand angle, radians — points at the active year
uniform float uHand2;     // the ornate secondary hand
uniform vec2  uTarget;    // where the beam lands (the active node), normalised
uniform float uBeam;      // 0..1 beam strength
uniform float uHeat;
out vec4 frag;

// a tapered clock hand along direction ang, from the pivot
float handShape(vec2 d, float ang, float len, float w0, float w1){
  vec2 hv = vec2(cos(ang), sin(ang));
  float along = dot(d, hv);
  float across = abs(d.x * hv.y - d.y * hv.x);
  if(along < 0.0 || along > len) return 0.0;
  float wid = mix(w0, w1, along / len);
  return smoothstep(wid, wid * 0.25, across);
}

const vec3 AMBER = vec3(1.00, 0.60, 0.24);
const vec3 EMBER = vec3(1.00, 0.20, 0.06);

void main(){
  vec2 p = vUV;
  vec2 d = (p - uPivot) * vec2(uAspect, 1.0);
  float r = length(d);
  float a = atan(d.y, d.x);
  vec3 col = vec3(0.0);
  float draw = smoothstep(0.0, 1.0, uReveal);

  // --- dial rim and ticks -------------------------------------------------
  // measured about the DIAL's centre, which sits above frame; only the shallow
  // lower sweep of that circle is ever visible, which is what makes the clock
  // read as enormous rather than as a ring floating in the corner
  vec2 dd = (p - uDialC) * vec2(uAspect, 1.0);
  float dr = length(dd);
  float da2 = atan(dd.y, dd.x);
  float onScreen = smoothstep(0.05, 0.45, da2) * smoothstep(3.10, 2.70, da2);

  float rim = smoothstep(0.0035, 0.0, abs(dr - uDial));
  col += AMBER * rim * 0.60 * onScreen * draw;
  float rim2 = smoothstep(0.0026, 0.0, abs(dr - uDial * 0.945));
  col += AMBER * rim2 * 0.32 * onScreen * draw;
  float rim3 = smoothstep(0.0030, 0.0, abs(dr - uDial * 1.07));
  col += AMBER * rim3 * 0.14 * onScreen * draw;

  // ticks: short radial dashes, longer every fifth
  {
    float n = da2 * 190.0 / 3.14159;
    float f = abs(fract(n) - 0.5);
    float major = step(0.5, abs(fract(n / 5.0) - 0.5) * 2.0 - 0.4);
    float tick = smoothstep(0.42, 0.48, f);
    float len = mix(0.011, 0.022, major);
    float inBand = smoothstep(len, 0.0, abs(dr - uDial * 0.972));
    col += AMBER * tick * inBand * (0.45 + 0.55 * major) * onScreen * draw;
  }

  // --- the beam thrown at the active year ---------------------------------
  // A cone of light from the pivot to the year it points at, with a hot core
  // line running its centre and a flood where it lands — the reference's
  // signature: the clock PROJECTS light into the timeline.
  float da = a - uHand;
  da = atan(sin(da), cos(da));
  float reach = smoothstep(1.30, 0.05, r);
  float wedge = exp(-da * da * 70.0);
  col += EMBER * wedge * reach * 0.50 * uBeam * (0.86 + 0.14 * sin(uTime * 2.2));
  col += mix(EMBER, vec3(1.0, 0.62, 0.34), 0.45)
       * exp(-da * da * 850.0) * reach * 0.80 * uBeam;
  // impact flood where the beam lands
  vec2 td = (p - uTarget) * vec2(uAspect, 1.0);
  col += vec3(1.0, 0.24, 0.08) * exp(-dot(td, td) * 160.0) * 1.1 * uBeam;
  col += vec3(1.0, 0.50, 0.24) * exp(-dot(td, td) * 950.0) * 1.3 * uBeam;

  // --- the primary hand: cream, tapered, riding inside the beam ------------
  float h1 = handShape(d, uHand, 0.34, 0.0050, 0.0010);
  col += vec3(1.0, 0.90, 0.78) * h1 * 1.05 * draw;

  // --- the ornate secondary hand -------------------------------------------
  // the reference pairs the beam with a decorative cream hand carrying a
  // pierced screw ornament partway down and a fine needle tip
  float h2 = handShape(d, uHand2, 0.30, 0.0056, 0.0008);
  col += vec3(0.98, 0.84, 0.66) * h2 * 0.95 * draw;
  {
    vec2 hv2 = vec2(cos(uHand2), sin(uHand2));
    // the pierced screw-head ornament, just short of halfway down the hand:
    // a four-lobed clover (one lobe aligned with the hand) with a bored centre
    vec2 orn = hv2 * 0.135;
    vec2 ov = d - orn;
    float od = length(ov);
    float oa = atan(ov.y, ov.x);
    float orad = 0.0110 * (0.72 + 0.28 * cos(4.0 * (oa - uHand2)));
    float rose = smoothstep(orad, orad * 0.70, od)
               * smoothstep(0.0036, 0.0052, od);
    col += vec3(0.98, 0.86, 0.70) * rose * 1.0 * draw;
    // needle: a brighter core line beyond the ornament
    float h2c = handShape(d, uHand2, 0.30, 0.0016, 0.0004);
    float outer = smoothstep(0.15, 0.19, dot(d, hv2));
    col += vec3(1.0, 0.96, 0.90) * h2c * outer * 0.9 * draw;
  }

  // --- pivot: a shaded ball, lit from upper left ---------------------------
  {
    float ball = smoothstep(0.0165, 0.0135, r);
    vec2 hi = d - vec2(-0.005, -0.005);
    float sheen = exp(-dot(hi, hi) * 9000.0);
    col += (vec3(0.92, 0.80, 0.66) * 0.85 + vec3(1.0, 0.98, 0.94) * sheen) * ball * draw;
    col += AMBER * exp(-r * r * 900.0) * 0.5 * draw;      // warm halo
  }

  frag = vec4(col, 1.0);
}`,se=`#version 300 es
precision highp float;
in vec2 vUV;
uniform vec2  uRes;
uniform float uTime;
uniform float uAspect;
uniform vec3  uArc;        // centre x, centre y, radius (normalised, height units)
uniform vec2  uSpan;       // start and end angle of the visible arc
uniform float uReveal;     // 0..1 the line draws itself from 2021 forward
uniform float uActiveU;    // continuous position of the active year, 0..5
uniform float uHeat;
uniform vec2  uNodes[6];
uniform float uNodeIn[6];  // per-node materialisation
out vec4 frag;

const vec3 AMBER = vec3(1.00, 0.62, 0.26);
const vec3 EMBER = vec3(1.00, 0.24, 0.08);

void main(){
  vec2 p = vUV;
  vec2 d = (p - uArc.xy) * vec2(uAspect, 1.0);
  float r = length(d);
  float a = atan(d.y, d.x);
  vec3 col = vec3(0.0);

  // --- the rail -----------------------------------------------------------
  // u runs 0..1 from the 2021 end to the 2026 end
  float u = clamp((a - uSpan.x) / (uSpan.y - uSpan.x), 0.0, 1.0);
  float within = step(min(uSpan.x, uSpan.y) - 0.02, a)
               * step(a, max(uSpan.x, uSpan.y) + 0.02);
  float drawn = smoothstep(uReveal + 0.02, uReveal - 0.06, u);

  // the reference rail is a double track with a soft glow between the lines
  float line = smoothstep(0.0016, 0.0, abs(r - (uArc.z - 0.0035)));
  float line2 = smoothstep(0.0014, 0.0, abs(r - (uArc.z + 0.0035)));
  float glow = exp(-pow((r - uArc.z) / 0.011, 2.0));
  col += AMBER * (line * 0.85 + line2 * 0.55 + glow * 0.24) * within * drawn;

  // fine minute-ticks hanging just beneath the rail
  {
    float tn = a * 260.0 / 3.14159;
    float tf = smoothstep(0.40, 0.47, abs(fract(tn) - 0.5));
    float band2 = smoothstep(0.0, 0.004, r - (uArc.z + 0.006))
                * smoothstep(0.017, 0.009, r - (uArc.z + 0.006));
    col += AMBER * tf * band2 * 0.30 * within * drawn;
  }

  // energy running along the rail toward the active year
  float head = uActiveU / 5.0;
  float chase = fract(u * 2.4 - uTime * 0.28);
  float pulse = pow(max(0.0, 1.0 - abs(u - head) * 6.0), 2.0);
  col += EMBER * (line + line2 * 0.6) * (0.55 * pulse + 0.20 * pow(chase, 8.0))
       * within * drawn * (0.6 + 0.4 * uHeat);

  // the stretch already travelled runs hotter than the stretch ahead
  col += EMBER * line * smoothstep(head + 0.04, head - 0.10, u) * 0.30 * within * drawn;

  // --- nodes --------------------------------------------------------------
  for(int i = 0; i < 6; i++){
    vec2 nd = (p - uNodes[i]) * vec2(uAspect, 1.0);
    float ndr = length(nd);
    float near = 1.0 - clamp(abs(float(i) - uActiveU), 0.0, 1.0);
    float k = uNodeIn[i];
    col += vec3(1.0, 0.88, 0.74) * smoothstep(0.0055, 0.0015, ndr) * k;
    col += mix(AMBER, EMBER, near) * exp(-ndr * ndr * 2600.0) * (0.5 + 0.9 * near) * k;
    // the active node throws a wider halo
    col += EMBER * exp(-ndr * ndr * 420.0) * 0.42 * near * k * uHeat;
  }

  frag = vec4(col, 1.0);
}`,ce=`#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;
uniform vec4 uRect;    // x, y, w, h in pixels
uniform vec2 uRes;
out vec2 vUV;
void main(){
  vUV = aPos;
  vec2 px = uRect.xy + aPos * uRect.zw;
  gl_Position = vec4(px.x / uRes.x * 2.0 - 1.0, 1.0 - px.y / uRes.y * 2.0, 0.0, 1.0);
}`,le=`#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uFig;
uniform sampler2D uGrain;
uniform float uOpacity;
uniform float uRim;
uniform vec2  uLightDir;   // toward the active year
uniform float uHeat;
out vec4 frag;

void main(){
  // vUV is already y-down from V3_QUAD and the texture is uploaded unflipped,
  // so v maps straight through; inverting here stands him on his head
  vec4 s = texture(uFig, vUV);
  float a = s.a;
  if(a <= 0.004) discard;

  // dark, not black: enough base for the suit's folds to exist
  vec3 col = s.rgb * 0.105 + vec3(0.022, 0.011, 0.007) * a;

  // rim from the matte's own gradient, so it rides his real outline
  vec2 texel = vec2(1.0) / vec2(textureSize(uFig, 0));
  float ax = texture(uFig, vUV + vec2(texel.x, 0.0)).a
           - texture(uFig, vUV - vec2(texel.x, 0.0)).a;
  float ay = texture(uFig, vUV + vec2(0.0, texel.y)).a
           - texture(uFig, vUV - vec2(0.0, texel.y)).a;
  vec2 n = vec2(-ax, -ay);
  float edge = length(n);
  if(edge > 0.001){
    vec2 nn = normalize(n);
    // key rim from the active-year side, plus a weaker fill on the opposite
    // edge and a halo on upward-facing hair — the reference wraps him softly
    // on BOTH sides rather than etching one hard outline
    float key = clamp(dot(nn, normalize(uLightDir)), 0.0, 1.0);
    float fill = clamp(dot(nn, normalize(vec2(-uLightDir.x, uLightDir.y))), 0.0, 1.0);
    float up = clamp(-nn.y, 0.0, 1.0);
    col += vec3(1.0, 0.55, 0.22) * pow(key, 5.0) * edge * 4.2 * uRim;
    col += vec3(1.0, 0.40, 0.15) * pow(fill, 5.0) * edge * 2.0 * uRim;
    col += vec3(1.0, 0.60, 0.28) * pow(up, 3.0) * edge * 1.4 * uRim;
    col += vec3(1.0, 0.28, 0.10) * pow(key, 2.5) * edge * 0.8 * uRim * uHeat;
  }
  // the floor pool throws warmth back up at his legs
  col += vec3(1.0, 0.44, 0.17) * smoothstep(0.55, 1.0, vUV.y) * 0.16 * uRim * a;

  float g = texture(uGrain, gl_FragCoord.xy / 512.0).r;
  col += (g - 0.5) * 0.018;

  float o = a * uOpacity;
  frag = vec4(col * o, o);
}`,ue=`#version 300 es
precision highp float;
in vec2 vUV;
uniform float uTime;
uniform float uAspect;
uniform float uRings;
uniform vec2  uFloor;
uniform float uCut;       // only rows below this are near-side floor
out vec4 frag;

void main(){
  vec2 p = vUV;
  if(p.y < uCut){ discard; }
  vec2 d = (p - uFloor) * vec2(uAspect, 1.0);
  d.y /= 0.30;
  float r = length(d);
  float a = atan(d.y, d.x);
  float e = 0.0;
  for(int i = 0; i < 5; i++){
    float fi = float(i);
    float R = 0.16 + fi * 0.135;
    float spin = uTime * (0.05 + fi * 0.023) * (mod(fi, 2.0) < 0.5 ? 1.0 : -1.4);
    float band = smoothstep(0.010, 0.0, abs(r - R));
    float sweep = 0.55 + 0.45 * sin(a * (1.0 + fi) + spin * 6.0);
    e += band * sweep * (1.0 - fi * 0.14);
  }
  float soft = smoothstep(uCut, uCut + 0.03, p.y);
  vec3 col = vec3(1.0, 0.56, 0.20) * e * 0.30 * uRings * soft;
  frag = vec4(col, 0.0);
}`,de=`#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uGrain;
uniform vec2 uRes;
uniform float uTime;
uniform float uAmount;
uniform float uAspect;
out vec4 frag;
void main(){
  vec2 j = vec2(fract(sin(uTime * 12.9898) * 43758.5453),
                fract(sin(uTime * 78.233) * 12345.6789));
  float g = texture(uGrain, vUV * (uRes / 512.0) + j).r - 0.5;
  vec2 v = (vUV - 0.5) * vec2(uAspect, 1.0);
  frag = vec4(vec3(g * uAmount), smoothstep(0.48, 1.2, length(v)) * 0.45);
}`,P=[{year:2022,key:`Village Roots`,lines:[`Database Extraction`,`Raw Directory Mining`,`Big Dreams 😉`]},{year:2023,key:`Market Intel`,lines:[`Trends Analysis`,`Buyer Signals`,`Competitor Research`]},{year:2023,key:`Multichannel`,lines:[`Cold Outbound`,`WhatsApp (Wati/Gupshup)`,`Woodpecker & Resend`]},{year:2024,key:`Enterprise CRM`,lines:[`Custom Supabase CRM`,`Recykal Systems`,`Zero SaaS Bloat`]},{year:2025,key:`AI Automation`,lines:[`5 Autonomous Agents`,`₹100Cr Pipeline`,`Claude 3.7 API`]},{year:2026,key:`Next Horizon`,lines:[`Here I Am`,`Open for Challenges`,`Top MNC Scale`]}],F={nodes:[[.2226,.1456],[.3201,.2319],[.4245,.294],[.5373,.3382],[.6648,.3683],[.8064,.3776]],cards:[[.2047,.2875,.081],[.3109,.3569,.088],[.425,.4097,.095],[.5375,.4583,.102],[.6906,.5083,.11],[.818,.5292,.124]],pivot:[.6991,.0483],dial:[0,-.2,.47],figure:[.39,.974,.412],floor:[.49,.955]};function fe(e,t){let n=e/t,r=n<.95,i,a=0,o=0;n>=1.7777777777777777?(i=t/720,a=(e-1280*i)*.5):(i=e/1280,o=(t-720*i)*.5);let s=([e,t])=>[a+e*1280*i,o+t*720*i],c,l,u,d,f;if(r){let n=e*.155,r=t*.255,i=t*.088;c=F.nodes.map((t,a)=>[n+a*e*.006,r+a*i]);let a=Math.min(e*.62,330);l=F.nodes.map((n,r)=>({x:e*.6,y:t*.5,w:a,i:r})),u=[e*.52,t*.075],d=[e*.5,t*.965],f={cx:e*.5,feet:t*.965,h:t*.3}}else c=F.nodes.map(s),l=F.cards.map(([e,t,n],r)=>{let[a,o]=s([e,t]);return{x:a,y:o,w:n*1280*i,i:r}}),u=s(F.pivot),d=s(F.floor),f={cx:s([F.figure[0],0])[0],feet:s([0,F.figure[1]])[1],h:F.figure[2]*720*i};let p=pe(c),m=c.map(e=>Math.atan2(e[1]-p.cy,e[0]-p.cx)),h=c.map(e=>Math.atan2(e[1]-u[1],e[0]-u[0])),g=r?{cx:u[0],cy:u[1]-t*.3,r:t*.4}:{cx:u[0]+F.dial[0]*720*i,cy:u[1]+F.dial[1]*720*i,r:F.dial[2]*720*i};return{w:e,h:t,scale:i,portrait:r,nodes:c,cards:l,pivot:u,dial:g,floor:d,figure:f,arc:p,angles:m,handAngles:h}}function pe(e){let[t,n,r]=me(e.map(e=>[e[0],e[1],1]),e.map(e=>-(e[0]*e[0]+e[1]*e[1]))),i=-t/2,a=-n/2;return{cx:i,cy:a,r:Math.sqrt(Math.max(i*i+a*a-r,1))}}function me(e,t){let n=[[0,0,0],[0,0,0],[0,0,0]],r=[0,0,0];for(let i=0;i<e.length;i++)for(let a=0;a<3;a++){r[a]+=e[i][a]*t[i];for(let t=0;t<3;t++)n[a][t]+=e[i][a]*e[i][t]}for(let e=0;e<3;e++){let t=e;for(let r=e+1;r<3;r++)Math.abs(n[r][e])>Math.abs(n[t][e])&&(t=r);[n[e],n[t]]=[n[t],n[e]],[r[e],r[t]]=[r[t],r[e]];let i=n[e][e]||1e-9;for(let t=e+1;t<3;t++){let a=n[t][e]/i;for(let r=e;r<3;r++)n[t][r]-=a*n[e][r];r[t]-=a*r[e]}}let i=[0,0,0];for(let e=2;e>=0;e--){let t=r[e];for(let r=e+1;r<3;r++)t-=n[e][r]*i[r];i[e]=t/(n[e][e]||1e-9)}return i}function he(e,t,n){let r=e.portrait?e.nodes.map(e=>[e[0],e[1]]):e.cards.map(e=>[e.x,e.y]),i=0,a=1/0;for(let e=0;e<r.length-1;e++){let[o,s]=r[e],[c,l]=r[e+1],u=c-o,d=l-s,f=u*u+d*d||1,p=((t-o)*u+(n-s)*d)/f;p=Math.max(0,Math.min(1,p));let m=o+u*p,h=s+d*p,g=(t-m)**2+(n-h)**2;g<a&&(a=g,i=e+p)}return{u:i,dist:Math.sqrt(a)}}function ge(e,t){let n=Math.max(0,Math.min(e.length-2,Math.floor(t))),r=Math.max(0,Math.min(1,t-n)),i=e[n],a=e[n+1]-i;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;return i+a*r}var I={warm:.25,rail:.8,railDur:1.3,clock:1.5,clockDur:1.15,cards:2.05,cardStagger:.11,cardDur:.75,figure:2.75,rings:3.15,energy:3.5,live:4.2};function _e(e,t=6){let n=O(0,1,T(e,I.warm,I.warm+1.8)),r=E(T(e,I.rail,I.rail+I.railDur)),i=D(T(e,I.clock,I.clock+I.clockDur)),a=[],o=[];for(let n=0;n<t;n++){let t=I.cards+n*I.cardStagger;a.push(E(T(e,t,t+I.cardDur))),o.push(E(T(e,t-.22,t+.35)))}return{wake:n,rail:r,clock:i,cards:a,nodes:o,figure:O(0,1,T(e,I.figure,I.figure+1.3)),rings:O(0,1,T(e,I.rings,I.rings+1.6)),energy:O(0,1,T(e,I.energy,I.energy+1.4)),introU:w(0,5,D(T(e,I.clock+.3,I.clock+2.4))),handAuthority:1-O(0,1,T(e,I.live-.6,I.live+.4)),grain:w(.075,.036,O(0,1,T(e,.4,I.rings))),live:e>=I.live,progress:C(e/I.live)}}var ve=class{constructor(e,t,a=null){this.canvas=e,this.gl=t,this.progs={room:n(t,N,ae,`room`),track:n(t,N,se,`track`),clock:n(t,N,oe,`clock`),figure:n(t,ce,le,`figure`),ringsFront:n(t,N,ue,`ringsFront`),post:n(t,N,de,`post`)},this.quad=r(t),this.tex={grain:i(t,{wrap:`repeat`}),figure:i(t)},this.front=a?{canvas:a.canvas,gl:a.gl,progs:{figure:n(a.gl,ce,le,`figure/front`),ringsFront:n(a.gl,N,ue,`ringsFront/front`)},quad:r(a.gl),tex:{grain:i(a.gl,{wrap:`repeat`}),figure:i(a.gl)}}:null,this.layout=null,this.res=[1,1],this.u=5,this.targetU=5,this.heat=0,this.pointer={x:0,y:0,tx:0,ty:0,inside:!1},this.active=5}async load(){let[e,t]=await Promise.all([s(`tex/grain.png`),s(`years/figure.png`)]);a(this.gl,this.tex.grain,e),a(this.gl,this.tex.figure,t),this.front&&(a(this.front.gl,this.front.tex.grain,e),a(this.front.gl,this.front.tex.figure,t)),this.figAspect=t.width/t.height}resize(e,t,n){let r=Math.round(e*n),i=Math.round(t*n);if((this.canvas.width!==r||this.canvas.height!==i)&&(this.canvas.width=r,this.canvas.height=i),this.res=[r,i],this.cssW=e,this.cssH=t,this.dpr=n,this.layout=fe(e,t),this.gl.viewport(0,0,r,i),this.front){let e=this.front.canvas;(e.width!==r||e.height!==i)&&(e.width=r,e.height=i),this.front.gl.viewport(0,0,r,i)}return this.layout}_n(e,t){return[e/this.cssW,t/this.cssH]}render(e,t){let n=this.gl,r=this.layout;if(!r)return null;let[i,a]=this.res,s=i/a,c=_e(e,P.length),l=w(this.targetU,c.introU,c.handAuthority);this.u=C(k(this.u,l,4.2,t),0,P.length-1),this.active=Math.max(0,Math.min(P.length-1,Math.round(this.u))),this.heat=k(this.heat,c.energy,3,t);let u=this.pointer;u.x=k(u.x,u.inside?u.tx:0,2.6,t),u.y=k(u.y,u.inside?u.ty:0,2.6,t);let d=+!!c.live,f=-u.x*.01*d,p=-u.y*.006*d,m=ge(r.handAngles,this.u),h=P.length-1,g=Math.max(0,Math.min(h,Math.floor(this.u)||0)),_=Math.min(h,g+1),v=this._n(w(r.cards[g].x,r.cards[_].x,C(this.u-g,0,1)),r.cards[this.active].y),y=C(this.u-g,0,1),b=this._n(w(r.nodes[g][0],r.nodes[_][0],y),w(r.nodes[g][1],r.nodes[_][1],y));n.disable(n.DEPTH_TEST),n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA),n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT),n.bindVertexArray(this.quad);let x=this._n(r.pivot[0],r.pivot[1]),S=this._n(r.floor[0],r.floor[1]);{let t=this.progs.room;n.useProgram(t.p),n.uniform1i(t.u.uGrain,o(n,this.tex.grain,0)),n.uniform2f(t.u.uRes,i,a),n.uniform1f(t.u.uTime,e),n.uniform1f(t.u.uAspect,s),n.uniform1f(t.u.uWake,c.wake),n.uniform1f(t.u.uRings,c.rings),n.uniform2f(t.u.uFloor,S[0]+f,S[1]+p),n.uniform2f(t.u.uPivot,x[0]+f,x[1]+p),n.uniform1f(t.u.uHeat,this.heat),n.uniform2f(t.u.uActive,v[0],v[1]),n.uniform2f(t.u.uFig,r.figure.cx/this.cssW,r.figure.feet/this.cssH),n.drawArrays(n.TRIANGLE_STRIP,0,4)}n.blendFunc(n.ONE,n.ONE);{let t=this.progs.track;n.useProgram(t.p),n.uniform2f(t.u.uRes,i,a),n.uniform1f(t.u.uTime,e),n.uniform1f(t.u.uAspect,s);let o=this._n(r.arc.cx,r.arc.cy);n.uniform3f(t.u.uArc,o[0]+f*.6,o[1]+p*.6,r.arc.r/this.cssH),n.uniform2f(t.u.uSpan,r.angles[0],r.angles[r.angles.length-1]),n.uniform1f(t.u.uReveal,c.rail),n.uniform1f(t.u.uActiveU,this.u),n.uniform1f(t.u.uHeat,this.heat);for(let e=0;e<r.nodes.length;e++){let i=this._n(r.nodes[e][0],r.nodes[e][1]);n.uniform2f(t.u[`uNodes[${e}]`],i[0]+f*.6,i[1]+p*.6),n.uniform1f(t.u[`uNodeIn[${e}]`],c.nodes[e])}n.drawArrays(n.TRIANGLE_STRIP,0,4)}this._drawFigure(e,c,i,a,s,f,p,v,S),n.blendFunc(n.ONE,n.ONE);{let t=this.progs.clock;n.useProgram(t.p),n.uniform2f(t.u.uRes,i,a),n.uniform1f(t.u.uTime,e),n.uniform1f(t.u.uAspect,s),n.uniform2f(t.u.uPivot,x[0]+f,x[1]+p);let o=this._n(r.dial.cx,r.dial.cy);n.uniform2f(t.u.uDialC,o[0]+f,o[1]+p),n.uniform1f(t.u.uDial,r.dial.r/this.cssH),n.uniform1f(t.u.uReveal,c.clock),n.uniform1f(t.u.uHand,m),n.uniform1f(t.u.uHand2,m+1.29),n.uniform2f(t.u.uTarget,b[0],b[1]),n.uniform1f(t.u.uBeam,c.energy),n.uniform1f(t.u.uHeat,this.heat),n.drawArrays(n.TRIANGLE_STRIP,0,4)}n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA);{let t=this.progs.post;n.useProgram(t.p),n.uniform1i(t.u.uGrain,o(n,this.tex.grain,0)),n.uniform2f(t.u.uRes,i,a),n.uniform1f(t.u.uTime,e),n.uniform1f(t.u.uAmount,c.grain),n.uniform1f(t.u.uAspect,s),n.drawArrays(n.TRIANGLE_STRIP,0,4)}return n.bindVertexArray(null),c}_drawFigure(e,t,n,r,i,a,s,c,l){let u=this.front&&!this.layout.portrait?this.front:null,d=u?u.gl:this.gl,f=u?u.progs:this.progs,p=u?u.tex:this.tex,m=this.layout;if(u)d.clearColor(0,0,0,0),d.clear(d.COLOR_BUFFER_BIT),d.bindVertexArray(u.quad);else if(this.front){let e=this.front.gl;e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)}d.blendFunc(d.ONE,d.ONE_MINUS_SRC_ALPHA);{let e=f.figure;d.useProgram(e.p);let l=m.figure.h*this.dpr,u=l*this.figAspect,h=m.figure.cx*this.dpr-u*.5+a*n*.35,g=m.figure.feet*this.dpr-l+s*r*.35;d.uniform4f(e.u.uRect,h,g,u,l),d.uniform2f(e.u.uRes,n,r),d.uniform1i(e.u.uFig,o(d,p.figure,0)),d.uniform1i(e.u.uGrain,o(d,p.grain,1)),d.uniform1f(e.u.uOpacity,t.figure),d.uniform1f(e.u.uRim,.5+.7*t.rings),d.uniform1f(e.u.uHeat,this.heat);let _=c[0]-m.figure.cx/this.cssW;d.uniform2f(e.u.uLightDir,_*i,-.42),d.drawArrays(d.TRIANGLE_STRIP,0,4)}d.blendFunc(d.ONE,d.ONE);{let n=f.ringsFront;d.useProgram(n.p),d.uniform1f(n.u.uTime,e),d.uniform1f(n.u.uAspect,i),d.uniform1f(n.u.uRings,t.rings),d.uniform2f(n.u.uFloor,l[0]+a,l[1]+s),d.uniform1f(n.u.uCut,m.figure.feet/this.cssH-.055),d.drawArrays(d.TRIANGLE_STRIP,0,4)}u?d.bindVertexArray(null):d.blendFunc(d.ONE,d.ONE_MINUS_SRC_ALPHA)}};async function ye(){let t=document.getElementById(`chrono`),n=document.getElementById(`chronoStage`),r=document.getElementById(`chronoDeck`);if(!t||!n||!r)return null;let i=e(n);if(!i)return t.classList.add(`is-fallback`),null;let a=document.getElementById(`chronoFront`),o=a?e(a,{alpha:!0}):null,s=matchMedia(`(prefers-reduced-motion: reduce)`).matches,c=matchMedia(`(pointer: coarse)`),l=new ve(n,i,o?{canvas:a,gl:o}:null);await l.load();function u(e){l.targetU=Math.max(0,Math.min(P.length-1,e))}let d=P.map((e,t)=>{let n=document.createElement(`button`);return n.type=`button`,n.className=`yr`,n.dataset.i=String(t),n.setAttribute(`aria-label`,`${e.year} — ${e.key}`),n.innerHTML=`<span class="yr__frame"><img class="yr__img" src="./years/${e.year}.jpg" alt="" loading="lazy" decoding="async"><span class="yr__body"><span class="yr__year">${e.year}</span><span class="yr__key">${e.key}</span><span class="yr__lines">${e.lines.map(e=>`<i>${e}</i>`).join(``)}</span></span><svg class="yr__go" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 L12 4 M6 4 H12 V10" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span>`,r.appendChild(n),n}),f=P.map((e,t)=>{let n=document.createElement(`button`);return n.type=`button`,n.className=`yr-tag`,n.textContent=String(e.year),n.tabIndex=-1,n.setAttribute(`aria-label`,`Show ${e.year}`),n.addEventListener(`click`,()=>u(t)),n.addEventListener(`pointerenter`,()=>{c.matches||u(t)}),r.appendChild(n),n}),p={started:0,running:!1,visible:!1,raf:0,last:0};function m(){let e=Math.min(window.devicePixelRatio||1,2),n=l.resize(window.innerWidth,window.innerHeight,e),r=n.portrait;for(let e=0;e<d.length;e++){let t=n.cards[e],i=d[e],a=r?t.w:t.w*1.62;i.style.width=`${a}px`,i.style.left=`${t.x}px`,i.style.top=`${t.y}px`;let o=r?0:(n.angles[e]-n.angles[n.angles.length-1])*14;i.style.setProperty(`--tilt`,`${o.toFixed(2)}deg`),i.style.setProperty(`--depth`,String(e));let s=n.nodes[e];f[e].style.left=`${s[0]}px`,f[e].style.top=`${s[1]}px`,f[e].style.fontSize=`${Math.max(19,t.w*.3)}px`}t.classList.toggle(`is-portrait`,r)}m();let h;window.addEventListener(`resize`,()=>{clearTimeout(h),h=setTimeout(m,140)}),t.addEventListener(`pointermove`,e=>{if(c.matches)return;let t=n.getBoundingClientRect(),r=e.clientX-t.left,i=e.clientY-t.top;l.pointer.tx=r/t.width*2-1,l.pointer.ty=i/t.height*2-1,l.pointer.inside=!0;let{u:a,dist:o}=he(l.layout,r,i);o<t.height*.55&&u(a)},{passive:!0}),t.addEventListener(`pointerleave`,()=>{l.pointer.inside=!1}),d.forEach((e,t)=>{e.addEventListener(`pointerenter`,()=>{c.matches||u(t)}),e.addEventListener(`click`,()=>u(t)),e.addEventListener(`focus`,()=>u(t))});let g=-1,_=e=>{if(!p.running)return;let n=Math.min(.05,(e-p.last)/1e3||.016);p.last=e;let r=s?I.live+2:(e-p.started)/1e3,i=l.render(r,n);if(i){i.live&&t.classList.add(`is-live`);for(let e=0;e<d.length;e++){let t=1-Math.min(1,Math.abs(e-l.u));d[e].style.setProperty(`--in`,i.cards[e].toFixed(3)),d[e].style.setProperty(`--near`,t.toFixed(3)),f[e].style.setProperty(`--in`,i.nodes[e].toFixed(3)),f[e].style.setProperty(`--near`,t.toFixed(3))}l.active!==g&&(g=l.active,d.forEach((e,t)=>e.classList.toggle(`is-active`,t===l.active)),f.forEach((e,t)=>e.classList.toggle(`is-active`,t===l.active)),t.dataset.year=String(P[l.active].year))}p.raf=requestAnimationFrame(_)},v=()=>{p.running||(p.running=!0,p.last=performance.now(),p.started||=performance.now(),p.raf=requestAnimationFrame(_))},y=()=>{p.running=!1,cancelAnimationFrame(p.raf)};return new IntersectionObserver(e=>{for(let t of e)p.visible=t.isIntersecting,t.isIntersecting?v():y()},{threshold:.22}).observe(t),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?y():p.visible&&v()}),window.__shot3=async(e=`chrono`,t=null)=>{let r=t===null?(performance.now()-p.started)/1e3:t;l.render(r,.016);let i=document.createElement(`canvas`);i.width=n.width,i.height=n.height;let a=i.getContext(`2d`);a.drawImage(n,0,0),l.front&&a.drawImage(l.front.canvas,0,0);let o=i.toDataURL(`image/png`);return await fetch(`/__shot?name=${encodeURIComponent(e)}`,{method:`POST`,body:o}),`${n.width}x${n.height} @ t=${r.toFixed(2)}`},window.__chrono=l,{chrono:l,section:t,setTarget:u}}var be=`#version 300 es
layout(location=0) in vec2 aPos;
out vec2 vUV;
void main(){
  // y-DOWN to match CSS-normalised coordinates, same convention as scene 3
  vUV = vec2(aPos.x, 1.0 - aPos.y);
  gl_Position = vec4(aPos * 2.0 - 1.0, 0.0, 1.0);
}`,xe=`#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uPlate;
uniform sampler2D uGrain;
uniform vec4  uCover;    // xy scale, zw offset: viewport uv -> plate uv
uniform float uTime;
uniform float uAspect;
uniform float uWake;     // global exposure 0..1
uniform float uRing;     // overhead structure light
uniform float uFloorL;   // floor circle light
uniform float uSpark;    // ignition sweep 0..1 around the circle
uniform float uPerson;   // his arrival warms the centre glow
uniform vec2  uPar;      // pointer parallax, -1..1
uniform float uDolly;    // scroll push-in 0..1
uniform vec4  uEllA;     // outer floor ellipse, frame fractions (cx cy rx ry)
uniform vec4  uEllB;     // inner floor ellipse
uniform vec4  uRingE;    // overhead ring ellipse
out vec4 frag;

float ellDist(vec2 p, vec4 e){
  vec2 d = (p - e.xy) / e.zw;
  return length(d);
}

void main(){
  // parallax + dolly live in plate space: the room drifts against the cards
  // and eases toward the camera as the visitor scrolls
  vec2 uv = vUV;
  uv = (uv - 0.5) * (1.0 - 0.028 * uDolly) + 0.5;
  uv += vec2(-uPar.x * 0.006, -uPar.y * 0.004);
  vec2 p = uv * uCover.xy + uCover.zw;      // frame fractions 0..1
  p = clamp(p, 0.001, 0.999);

  vec3 base = texture(uPlate, p).rgb;

  // ---- staged lighting ----------------------------------------------------
  // the room is never fully dark - an ember floor - and reaches full only
  // when the deck has assembled
  float zone = 1.0;
  // overhead structure: everything above the horizon band answers to uRing
  float top = smoothstep(0.42, 0.12, p.y);
  zone = mix(zone, uRing, top);
  // floor: everything below answers to uFloorL
  float low = smoothstep(0.55, 0.78, p.y);
  zone = mix(zone, uFloorL, low);
  vec3 col = base * (0.05 + 0.95 * zone * uWake);

  // ---- the floor circle, live ---------------------------------------------
  // additive glints riding exactly on the baked ellipses; during ignition a
  // hot spark sweeps the ring and leaves it lit behind itself
  float aA = atan((p.y - uEllA.y) / uEllA.w, (p.x - uEllA.x) / uEllA.z);
  float sweep = uSpark * 6.9 - 3.45;        // -pi..pi as the spark travels
  float litA = smoothstep(0.06, -0.4, aA - sweep) + step(6.85, uSpark * 6.9);
  float dA = abs(ellDist(p, uEllA) - 1.0);
  float lineA = exp(-dA * dA * 2600.0);
  float dB = abs(ellDist(p, uEllB) - 1.0);
  float lineB = exp(-dB * dB * 2200.0);
  // whisper-level: the plate already carries the lit lines, these only breathe
  float breathe = 0.90 + 0.10 * sin(uTime * 0.8 + p.x * 4.0);
  col += vec3(1.0, 0.86, 0.68) * lineA * 0.15 * uFloorL * min(litA, 1.0) * breathe;
  col += vec3(1.0, 0.78, 0.58) * lineB * 0.09 * uFloorL * breathe;
  // the spark head itself
  vec2 head = uEllA.xy + vec2(cos(sweep) * uEllA.z, sin(sweep) * uEllA.w);
  vec2 hd = (p - head) * vec2(uAspect, 1.0);
  col += vec3(1.0, 0.75, 0.45) * exp(-dot(hd, hd) * 2400.0)
       * uFloorL * (1.0 - step(0.999, uSpark)) * 0.8;

  // ---- the overhead ring, live --------------------------------------------
  float dR = abs(ellDist(p, uRingE) - 1.0);
  float rim = exp(-dR * dR * 900.0) * smoothstep(0.02, 0.10, p.y);
  col += vec3(1.0, 0.92, 0.80) * rim * 0.12 * uRing
       * (0.75 + 0.25 * sin(uTime * 0.6 + p.x * 9.0));

  // ---- centre glow: the stage light that receives him ---------------------
  vec2 g = (p - vec2(0.499, 0.70)) * vec2(uAspect * 0.62, 4.4);
  float pool = exp(-dot(g, g) * 5.5);
  col += vec3(1.0, 0.62, 0.33) * pool * 0.06 * (0.35 + 0.65 * uPerson) * uFloorL;

  // ---- wet-floor shimmer --------------------------------------------------
  // the baked reflections already streak the tiles; a slow-scrolling grain
  // multiplied over the bright parts makes the water feel live
  float wet = smoothstep(0.62, 0.9, p.y) * smoothstep(0.35, 0.12, abs(p.x - 0.5) - 0.18);
  float g1 = texture(uGrain, p * vec2(3.0, 1.2) + vec2(0.0, uTime * 0.015)).r;
  float lum = dot(base, vec3(0.35, 0.45, 0.2));
  col += base * (g1 - 0.5) * wet * smoothstep(0.05, 0.35, lum) * 0.38 * uFloorL;

  frag = vec4(col, 1.0);
}`,L=[1600,900],R=[{id:`p01_timeless`,title:`Multi-Agent Campaign Engine`,box:[213,72,384,273],depth:.45,tint:[.309,.334,.382]},{id:`p02_game`,title:`Custom Supabase CRM`,box:[63,251,428,269],depth:.25,tint:[.249,.267,.295]},{id:`p03_build`,title:`₹100Cr Growth Machine`,box:[566,41,471,288],depth:.6,tint:[.414,.291,.291]},{id:`p04_driven`,title:`Recykal Atlas Geospatial`,box:[998,95,460,377],depth:.45,tint:[.322,.278,.261]},{id:`p05_ideas`,title:`Re-Extractor BI Engine`,box:[394,358,232,198],depth:.8,tint:[.39,.303,.234]},{id:`p06_sound`,title:`24/7 Auction Monitor`,box:[568,364,173,203],depth:.9,tint:[.336,.324,.333]},{id:`p07_food`,title:`EPR Readiness Score`,box:[698,366,211,204],depth:1,tint:[.336,.243,.217]},{id:`p08_travel`,title:`Three Vertical Portals`,box:[844,370,195,206],depth:.9,tint:[.26,.32,.366]},{id:`p09_space`,title:`Claude Prompt Systems`,box:[988,364,231,208],depth:.8,tint:[.336,.283,.269]},{id:`p10_play`,title:`Human-in-the-Loop Gateway`,box:[1181,251,355,242],depth:.3,tint:[.448,.305,.235]},{id:`p11_cleaner`,title:`Zero-SaaS Infrastructure`,box:[118,467,345,243],depth:.1,tint:[.311,.339,.263]},{id:`p12_steps`,title:`1,000+ Verified Leads/Wk`,box:[1139,478,325,234],depth:.1,tint:[.31,.317,.302]}],z={x:718,y:483,w:160,h:335},Se=[798,735,372,80],Ce=[798,741,240,57],we=[802,34,392,148];function Te(e,t){let n=Math.max(e/L[0],t/L[1]);return{s:n,ox:(e-L[0]*n)/2,oy:(t-L[1]*n)/2}}var Ee=new Map([[2,{cx:.5,cy:.235,w:.8}],[0,{cx:.235,cy:.385,w:.5}],[3,{cx:.77,cy:.39,w:.48}],[6,{cx:.325,cy:.53,w:.29}],[7,{cx:.675,cy:.53,w:.29}],[10,{cx:.2,cy:.815,w:.48}],[11,{cx:.8,cy:.815,w:.48}]]),De=class{constructor(e,t){this.canvas=e,this.gl=t,this.progs={room:n(t,be,xe,`room4`),post:n(t,be,de,`post4`)},this.quad=r(t),this.tex={plate:i(t),grain:i(t,{wrap:`repeat`})},this.par={x:0,y:0},this.dolly=0}async load(){let[e,t]=await Promise.all([s(`projects/plate.jpg`),s(`tex/grain.png`)]);a(this.gl,this.tex.plate,e),a(this.gl,this.tex.grain,t)}resize(e,t,n){let r=Math.round(e*n),i=Math.round(t*n);return(this.canvas.width!==r||this.canvas.height!==i)&&(this.canvas.width=r,this.canvas.height=i),this.res=[r,i],this.cssW=e,this.cssH=t,this.fit=Te(e,t),this.gl.viewport(0,0,r,i),this.fit}_ell([e,t,n,r]){return[e/L[0],t/L[1],n/L[0],r/L[1]]}render(e,t){let n=this.gl,[r,i]=this.res,a=this.fit,s=this.cssW/(L[0]*a.s),c=this.cssH/(L[1]*a.s),l=-a.ox/(L[0]*a.s),u=-a.oy/(L[1]*a.s);n.disable(n.DEPTH_TEST),n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA),n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT),n.bindVertexArray(this.quad);{let a=this.progs.room;n.useProgram(a.p),n.uniform1i(a.u.uPlate,o(n,this.tex.plate,0)),n.uniform1i(a.u.uGrain,o(n,this.tex.grain,1)),n.uniform4f(a.u.uCover,s,c,l,u),n.uniform1f(a.u.uTime,e),n.uniform1f(a.u.uAspect,r/i),n.uniform1f(a.u.uWake,t.wake),n.uniform1f(a.u.uRing,t.ring),n.uniform1f(a.u.uFloorL,t.floor),n.uniform1f(a.u.uSpark,t.spark),n.uniform1f(a.u.uPerson,t.person),n.uniform2f(a.u.uPar,this.par.x,this.par.y),n.uniform1f(a.u.uDolly,this.dolly),n.uniform4f(a.u.uEllA,...this._ell(Se)),n.uniform4f(a.u.uEllB,...this._ell(Ce)),n.uniform4f(a.u.uRingE,...this._ell(we)),n.drawArrays(n.TRIANGLE_STRIP,0,4)}{let a=this.progs.post;n.useProgram(a.p),n.uniform1i(a.u.uGrain,o(n,this.tex.grain,0)),n.uniform2f(a.u.uRes,r,i),n.uniform1f(a.u.uTime,e),n.uniform1f(a.u.uAmount,t.grain),n.uniform1f(a.u.uAspect,r/i),n.drawArrays(n.TRIANGLE_STRIP,0,4)}n.bindVertexArray(null)}},B={wake:[0,.85],ring:[.5,1.55],floor:[.85,1.95],deck:[1.25,3.4],person:[2.75,3.85],labels:[3.3,4.35],live:4.1},Oe=B,ke=e=>Math.min(1,Math.max(0,e)),V=([e,t],n)=>ke((n-e)/(t-e)),H=e=>e*e*(3-2*e);function Ae(e){let t=H(V(B.wake,e)),n=V(B.ring,e),r=n>=1?1:n*(.55+.45*Math.abs(Math.sin(n*21))),i=H(V(B.floor,e)),a=V(B.deck,e),o=H(V(B.person,e)),s=V(B.labels,e);return{wake:.3*t+.7*H(a),ring:H(n)*.4+r*.6,floor:i,spark:i,deck:a,person:o,labels:s,live:e>=B.live,grain:.05+.03*t}}function je(e,t,n){return ke((e-t/Math.max(1,n-1)*.55)/.44999999999999996)}function Me(e){let t=e-1;return 1+t*t*(2.35*t+1.35)}var Ne=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n*r));async function Pe(){let t=document.getElementById(`gallery`),n=document.getElementById(`galleryStage`),r=document.getElementById(`galleryDeck`),i=document.getElementById(`galleryPerson`);if(!t||!n||!r||!i)return null;let a=e(n);if(!a)return t.classList.add(`is-fallback`,`is-set`),null;let o=new De(n,a);await o.load();let s=matchMedia(`(prefers-reduced-motion: reduce)`).matches,c=[...t.querySelectorAll(`.g-label`)],l=document.getElementById(`galleryNum`),u=R.map((e,t)=>t).sort((e,t)=>R[t].depth-R[e].depth),d=[];u.forEach((e,t)=>{d[e]=t});let f=R.map((e,t)=>{let n=document.createElement(`button`);return n.type=`button`,n.className=`g-card`,n.dataset.i=String(t),n.setAttribute(`aria-label`,`Project — ${e.title}`),n.style.setProperty(`--tint`,`rgba(${e.tint.map((e,t)=>t<3?Math.round(e*255):e)}, 0.5)`),n.style.zIndex=String(10+Math.round((1-e.depth)*20)),n.style.setProperty(`--i`,String(t)),n.innerHTML=`<span class="g-card__in"><img src="./projects/${e.id}.png" alt="" draggable="false" loading="eager" decoding="async"></span>`,r.appendChild(n),n});i.style.zIndex=`34`,i.style.display=`none`;let p=!1;function m(){let e=window.innerWidth,n=window.innerHeight,r=Math.min(window.devicePixelRatio||1,2),a=o.resize(e,n,r);p=e/n<.75,t.classList.toggle(`is-portrait`,p);for(let t=0;t<f.length;t++){let r=R[t],i=f[t];if(p){let a=Ee.get(t);if(!a){i.style.display=`none`;continue}i.style.display=``;let o=a.w*e;i.style.width=`${o}px`,i.style.left=`${a.cx*e-o/2}px`,i.style.top=`${a.cy*n-o*r.box[3]/r.box[2]/2}px`}else i.style.display=``,i.style.width=`${r.box[2]*a.s}px`,i.style.left=`${r.box[0]*a.s+a.ox}px`,i.style.top=`${r.box[1]*a.s+a.oy}px`}l&&!p&&(l.style.left=`${588*a.s+a.ox}px`,l.style.top=`${46*a.s+a.oy}px`,l.style.fontSize=`${Math.max(10,15*a.s)}px`),i.style.width=`${z.w*a.s}px`,i.style.left=`${z.x*a.s+a.ox}px`,i.style.top=`${z.y*a.s+a.oy}px`}m();let h;window.addEventListener(`resize`,()=>{clearTimeout(h),h=setTimeout(m,140)});let g={tx:0,ty:0,x:0,y:0,inside:!1};t.addEventListener(`pointermove`,e=>{let n=t.getBoundingClientRect();g.tx=(e.clientX-n.left)/n.width*2-1,g.ty=(e.clientY-n.top)/n.height*2-1,g.inside=!0},{passive:!0}),t.addEventListener(`pointerleave`,()=>{g.inside=!1}),r.addEventListener(`pointerover`,e=>{e.target.closest(`.g-card`)&&r.classList.add(`is-hot`)}),r.addEventListener(`pointerout`,e=>{e.relatedTarget&&e.relatedTarget.closest(`.g-card`)||r.classList.remove(`is-hot`)});let _={started:0,running:!1,visible:!1,raf:0,last:0,set:!1},v=e=>{if(!_.running)return;let n=Math.min(.05,(e-_.last)/1e3||.016);_.last=e;let a=s?Oe.live+2:(e-_.started)/1e3,c=Ae(a),l=t.getBoundingClientRect(),u=t.offsetHeight-window.innerHeight,m=u>4?Math.min(1,Math.max(0,-l.top/u)):0;g.x=Ne(g.x,g.inside?g.tx:0,2.8,n),g.y=Ne(g.y,g.inside?g.ty:0,2.8,n),o.par.x=g.x,o.par.y=g.y,o.dolly=m,o.render(a,c);let h=+!!c.live;r.style.transform=`rotateY(${(g.x*2.1*h).toFixed(3)}deg) rotateX(${(-g.y*1.4*h).toFixed(3)}deg) scale(${(1+m*.045).toFixed(4)})`;for(let e=0;e<f.length;e++){if(p&&!Ee.get(e))continue;let t=f[e],n=R[e].depth,r=Me(je(c.deck,d[e],f.length)),i=(1-r)*(.42*window.innerHeight),a=(6+(1-n)*26)*h,o=g.x*a,s=g.y*a*.55;t.style.transform=`translate3d(${o.toFixed(2)}px, ${(s+i).toFixed(2)}px, 0) rotateX(${((1-r)*-24).toFixed(2)}deg) rotateZ(${((1-r)*(e%2?3.5:-3.5)).toFixed(2)}deg) scale(${(.84+r*.16).toFixed(4)})`;let l=Math.min(1,Math.max(0,r*2.4));t.style.opacity=l.toFixed(3),r<.995?t.style.filter=`blur(${((1-Math.min(1,r))*7).toFixed(2)}px)`:t.style.filter&&(t.style.filter=``)}let y=c.person;i.style.transform=`translate3d(${(g.x*-9*h).toFixed(2)}px, ${(g.y*-5*h+(1-y)*34).toFixed(2)}px, 0) scale(${(.985+y*.015+m*.03).toFixed(4)})`,i.style.opacity=y.toFixed(3),c.labels>0&&!_.set&&(_.set=!0,t.classList.add(`is-labels`)),c.live&&t.classList.add(`is-live`),_.raf=requestAnimationFrame(v)},y=()=>{_.running||(_.running=!0,_.last=performance.now(),_.started||=performance.now(),_.raf=requestAnimationFrame(v))},b=()=>{_.running=!1,cancelAnimationFrame(_.raf)};return new IntersectionObserver(e=>{for(let t of e)_.visible=t.isIntersecting,t.isIntersecting?y():b()},{threshold:.22}).observe(t),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?b():_.visible&&y()}),c.forEach((e,t)=>e.style.setProperty(`--li`,String(t))),window.__shot4=async(e=`gallery`,t=null)=>{let r=t===null?(performance.now()-_.started)/1e3:t;o.render(r,Ae(r));let i=n.toDataURL(`image/png`);return await fetch(`/__shot?name=${encodeURIComponent(e)}`,{method:`POST`,body:i}),`${n.width}x${n.height} @ t=${r.toFixed(2)}`},window.__gallery={gallery:o,state:_,section:t},{gallery:o,section:t}}var U=`#version 300 es
layout(location=0) in vec2 aPos;
out vec2 vUV;
void main(){
  vUV = vec2(aPos.x, 1.0 - aPos.y);
  gl_Position = vec4(aPos * 2.0 - 1.0, 0.0, 1.0);
}`,Fe=`#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uPlate;
uniform sampler2D uGrain;
uniform vec4  uCover;     // viewport uv -> frame fraction
uniform float uTime;
uniform float uAspect;
uniform float uGlow;      // the red world's exposure
uniform float uWord;      // the bright content's arrival + sharpness
uniform vec2  uPar;
out vec4 frag;

vec3 plateAt(vec2 p){ return texture(uPlate, clamp(p, 0.001, 0.999)).rgb; }

void main(){
  vec2 uv = vUV + vec2(-uPar.x * 0.006, -uPar.y * 0.004);
  vec2 p = uv * uCover.xy + uCover.zw;

  // blur -> sharp as the title card arrives
  float rad = (1.0 - uWord) * 0.012;
  vec3 base = plateAt(p);
  if(rad > 0.0005){
    vec3 acc = base;
    acc += plateAt(p + vec2(rad, 0.0));
    acc += plateAt(p - vec2(rad, 0.0));
    acc += plateAt(p + vec2(0.0, rad * uAspect));
    acc += plateAt(p - vec2(0.0, rad * uAspect));
    base = acc * 0.2;
  }

  // staging: dim ember world first, bright content gated by its own
  // luminance so the wordmark surfaces through the fog
  float lum = dot(base, vec3(0.299, 0.587, 0.114));
  float bright = smoothstep(0.30, 0.58, lum);
  float gate = uGlow * (1.0 - bright) + uWord * bright;
  float breathe = 1.0 + 0.035 * sin(uTime * 0.5) * uGlow;
  vec3 col = base * (0.03 + 0.97 * gate) * breathe;

  // a whisper of live fog, red, only where the plate already glows
  float g1 = texture(uGrain, p * vec2(0.55, 0.48)
                     + vec2(uTime * 0.008, -uTime * 0.013)).r;
  float g2 = texture(uGrain, p * vec2(1.2, 1.0)
                     + vec2(-uTime * 0.005, -uTime * 0.020)).r;
  float billow = smoothstep(0.25, 0.95, g1 * 0.6 + g2 * 0.4);
  float glowMass = smoothstep(0.05, 0.35, lum) * (1.0 - bright);
  col += vec3(0.42, 0.05, 0.03) * billow * glowMass * 0.16 * uGlow;

  // film grain
  float g = texture(uGrain, p * 3.6 + vec2(uTime * 0.09, 0.0)).r;
  col += (g - 0.5) * 0.016 * uGlow;

  frag = vec4(col, 1.0);
}`,Ie=`#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uMan;
uniform vec4  uRect;      // his quad in viewport fractions
uniform float uOp;
out vec4 frag;

void main(){
  vec2 l = (vUV - uRect.xy) / uRect.zw;
  if(l.x < 0.0 || l.x > 1.0 || l.y < 0.0 || l.y > 1.0) discard;
  vec4 s = texture(uMan, l);
  if(s.a < 0.004) discard;
  frag = vec4(s.rgb * s.a * uOp, s.a * uOp);
}`,Le=`#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uGrain;
uniform float uTime;
uniform float uAspect;
uniform float uOp;
uniform vec2  uPar;
out vec4 frag;

void main(){
  vec2 p = vUV + vec2(uPar.x * 0.010, uPar.y * 0.006);
  float g1 = texture(uGrain, p * vec2(0.7, 0.55) + vec2(uTime * 0.005, -uTime * 0.018)).r;
  float g2 = texture(uGrain, p * vec2(1.6, 1.25) + vec2(-uTime * 0.008, -uTime * 0.027)).r;
  float smoke = smoothstep(0.45, 0.95, g1 * 0.6 + g2 * 0.4);
  float band = smoothstep(0.10, 0.55, vUV.y);
  vec3 col = vec3(0.55, 0.10, 0.06) * smoke * band * 0.10 * uOp;
  frag = vec4(col, 0.0);
}`,W=[1600,900],Re=class{constructor(e,t,a,o){this.back={canvas:e,gl:t},this.front={canvas:a,gl:o},this.pB={plate:n(t,U,Fe,`plate6`)},this.pF={man:n(o,U,Ie,`man6`),smoke:n(o,U,Le,`smoke6`)},this.quadB=r(t),this.quadF=r(o),this.texB={plate:i(t),grain:i(t,{wrap:`repeat`})},this.texF={man:i(o),grain:i(o,{wrap:`repeat`})},this.par={x:0,y:0},this.manBox=[580,170,450,730]}async load(){let[e,t,n]=await Promise.all([s(`fin/plate.jpg`),s(`fin/man.png`),s(`tex/grain.png`)]);a(this.back.gl,this.texB.plate,e),a(this.back.gl,this.texB.grain,n),a(this.front.gl,this.texF.man,t),a(this.front.gl,this.texF.grain,n)}resize(e,t,n){for(let r of[this.back,this.front]){let i=Math.round(e*n),a=Math.round(t*n);(r.canvas.width!==i||r.canvas.height!==a)&&(r.canvas.width=i,r.canvas.height=a),r.gl.viewport(0,0,i,a)}this.cssW=e,this.cssH=t;let r=Math.max(e/W[0],t/W[1]);this.fit={s:r,ox:(e-W[0]*r)/2,oy:(t-W[1]*r)/2}}render(e,t){let n=this.cssW/this.cssH,r=this.fit,i=this.cssW/(W[0]*r.s),a=this.cssH/(W[1]*r.s),s=-r.ox/(W[0]*r.s),c=-r.oy/(W[1]*r.s);{let r=this.back.gl;r.disable(r.DEPTH_TEST),r.disable(r.BLEND),r.clearColor(0,0,0,1),r.clear(r.COLOR_BUFFER_BIT),r.bindVertexArray(this.quadB);let l=this.pB.plate;r.useProgram(l.p),r.uniform1i(l.u.uPlate,o(r,this.texB.plate,0)),r.uniform1i(l.u.uGrain,o(r,this.texB.grain,1)),r.uniform4f(l.u.uCover,i,a,s,c),r.uniform1f(l.u.uTime,e),r.uniform1f(l.u.uAspect,n),r.uniform1f(l.u.uGlow,t.glow),r.uniform1f(l.u.uWord,t.word),r.uniform2f(l.u.uPar,this.par.x,this.par.y),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindVertexArray(null)}{let r=this.front.gl;r.disable(r.DEPTH_TEST),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.bindVertexArray(this.quadF),r.blendFunc(r.ONE,r.ONE);{let i=this.pF.smoke;r.useProgram(i.p),r.uniform1i(i.u.uGrain,o(r,this.texF.grain,0)),r.uniform1f(i.u.uTime,e),r.uniform1f(i.u.uAspect,n),r.uniform1f(i.u.uOp,t.fog),r.uniform2f(i.u.uPar,this.par.x,this.par.y),r.drawArrays(r.TRIANGLE_STRIP,0,4)}r.bindVertexArray(null)}}},G={glow:[.25,1.8],fog:[.8,2.35],word:[1.35,2.75],man:[2.1,3.15],caps:[2.8,3.95],bar:[3.6,4.55],live:4.2},ze=G,Be=e=>Math.min(1,Math.max(0,e)),K=([e,t],n)=>Be((n-e)/(t-e)),q=e=>e*e*(3-2*e);function Ve(e){return{glow:q(K(G.glow,e)),fog:q(K(G.fog,e)),word:K(G.word,e),man:q(K(G.man,e)),caps:K(G.caps,e),bar:K(G.bar,e),live:e>=G.live}}var J=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n*r));async function He(){let t=document.getElementById(`fin`),n=document.getElementById(`finBack`),r=document.getElementById(`finMan`);if(!t||!n||!r)return null;let i=e(n),a=i?e(r,{alpha:!0}):null;if(!i||!a)return t.classList.add(`is-fallback`,`is-set`),null;let o=new Re(n,i,r,a);try{o.manBox=(await fetch(`./fin/fin.json`).then(e=>e.json())).man}catch{}await o.load();let s=matchMedia(`(prefers-reduced-motion: reduce)`).matches;[...t.querySelectorAll(`.f-cap`)].forEach((e,t)=>e.style.setProperty(`--li`,String(t)));let c=document.getElementById(`finStage1`),l=document.getElementById(`finDim`),u=document.getElementById(`finFrame2`),d=document.getElementById(`finFrame2Img`),f=!1;if(u&&d){let e=[`./fin/plate.jpg`,`./fin/frame2.jpg`,`footer%202nd%20image.jpg`];(function t(n){if(n>=e.length)return;let r=new Image;r.onload=()=>{d.src=e[n],u.hidden=!1,f=!0},r.onerror=()=>t(n+1),r.src=e[n]})(0)}let p=e=>e*e*e*(e*(e*6-15)+10),m=0,h;function g(){o.resize(window.innerWidth,window.innerHeight,Math.min(window.devicePixelRatio||1,2)),t.classList.toggle(`is-portrait`,window.innerWidth/window.innerHeight<.75)}g(),window.addEventListener(`resize`,()=>{clearTimeout(h),h=setTimeout(g,140)});let _={tx:0,ty:0,x:0,y:0,inside:!1};t.addEventListener(`pointermove`,e=>{let n=t.getBoundingClientRect();_.tx=(e.clientX-n.left)/n.width*2-1,_.ty=(e.clientY-n.top)/n.height*2-1,_.inside=!0},{passive:!0}),t.addEventListener(`pointerleave`,()=>{_.inside=!1});let v={started:0,running:!1,visible:!1,raf:0,last:0},y=e=>{if(!v.running)return;let n=Math.min(.05,(e-v.last)/1e3||.016);v.last=e;let r=s?ze.live+2:(e-v.started)/1e3,i=Ve(r);if(_.x=J(_.x,_.inside?_.tx:0,2.6,n),_.y=J(_.y,_.inside?_.ty:0,2.6,n),o.par.x=_.x,o.par.y=_.y,o.render(r,i),f){let e=t.getBoundingClientRect(),r=t.offsetHeight-window.innerHeight,i=r>4?Math.min(1,Math.max(0,-e.top/r)):0;m=s?i:J(m,i,6,n);let a=p(Math.min(1,Math.max(0,(m-.08)/.78)));u.style.transform=`translate3d(${((a-1)*103).toFixed(3)}%, 0, 0)`,!s&&a>.001&&a<.995?u.style.filter=`blur(${((1-a)*6).toFixed(2)}px) brightness(${(.72+.28*a).toFixed(3)})`:u.style.filter&&(u.style.filter=``),c&&(c.style.transform=`translate3d(${(a*4.5).toFixed(3)}%, 0, 0)`),l&&(l.style.opacity=(a*.5).toFixed(3))}i.caps>0&&t.classList.add(`is-caps`),i.bar>0&&t.classList.add(`is-bar`),v.raf=requestAnimationFrame(y)},b=()=>{v.running||(v.running=!0,v.last=performance.now(),v.started||=performance.now(),v.raf=requestAnimationFrame(y))},x=()=>{v.running=!1,cancelAnimationFrame(v.raf)};return new IntersectionObserver(e=>{for(let t of e)v.visible=t.isIntersecting,t.isIntersecting?b():x()},{threshold:.3}).observe(t),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?x():v.visible&&b()}),window.__shot6=async(e=`finale`,t=null)=>{let i=t===null?(performance.now()-v.started)/1e3:t;o.render(i,Ve(i));let a=document.createElement(`canvas`);a.width=n.width,a.height=n.height;let s=a.getContext(`2d`);s.drawImage(n,0,0),s.drawImage(r,0,0);let c=a.toDataURL(`image/png`);return await fetch(`/__shot?name=${encodeURIComponent(e)}`,{method:`POST`,body:c}),`${a.width}x${a.height} @ t=${i.toFixed(2)}`},window.__finale={fin:o,state:v,section:t},{fin:o,section:t}}`scrollRestoration`in history&&(history.scrollRestoration=`manual`);var Y=`./media/`,Ue=620,X=document.documentElement,We=document.getElementById(`boot`),Ge=document.getElementById(`bootFill`),Ke=document.getElementById(`bootEnter`),qe=matchMedia(`(prefers-reduced-motion: reduce)`).matches,Z={stage:null,furniture:null,clips:{},layout:null,word:null,order:[],t0:0,fired:new Set,pointer:{x:0,y:0,tx:0,ty:0},running:!1};async function Je(){if(Z.stage=new u(document.getElementById(`stage`)),Z.furniture=new x(document),!Z.stage.ok)return et(`WebGL unavailable`);let e;try{e=await fetch(`${Y}manifest.json`).then(e=>e.json())}catch{return et(`media manifest missing`)}let t=0,n=()=>{Ge.style.width=`${++t/4*100}%`},r=performance.now();await Promise.all([_().then(n),Z.stage.loadTextures({grunge:`./tex/grunge.png`,grain:`./tex/grain.png`}).then(n)]);let i=(t,n)=>{let r=e.clips[t];return new d({src:[{url:Y+r.webm,type:`video/webm`},{url:Y+r.mp4,type:`video/mp4`}],poster:Y+r.poster,w:r.w,h:r.h,track:r.track,loopFade:n})};Z.clips.hero=i(`hero`,.7),Q(),window.addEventListener(`resize`,rt(Q,140)),window.addEventListener(`orientationchange`,()=>setTimeout(Q,220)),await Z.clips.hero.whenReady(),n();let a=performance.now()-r;a<Ue&&await nt(Ue-a);let o=await Z.clips.hero.play();if(ie().then(e=>{Z.universe=e}).catch(e=>console.warn(`[gireesh] universe unavailable:`,e.message)),ye().then(e=>{Z.chrono=e}).catch(e=>console.warn(`[gireesh] chrono unavailable:`,e.message)),Pe().then(e=>{Z.gallery=e}).catch(e=>console.warn(`[gireesh] gallery unavailable:`,e.message)),He().then(e=>{Z.finale=e}).catch(e=>console.warn(`[gireesh] finale unavailable:`,e.message)),!o)return Xe();Ye()}function Ye(){We.classList.add(`is-done`),X.classList.remove(`is-booting`),Z.t0=performance.now(),Z.running=!0,Ze();let e=new URLSearchParams(location.search).get(`t`);if(e!==null){let t=e===`end`?A.settled:parseFloat(e);if(Number.isFinite(t)){Z.t0=performance.now()-t*1e3;for(let[e,n]of M)t>=e&&(Z.fired.add(n),X.classList.add(`is-${n}`))}}if(qe){Z.t0=performance.now()-A.settled*1e3;for(let[,e]of M)X.classList.add(`is-${e}`);let e=Z.clips.hero;e.el.addEventListener(`seeked`,()=>{e.pause(),tt(),window.addEventListener(`resize`,rt(tt,160))},{once:!0}),e.el.currentTime=Math.min(6,(e.duration||8)*.6)}else requestAnimationFrame($e)}function Xe(){Ke.hidden=!1,Ke.addEventListener(`click`,async()=>{await Z.clips.hero.play(),Ye()},{once:!0})}function Q(){let e=window.innerWidth,t=window.innerHeight,n=y(e,t);Z.layout=n,Z.stage.resize(n);let r=Math.round(n.word.capH*n.dpr);if(!Z.word||Math.abs(Z.word.capPx-r)>2){let e=g(r,Z.stage.maxTexture);e.capPx=r,Z.word=e,Z.stage.setWord(e),Z.order=te(e.letters)}Z.furniture.apply(n)}function Ze(){qe||matchMedia(`(pointer: coarse)`).matches||(window.addEventListener(`pointermove`,e=>{Z.pointer.tx=e.clientX/window.innerWidth*2-1,Z.pointer.ty=e.clientY/window.innerHeight*2-1},{passive:!0}),window.addEventListener(`pointerleave`,()=>{Z.pointer.tx=0,Z.pointer.ty=0}))}var Qe=0;function $e(e){if(!Z.running)return;let t=(e-Z.t0)/1e3,n=Math.min(.05,(e-Qe)/1e3||.016);Qe=e;for(let[e,n]of M)t>=e&&!Z.fired.has(n)&&(Z.fired.add(n),X.classList.add(`is-${n}`));let r=Z.pointer;r.x=k(r.x,r.tx,3.1,n),r.y=k(r.y,r.ty,3.1,n);let i=C((t-A.settled+.9)/1.2);Z.stage.parallax.x=r.x*i,Z.stage.parallax.y=r.y*i;let a=j(t,Z.word.letters.length,Z.order);if(a.settled){let e=Math.sin(t*.42)*.5+Math.sin(t*.27+1.3)*.5;for(let t of a.letters)t.dy=e*.0035}Z.stage.render(a,t,Z.clips),requestAnimationFrame($e)}function et(e){console.warn(`[yogendra] falling back:`,e),X.classList.remove(`is-booting`),X.classList.add(`is-fallback`),We.classList.add(`is-done`);for(let[,e]of M)X.classList.add(`is-${e}`);document.querySelector(`.stage-wrap`)?.insertAdjacentHTML(`afterbegin`,`<div class="fallback"><p>YOGENDRA</p><small>Senior AI & GTM Systems</small></div>`)}function tt(){Q();let e=j(A.settled+1,Z.word.letters.length,Z.order);Z.stage.render(e,A.settled+1,Z.clips)}var nt=e=>new Promise(t=>setTimeout(t,e));function rt(e,t){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}var it=document.getElementById(`burger`),$=document.getElementById(`menu`);$?.querySelectorAll(`a`).forEach((e,t)=>e.style.setProperty(`--i`,t));function at(e){it.setAttribute(`aria-expanded`,String(e)),X.classList.toggle(`is-menu`,e),e?$.hidden=!1:setTimeout(()=>{X.classList.contains(`is-menu`)||($.hidden=!0)},500)}it?.addEventListener(`click`,()=>at(it.getAttribute(`aria-expanded`)!==`true`)),$?.addEventListener(`click`,e=>{e.target.closest(`a`)&&at(!1)}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&X.classList.contains(`is-menu`)&&at(!1)});var ot=document.querySelector(`.stage-wrap`);if(ot&&`IntersectionObserver`in window){let e=document.querySelector(`.hero-spacer`);e&&new IntersectionObserver(([e])=>{let t=Z.clips.hero;t&&(Z.heroOnScreen=e.isIntersecting,e.isIntersecting?(t.play(),ot.style.visibility=``):(t.pause(),ot.style.visibility=`hidden`))},{threshold:0}).observe(e)}document.addEventListener(`visibilitychange`,()=>{let e=document.visibilityState===`hidden`;for(let t of Object.values(Z.clips))t&&(e?t.pause():Z.heroOnScreen!==!1&&t.play())}),window.__shot=async(e=`shot`,t=null)=>{if(!Z.word)return`not ready`;let n=t===null?(performance.now()-Z.t0)/1e3:t;Z.stage.render(j(n,Z.word.letters.length,Z.order),n,Z.clips);let r=Z.stage.canvas.toDataURL(`image/png`);return await fetch(`/__shot?name=${encodeURIComponent(e)}`,{method:`POST`,body:r}),`${Z.stage.canvas.width}x${Z.stage.canvas.height} @ t=${n.toFixed(2)}`},window.__tune=(e,t)=>(Z.stage[e]=t,Z.stage[e]),Je().catch(e=>et(e.message));