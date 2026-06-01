/**
 * ScrollBackground — WebGL canvas fixed behind the entire page.
 *
 * Each section has a DISTINCT visual identity:
 *
 *  0 Hero        — floating icosahedra + purple nebula particles
 *  1 Narrative   — particles form a DNA double helix
 *  2 Products    — neon grid nodes, matrix pulse
 *  3 Spotlights  — orbiting rings / planetary system
 *  4 Store       — scattered hex grid
 *  5 Services    — flowing sine wave ribbons
 *  6 Testimonials— slow constellation map
 *  7 Process     — clockwise vortex spiral
 *  8 Contact     — converging radial burst
 *
 * All transitions are smooth lerps — no hard cuts.
 */

import { useEffect, useRef } from 'react';

// ─── helpers ─────────────────────────────────────────────────────────────────
const lerp  = (a, b, t) => a + (b - a) * t;
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const sm    = (e0, e1, x) => { const t = clamp((x-e0)/(e1-e0),0,1); return t*t*(3-2*t); };
const rand  = s => { let x=Math.sin(s*127.1+1)*43758.5453; return x-Math.floor(x); };

// ─── colour palettes ──────────────────────────────────────────────────────────
// Each entry: primary, secondary, bg  (r,g,b 0-1)
const PALETTES = [
  { p:[0.48,0.41,0.93], s:[0.11,0.91,0.71], bg:[0.016,0.016,0.04]  }, // 0 hero   purple+teal
  { p:[0.35,0.28,0.82], s:[0.22,0.55,0.95], bg:[0.018,0.018,0.055] }, // 1 narrative blue
  { p:[0.10,0.85,0.65], s:[0.48,0.41,0.93], bg:[0.012,0.012,0.03]  }, // 2 products teal+purple
  { p:[0.55,0.35,1.00], s:[0.11,0.91,0.71], bg:[0.022,0.014,0.055] }, // 3 spotlights violet
  { p:[0.48,0.41,0.93], s:[0.28,0.60,1.00], bg:[0.014,0.014,0.04]  }, // 4 store    blue-purple
  { p:[0.65,0.38,1.00], s:[0.95,0.55,0.15], bg:[0.022,0.016,0.05]  }, // 5 services purple+amber
  { p:[0.10,0.85,0.65], s:[0.28,0.60,1.00], bg:[0.010,0.018,0.048] }, // 6 reviews  teal+blue
  { p:[0.48,0.41,0.93], s:[0.65,0.38,1.00], bg:[0.018,0.014,0.05]  }, // 7 process  purple
  { p:[0.55,0.28,0.90], s:[0.95,0.65,1.00], bg:[0.024,0.012,0.06]  }, // 8 contact  vivid purple
];

// ─── VERTEX SHADER ───────────────────────────────────────────────────────────
const VERT = `
precision mediump float;
attribute vec2  a_pos;
attribute float a_phase;
attribute float a_seed;

uniform float u_time;
uniform float u_mood;   // 0.0 – 8.0 float
uniform vec2  u_res;
uniform float u_speed;
uniform vec3  u_primary;
uniform vec3  u_secondary;

varying float v_alpha;
varying vec3  v_col;

float rnd(float n){ return fract(sin(n*127.1)*43758.5453); }

// ── shape functions ──────────────────────────────────────────────────────────

// 0: nebula drift
vec2 shape0(vec2 p, float t, float ph, float sd){
  return p + vec2(sin(t*0.35+ph*6.28)*0.14, cos(t*0.28+ph*6.28)*0.11);
}

// 1: DNA double helix
vec2 shape1(vec2 p, float t, float ph, float sd){
  float side  = step(0.5, rnd(sd+0.1)) * 2.0 - 1.0; // +1 or -1
  float angle = ph * 6.28 * 4.0 + t * 0.55;
  return vec2(sin(angle) * 0.30 * side, ph * 2.0 - 1.0 + sin(t*0.18)*0.04);
}

// 2: matrix grid nodes
vec2 shape2(vec2 p, float t, float ph, float sd){
  float col = floor(rnd(sd)    * 20.0);
  float row = floor(rnd(sd+.5) * 14.0);
  float gx  = col/20.0*2.0-1.0 + sin(t+ph*2.0)*0.03;
  float gy  = row/14.0*2.0-1.0 + cos(t*0.8+ph)*0.03;
  return vec2(gx, gy);
}

// 3: planetary rings — particles orbit at different radii
vec2 shape3(vec2 p, float t, float ph, float sd){
  float ring  = floor(rnd(sd+.2)*5.0) + 1.0;   // ring 1-5
  float r     = ring * 0.17;
  float speed = 0.4 / ring;
  float angle = ph * 6.28 + t * speed;
  return vec2(sin(angle)*r, cos(angle)*r*0.55); // slightly elliptical
}

// 4: hex grid
vec2 shape4(vec2 p, float t, float ph, float sd){
  float col = floor(rnd(sd)    * 12.0);
  float row = floor(rnd(sd+.3) * 8.0);
  float ox  = mod(row, 2.0) * 0.09; // hex offset
  float gx  = col/12.0*2.0-1.0 + ox + sin(t*0.4+ph)*0.025;
  float gy  = row/8.0 *2.0-1.0 + cos(t*0.3+ph)*0.025;
  return vec2(gx, gy);
}

// 5: flowing sine ribbons
vec2 shape5(vec2 p, float t, float ph, float sd){
  float ribbon = floor(rnd(sd+.4)*6.0)/6.0*2.0-1.0;
  float x      = ph * 2.0 - 1.0;
  float y      = ribbon + sin(x*3.14*2.0 + t*0.8 + ph*6.28)*0.18;
  return vec2(x, y);
}

// 6: constellation — slow drift
vec2 shape6(vec2 p, float t, float ph, float sd){
  return p + vec2(sin(t*0.12+ph*6.28)*0.05, cos(t*0.14+ph*6.28)*0.05);
}

// 7: clockwise vortex
vec2 shape7(vec2 p, float t, float ph, float sd){
  float r     = 0.05 + rnd(sd+.6)*0.85;
  float angle = ph*6.28*2.0 + t*0.7 + r*2.0;
  return vec2(sin(angle)*r, cos(angle)*r);
}

// 8: radial burst — particles converge inward then burst outward
vec2 shape8(vec2 p, float t, float ph, float sd){
  float angle = ph * 6.28 * 3.0;
  float r     = 0.1 + rnd(sd+.8)*0.8;
  float pulse = 0.5 + 0.5*sin(t*0.9 + ph*6.28);
  return vec2(sin(angle)*r*pulse, cos(angle)*r*pulse);
}

// ── blend two shapes ─────────────────────────────────────────────────────────
vec2 getShape(float m, vec2 p, float t, float ph, float sd){
  if(m < 1.0) return shape0(p,t,ph,sd);
  if(m < 2.0) return shape1(p,t,ph,sd);
  if(m < 3.0) return shape2(p,t,ph,sd);
  if(m < 4.0) return shape3(p,t,ph,sd);
  if(m < 5.0) return shape4(p,t,ph,sd);
  if(m < 6.0) return shape5(p,t,ph,sd);
  if(m < 7.0) return shape6(p,t,ph,sd);
  if(m < 8.0) return shape7(p,t,ph,sd);
  return shape8(p,t,ph,sd);
}

void main(){
  float t      = u_time * u_speed;
  float aspect = u_res.x / u_res.y;
  float mf     = fract(u_mood);    // blend factor 0→1
  float mLo    = floor(u_mood);
  float mHi    = min(mLo + 1.0, 8.0);

  vec2 posA = getShape(mLo, a_pos, t, a_phase, a_seed);
  vec2 posB = getShape(mHi, a_pos, t, a_phase, a_seed);
  vec2 pos  = mix(posA, posB, mf);

  pos.x /= aspect;

  // Edge fade + twinkle
  float twinkle  = 0.5 + 0.5*sin(u_time*2.2 + a_phase*6.28);
  float edgeFade = 1.0 - smoothstep(0.55, 1.0, length(pos * vec2(aspect,1.0)));
  v_alpha = twinkle * edgeFade * (0.35 + 0.65*rnd(a_seed));

  // Colour: mix primary→secondary by seed
  float cm = rnd(a_seed+1.3)*0.6 + sin(u_time*0.4+a_phase*3.14)*0.2 + 0.2;
  v_col = mix(u_primary, u_secondary, clamp(cm,0.0,1.0));

  gl_Position  = vec4(pos, 0.0, 1.0);
  gl_PointSize = 1.4 + rnd(a_seed+2.0) * 2.8;
}`;

// ─── FRAGMENT SHADER ─────────────────────────────────────────────────────────
const FRAG = `
precision mediump float;
varying float v_alpha;
varying vec3  v_col;
void main(){
  vec2  uv   = gl_PointCoord - 0.5;
  float dist = length(uv);
  float soft = 1.0 - smoothstep(0.28, 0.5, dist);
  float glow = exp(-dist * 5.5) * 0.45;
  gl_FragColor = vec4(v_col, (soft + glow) * v_alpha);
}`;

// ─── AURORA background quad ───────────────────────────────────────────────────
const A_VERT = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.0,1.0); }`;
const A_FRAG = `
precision mediump float;
uniform float u_time;
uniform float u_mood;
uniform vec3  u_primary;
uniform vec3  u_secondary;
uniform vec3  u_bg;
uniform vec2  u_res;

void main(){
  vec2  uv  = gl_FragCoord.xy / u_res;
  float t   = u_time * 0.22;

  // Aurora layers — each mood gets a different wave pattern
  float m   = u_mood;
  float n1  = sin(uv.x*(2.5+m*0.3) + t + uv.y*1.3) * 0.5 + 0.5;
  float n2  = sin(uv.x*(4.8-m*0.2) - t*1.2 + uv.y*2.4) * 0.5 + 0.5;
  float n3  = sin(uv.y*(3.2+m*0.15) + t*0.65 + uv.x*1.6) * 0.5 + 0.5;
  float aur = n1 * n2 * n3;

  // Band varies by mood: hero = top band, contact = full screen
  float bandLo = 0.0;
  float bandHi = 0.4 + m * 0.05;
  float band   = smoothstep(bandLo, bandLo+0.3, uv.y)
               * (1.0 - smoothstep(bandHi, bandHi+0.15, uv.y));
  aur *= band * 0.12;

  // Bottom accent glow
  float bottom = (1.0 - smoothstep(0.0, 0.35, uv.y)) * 0.06;

  vec3 col = u_bg
           + u_primary   * (aur + bottom)
           + u_secondary * (aur * 0.35);

  // Vignette
  vec2  v   = uv - 0.5;
  float vig = 1.0 - dot(v,v)*1.6;
  col *= clamp(vig, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}`;

// ─── GL helpers ───────────────────────────────────────────────────────────────
const mkShader = (gl, type, src) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.warn('Shader error:', gl.getShaderInfoLog(s));
  return s;
};
const mkProg = (gl, vs, fs) => {
  const p = gl.createProgram();
  gl.attachShader(p, mkShader(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, mkShader(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  return p;
};
const u1f = (gl, p, n, v) => gl.uniform1f(gl.getUniformLocation(p,n), v);
const u2f = (gl, p, n, a, b) => gl.uniform2f(gl.getUniformLocation(p,n), a, b);
const u3f = (gl, p, n, a, b, c) => gl.uniform3f(gl.getUniformLocation(p,n), a, b, c);
const bindBuf = (gl, prog, buf, name, size) => {
  const loc = gl.getAttribLocation(prog, name);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
};

// ─── Component ────────────────────────────────────────────────────────────────
const N = 1600;

export default function ScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha:false, antialias:false, depth:false });
    if (!gl) return;

    gl.enable(gl.BLEND);

    // Programs
    const aurP  = mkProg(gl, A_VERT, A_FRAG);
    const partP = mkProg(gl, VERT, FRAG);

    // Quad
    const quadBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]), gl.STATIC_DRAW);

    // Particles
    const posArr   = new Float32Array(N*2);
    const phaseArr = new Float32Array(N);
    const seedArr  = new Float32Array(N);
    for (let i=0; i<N; i++) {
      posArr[i*2]   = (Math.random()-0.5)*2;
      posArr[i*2+1] = (Math.random()-0.5)*2;
      phaseArr[i]   = Math.random();
      seedArr[i]    = Math.random();
    }
    const mkBuf = data => {
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return b;
    };
    const posBuf   = mkBuf(posArr);
    const phaseBuf = mkBuf(phaseArr);
    const seedBuf  = mkBuf(seedArr);

    // Resize
    let W=0, H=0;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width=W; canvas.height=H;
      gl.viewport(0,0,W,H);
    };
    resize();
    window.addEventListener('resize', resize);

    // Scroll → mood (0..8)
    let targetMood = 0, currentMood = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      targetMood = clamp(progress, 0, 1) * 8;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Animate
    let raf, t0 = performance.now();
    const draw = now => {
      raf = requestAnimationFrame(draw);
      const t = (now - t0) / 1000;

      // Smooth mood transition — speed up when far, slow down when close
      const diff = targetMood - currentMood;
      currentMood += diff * 0.05;

      const mi  = clamp(currentMood, 0, 8);
      const lo  = Math.min(Math.floor(mi), 7);
      const hi  = Math.min(lo+1, 8);
      const mf  = mi - lo;

      const pLo = PALETTES[lo], pHi = PALETTES[hi];
      const pri = pLo.p.map((v,i)=>lerp(v,pHi.p[i],mf));
      const sec = pLo.s.map((v,i)=>lerp(v,pHi.s[i],mf));
      const bg  = pLo.bg.map((v,i)=>lerp(v,pHi.bg[i],mf));

      // Speed varies by mood
      const speeds = [0.55, 0.42, 1.05, 0.70, 0.65, 0.80, 0.32, 0.90, 1.10];
      const spLo = speeds[lo], spHi = speeds[hi];
      const speed = lerp(spLo, spHi, mf);

      // ── Aurora pass ─────────────────────────────────────────────
      gl.blendFunc(gl.ONE, gl.ZERO);
      gl.useProgram(aurP);
      bindBuf(gl, aurP, quadBuf, 'a_pos', 2);
      u1f(gl, aurP, 'u_time',  t);
      u1f(gl, aurP, 'u_mood',  mi);
      u3f(gl, aurP, 'u_primary',   ...pri);
      u3f(gl, aurP, 'u_secondary', ...sec);
      u3f(gl, aurP, 'u_bg',        ...bg);
      u2f(gl, aurP, 'u_res', W, H);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // ── Particle pass ────────────────────────────────────────────
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.useProgram(partP);
      bindBuf(gl, partP, posBuf,   'a_pos',   2);
      bindBuf(gl, partP, phaseBuf, 'a_phase', 1);
      bindBuf(gl, partP, seedBuf,  'a_seed',  1);
      u1f(gl, partP, 'u_time',  t);
      u1f(gl, partP, 'u_mood',  mi);
      u1f(gl, partP, 'u_speed', speed);
      u3f(gl, partP, 'u_primary',   ...pri);
      u3f(gl, partP, 'u_secondary', ...sec);
      u2f(gl, partP, 'u_res', W, H);
      gl.drawArrays(gl.POINTS, 0, N);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:'fixed', inset:0,
      width:'100vw', height:'100vh',
      zIndex:0, pointerEvents:'none', display:'block',
    }} />
  );
}
