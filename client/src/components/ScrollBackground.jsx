/**
 * ScrollBackground — a persistent full-screen WebGL canvas that lives
 * behind everything. As the user scrolls, the scene morphs between
 * 5 distinct "moods", each representing a section of the page.
 *
 * Moods (by scroll progress 0→1):
 *  0.00 – Hero       : deep purple nebula, icosahedra floating, slow orbit
 *  0.20 – Narrative  : particles converge to a DNA-like helix
 *  0.40 – Products   : grid of glowing nodes, matrix rain feel
 *  0.60 – Services   : soft teal aurora, flowing sine waves
 *  0.80 – Social     : warm amber constellations, trust/warmth
 *  1.00 – Contact    : pure purple vortex, call-to-action energy
 *
 * All transitions are smooth lerps — no hard cuts.
 */

import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

// Progress in a local window [start, end] → 0..1
const localProgress = (global, start, end) =>
  smoothstep(start, end, global);

// ─────────────────────────────────────────────────────────────
// Colour palettes per mood  (r,g,b each 0-1)
// ─────────────────────────────────────────────────────────────
const MOODS = [
  { // 0 Hero – deep purple nebula
    primary:   [0.48, 0.41, 0.93],  // #7b68ee
    secondary: [0.11, 0.91, 0.71],  // #1de9b6
    bg:        [0.016, 0.016, 0.04],
    particleSize: 1.8,
    speed: 0.6,
  },
  { // 1 Narrative – midnight blue, converging
    primary:   [0.38, 0.31, 0.83],
    secondary: [0.22, 0.55, 0.90],
    bg:        [0.02, 0.02, 0.06],
    particleSize: 1.4,
    speed: 0.4,
  },
  { // 2 Products – neon grid, matrix green
    primary:   [0.11, 0.91, 0.71],  // teal
    secondary: [0.48, 0.41, 0.93],
    bg:        [0.012, 0.012, 0.03],
    particleSize: 1.2,
    speed: 1.1,
  },
  { // 3 Services – warm amber aurora
    primary:   [0.7, 0.44, 0.18],   // amber — dimmed for readability
    secondary: [0.65, 0.21, 0.30],  // red-pink — dimmed
    bg:        [0.024, 0.016, 0.01],
    particleSize: 1.6,
    speed: 0.5,
  },
  { // 4 Social / Testimonials – cool teal trust
    primary:   [0.11, 0.91, 0.71],
    secondary: [0.30, 0.65, 0.98],
    bg:        [0.01, 0.02, 0.05],
    particleSize: 2.0,
    speed: 0.35,
  },
  { // 5 Contact – vortex purple
    primary:   [0.42, 0.25, 0.70],
    secondary: [0.62, 0.38, 0.70],
    bg:        [0.02, 0.01, 0.06],
    particleSize: 1.5,
    speed: 1.4,
  },
];

// ─────────────────────────────────────────────────────────────
// Vertex shader
// ─────────────────────────────────────────────────────────────
const VERT = `
attribute vec2 a_pos;
attribute float a_phase;
attribute float a_seed;

uniform float u_time;
uniform float u_scroll;    // 0..1 global scroll
uniform vec2  u_res;
uniform float u_mood;      // float mood index (interpolated)
uniform float u_speed;

varying float v_alpha;
varying vec3  v_color;
varying float v_seed;

// --- colour lerp from two palettes ---
uniform vec3  u_primary;
uniform vec3  u_secondary;

// Pseudo-random
float rand(float n){ return fract(sin(n * 127.1) * 43758.5453); }

void main(){
  float t = u_time * u_speed;
  float aspect = u_res.x / u_res.y;

  // base position in normalised [-1,1]
  vec2 pos = a_pos;

  float mood = u_mood;
  float mf   = fract(mood);   // blend factor
  float mi   = floor(mood);   // integer mood

  // ── Mood 0: nebula drift ─────────────────────
  vec2 drift0;
  drift0.x = pos.x + sin(t * 0.3 + a_phase * 6.28) * 0.12;
  drift0.y = pos.y + cos(t * 0.25 + a_phase * 6.28) * 0.10;

  // ── Mood 1: helix ────────────────────────────
  float helixAngle = a_phase * 6.28 * 4.0 + t * 0.5;
  float helixY     = a_phase * 2.0 - 1.0;
  vec2 drift1;
  drift1.x = sin(helixAngle) * 0.35;
  drift1.y = helixY + sin(t * 0.2) * 0.05;

  // ── Mood 2: grid snap ────────────────────────
  float col2 = floor(a_seed * 18.0);
  float row2 = floor(rand(a_seed + 0.5) * 12.0);
  vec2 drift2;
  drift2.x = (col2 / 18.0) * 2.0 - 1.0 + sin(t + a_phase * 2.0) * 0.04;
  drift2.y = (row2 / 12.0) * 2.0 - 1.0 + cos(t * 0.8 + a_phase) * 0.04;

  // ── Mood 3: aurora waves ─────────────────────
  vec2 drift3;
  drift3.x = pos.x + sin(t * 0.4 + pos.y * 2.0 + a_phase * 3.0) * 0.15;
  drift3.y = pos.y + sin(t * 0.6 + a_phase * 6.28) * 0.08;

  // ── Mood 4: constellations ───────────────────
  vec2 drift4;
  drift4.x = pos.x + sin(t * 0.15 + a_phase * 6.28) * 0.06;
  drift4.y = pos.y + cos(t * 0.18 + a_phase * 6.28) * 0.06;

  // ── Mood 5: vortex ───────────────────────────
  float vAngle  = a_phase * 6.28 * 2.0 + t * 0.9;
  float vRadius = 0.1 + rand(a_seed + 7.0) * 0.85;
  vec2 drift5;
  drift5.x = sin(vAngle) * vRadius;
  drift5.y = cos(vAngle) * vRadius;

  // Select & blend between the two surrounding moods
  vec2 posA = mi == 0.0 ? drift0
            : mi == 1.0 ? drift1
            : mi == 2.0 ? drift2
            : mi == 3.0 ? drift3
            : mi == 4.0 ? drift4
            : drift5;

  vec2 posB = mi == 0.0 ? drift1
            : mi == 1.0 ? drift2
            : mi == 2.0 ? drift3
            : mi == 3.0 ? drift4
            : mi == 4.0 ? drift5
            : drift5;

  vec2 finalPos = mix(posA, posB, mf);
  finalPos.x /= aspect;

  // Alpha fade at edges + twinkle
  float twinkle = 0.55 + 0.45 * sin(t * 2.5 + a_phase * 6.28);
  float edgeFade = 1.0 - smoothstep(0.6, 1.0, length(finalPos * vec2(aspect, 1.0)));
  v_alpha = twinkle * edgeFade * (0.4 + 0.6 * rand(a_seed));

  // Colour: blend primary→secondary by seed + mood
  float cMix = rand(a_seed + 1.3) * 0.5 + sin(t * 0.3 + a_phase * 3.14) * 0.25 + 0.25;
  v_color = mix(u_primary, u_secondary, clamp(cMix, 0.0, 1.0));
  v_seed  = a_seed;

  gl_Position  = vec4(finalPos, 0.0, 1.0);
  gl_PointSize = 1.5 + rand(a_seed + 2.0) * 2.5;
}`;

// ─────────────────────────────────────────────────────────────
// Fragment shader
// ─────────────────────────────────────────────────────────────
const FRAG = `
precision mediump float;
varying float v_alpha;
varying vec3  v_color;
varying float v_seed;

void main(){
  // Soft circle point
  vec2  uv   = gl_PointCoord - 0.5;
  float dist = length(uv);
  float circle = 1.0 - smoothstep(0.3, 0.5, dist);
  // Glow ring
  float glow = exp(-dist * 6.0) * 0.3;
  float alpha = (circle + glow) * v_alpha;
  gl_FragColor = vec4(v_color, alpha);
}`;

// ─────────────────────────────────────────────────────────────
// Aurora (fullscreen quad) shaders — drawn behind particles
// ─────────────────────────────────────────────────────────────
const AURORA_VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const AURORA_FRAG = `
precision mediump float;
uniform float u_time;
uniform float u_mood;
uniform vec3  u_primary;
uniform vec3  u_secondary;
uniform vec3  u_bg;
uniform vec2  u_res;

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float t  = u_time * 0.25;

  // Multi-layer noise aurora
  float n1 = sin(uv.x * 2.8 + t + uv.y * 1.4) * 0.5 + 0.5;
  float n2 = sin(uv.x * 5.2 - t * 1.3 + uv.y * 2.6) * 0.5 + 0.5;
  float n3 = sin(uv.y * 3.5 + t * 0.7 + uv.x * 1.8) * 0.5 + 0.5;
  float aurora = n1 * n2 * n3;

  // Keep aurora to upper/mid band
  float band = smoothstep(0.0, 0.4, uv.y) * (1.0 - smoothstep(0.85, 1.0, uv.y));
  aurora *= band * 0.10;

  vec3 col = u_bg + u_primary * aurora + u_secondary * (aurora * 0.4);

  // Vignette
  float vx = uv.x - 0.5;
  float vy = uv.y - 0.5;
  float vig = 1.0 - (vx*vx + vy*vy) * 1.4;
  col *= clamp(vig, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}`;

// ─────────────────────────────────────────────────────────────
// WebGL helpers
// ─────────────────────────────────────────────────────────────
function makeShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}
function makeProgram(gl, vert, frag) {
  const p = gl.createProgram();
  gl.attachShader(p, makeShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, makeShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  return p;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
const N = 1800; // particle count

export default function ScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── GL context ──────────────────────────────────────────
    const gl = canvas.getContext('webgl', {
      alpha: false, premultipliedAlpha: false,
      antialias: false, depth: false,
    });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // additive — glowing stars

    // ── Aurora program ──────────────────────────────────────
    const auroraP = makeProgram(gl, AURORA_VERT, AURORA_FRAG);
    const aQuadBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aQuadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1, 1,-1, -1,1,  1,-1, 1,1, -1,1,
    ]), gl.STATIC_DRAW);

    // ── Particle program ────────────────────────────────────
    const partP = makeProgram(gl, VERT, FRAG);

    // Generate particles
    const pos   = new Float32Array(N * 2);
    const phase = new Float32Array(N);
    const seed  = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i*2]   = (Math.random() - 0.5) * 2;
      pos[i*2+1] = (Math.random() - 0.5) * 2;
      phase[i]   = Math.random();
      seed[i]    = Math.random();
    }

    const posBuf   = gl.createBuffer();
    const phaseBuf = gl.createBuffer();
    const seedBuf  = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuf);
    gl.bufferData(gl.ARRAY_BUFFER, phase, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf);
    gl.bufferData(gl.ARRAY_BUFFER, seed, gl.STATIC_DRAW);

    // ── Resize ───────────────────────────────────────────────
    let W = 0, H = 0;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      gl.viewport(0, 0, W, H);
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Scroll state ─────────────────────────────────────────
    let scrollProgress = 0;
    let targetProgress = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Animation loop ───────────────────────────────────────
    let rafId;
    let t0 = performance.now();

    const draw = (now) => {
      rafId = requestAnimationFrame(draw);
      const t = (now - t0) / 1000;

      // Smooth scroll
      scrollProgress += (targetProgress - scrollProgress) * 0.04;
      const sp = clamp(scrollProgress, 0, 1);

      // Mood (0..5) as float
      const moodF = sp * 5;

      // Interpolate mood colours
      const loI = Math.min(Math.floor(moodF), 4);
      const hiI = Math.min(loI + 1, 5);
      const mf  = moodF - loI;
      const mLo = MOODS[loI];
      const mHi = MOODS[hiI];

      const primary   = mLo.primary.map((v, i) => lerp(v, mHi.primary[i],   mf));
      const secondary = mLo.secondary.map((v, i) => lerp(v, mHi.secondary[i], mf));
      const bg        = mLo.bg.map((v, i) => lerp(v, mHi.bg[i], mf));
      const speed     = lerp(mLo.speed, mHi.speed, mf);

      // ── Draw aurora ────────────────────────────────────────
      gl.blendFunc(gl.ONE, gl.ZERO); // opaque bg
      gl.useProgram(auroraP);

      const aPos = gl.getAttribLocation(auroraP, 'a_pos');
      gl.bindBuffer(gl.ARRAY_BUFFER, aQuadBuf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const setU = (p, name, ...args) => {
        const loc = gl.getUniformLocation(p, name);
        if (args.length === 1) gl.uniform1f(loc, args[0]);
        else if (args.length === 2) gl.uniform2f(loc, ...args);
        else if (args.length === 3) gl.uniform3f(loc, ...args);
      };

      setU(auroraP, 'u_time',      t);
      setU(auroraP, 'u_mood',      moodF);
      setU(auroraP, 'u_primary',   ...primary);
      setU(auroraP, 'u_secondary', ...secondary);
      setU(auroraP, 'u_bg',        ...bg);
      setU(auroraP, 'u_res',       W, H);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // ── Draw particles ─────────────────────────────────────
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.useProgram(partP);

      const bind = (buf, name, size) => {
        const loc = gl.getAttribLocation(partP, name);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      };
      bind(posBuf,   'a_pos',   2);
      bind(phaseBuf, 'a_phase', 1);
      bind(seedBuf,  'a_seed',  1);

      setU(partP, 'u_time',      t);
      setU(partP, 'u_scroll',    sp);
      setU(partP, 'u_mood',      moodF);
      setU(partP, 'u_speed',     speed);
      setU(partP, 'u_primary',   ...primary);
      setU(partP, 'u_secondary', ...secondary);
      setU(partP, 'u_res',       W, H);
      gl.drawArrays(gl.POINTS, 0, N);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
