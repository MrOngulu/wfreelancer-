/**
 * ScrollBackground — fixed WebGL canvas at z:0.
 * Fully opaque panels (z:1+) sit on top and cover it completely.
 * Only the Hero panel is slightly transparent so this shows through.
 *
 * Each of the 9 sections morphs the background into a distinct shape:
 *  0 Hero        — floating nebula / free drift
 *  1 Narrative   — DNA double helix
 *  2 Products    — matrix grid nodes
 *  3 Spotlights  — planetary ring orbits
 *  4 Store       — hex grid
 *  5 Services    — sine wave ribbons
 *  6 Testimonials— constellation drift
 *  7 Process     — clockwise vortex
 *  8 Contact     — radial burst
 */

import { useEffect, useRef } from 'react';

const lerp  = (a,b,t) => a+(b-a)*t;
const clamp = (x,lo,hi) => Math.max(lo,Math.min(hi,x));

const PALETTES = [
  { p:[0.48,0.41,0.93], s:[0.11,0.91,0.71], bg:[0.018,0.016,0.045] },
  { p:[0.35,0.28,0.82], s:[0.22,0.55,0.95], bg:[0.020,0.018,0.055] },
  { p:[0.10,0.85,0.65], s:[0.48,0.41,0.93], bg:[0.014,0.014,0.036] },
  { p:[0.55,0.35,1.00], s:[0.11,0.91,0.71], bg:[0.024,0.016,0.058] },
  { p:[0.48,0.41,0.93], s:[0.28,0.60,1.00], bg:[0.016,0.016,0.044] },
  { p:[0.60,0.35,0.95], s:[0.90,0.50,0.15], bg:[0.024,0.018,0.052] },
  { p:[0.10,0.85,0.65], s:[0.28,0.60,1.00], bg:[0.012,0.020,0.050] },
  { p:[0.48,0.41,0.93], s:[0.60,0.35,0.95], bg:[0.020,0.016,0.052] },
  { p:[0.52,0.26,0.88], s:[0.90,0.60,1.00], bg:[0.026,0.014,0.062] },
];

const VERT = `
precision mediump float;
attribute vec2  a_pos;
attribute float a_phase;
attribute float a_seed;
uniform float u_time;
uniform float u_mood;
uniform vec2  u_res;
uniform float u_speed;
uniform vec3  u_primary;
uniform vec3  u_secondary;
varying float v_alpha;
varying vec3  v_col;

float rnd(float n){ return fract(sin(n*127.1)*43758.5453); }

vec2 shape0(vec2 p,float t,float ph,float sd){
  return p+vec2(sin(t*.35+ph*6.28)*.15,cos(t*.28+ph*6.28)*.12);
}
vec2 shape1(vec2 p,float t,float ph,float sd){
  float side=step(0.5,rnd(sd+.1))*2.-1.;
  float a=ph*6.28*4.+t*.55;
  return vec2(sin(a)*.32*side,ph*2.-1.+sin(t*.18)*.04);
}
vec2 shape2(vec2 p,float t,float ph,float sd){
  float c=floor(rnd(sd)*20.),r=floor(rnd(sd+.5)*14.);
  return vec2(c/20.*2.-1.+sin(t+ph*2.)*.03,r/14.*2.-1.+cos(t*.8+ph)*.03);
}
vec2 shape3(vec2 p,float t,float ph,float sd){
  float ring=floor(rnd(sd+.2)*5.)+1.;
  float r=ring*.17,spd=.4/ring;
  float a=ph*6.28+t*spd;
  return vec2(sin(a)*r,cos(a)*r*.55);
}
vec2 shape4(vec2 p,float t,float ph,float sd){
  float c=floor(rnd(sd)*12.),r=floor(rnd(sd+.3)*8.);
  float ox=mod(r,2.)*.09;
  return vec2(c/12.*2.-1.+ox+sin(t*.4+ph)*.025,r/8.*2.-1.+cos(t*.3+ph)*.025);
}
vec2 shape5(vec2 p,float t,float ph,float sd){
  float ribbon=floor(rnd(sd+.4)*6.)/6.*2.-1.;
  float x=ph*2.-1.;
  return vec2(x,ribbon+sin(x*6.28+t*.8+ph*6.28)*.18);
}
vec2 shape6(vec2 p,float t,float ph,float sd){
  return p+vec2(sin(t*.12+ph*6.28)*.05,cos(t*.14+ph*6.28)*.05);
}
vec2 shape7(vec2 p,float t,float ph,float sd){
  float r=.05+rnd(sd+.6)*.85;
  float a=ph*6.28*2.+t*.7+r*2.;
  return vec2(sin(a)*r,cos(a)*r);
}
vec2 shape8(vec2 p,float t,float ph,float sd){
  float a=ph*6.28*3.;
  float r=.1+rnd(sd+.8)*.8;
  float pulse=.5+.5*sin(t*.9+ph*6.28);
  return vec2(sin(a)*r*pulse,cos(a)*r*pulse);
}

vec2 getShape(float m,vec2 p,float t,float ph,float sd){
  if(m<1.)return shape0(p,t,ph,sd);
  if(m<2.)return shape1(p,t,ph,sd);
  if(m<3.)return shape2(p,t,ph,sd);
  if(m<4.)return shape3(p,t,ph,sd);
  if(m<5.)return shape4(p,t,ph,sd);
  if(m<6.)return shape5(p,t,ph,sd);
  if(m<7.)return shape6(p,t,ph,sd);
  if(m<8.)return shape7(p,t,ph,sd);
  return shape8(p,t,ph,sd);
}

void main(){
  float t=u_time*u_speed;
  float asp=u_res.x/u_res.y;
  float mf=fract(u_mood);
  float mLo=floor(u_mood);
  float mHi=min(mLo+1.,8.);

  vec2 posA=getShape(mLo,a_pos,t,a_phase,a_seed);
  vec2 posB=getShape(mHi,a_pos,t,a_phase,a_seed);
  vec2 pos=mix(posA,posB,mf);
  pos.x/=asp;

  float twinkle=.5+.5*sin(u_time*2.2+a_phase*6.28);
  float edge=1.-smoothstep(.55,1.,length(pos*vec2(asp,1.)));
  v_alpha=twinkle*edge*(.35+.65*rnd(a_seed));

  float cm=rnd(a_seed+1.3)*.6+sin(u_time*.4+a_phase*3.14)*.2+.2;
  v_col=mix(u_primary,u_secondary,clamp(cm,0.,1.));

  gl_Position=vec4(pos,0.,1.);
  gl_PointSize=1.4+rnd(a_seed+2.)*2.8;
}`;

const FRAG = `
precision mediump float;
varying float v_alpha;
varying vec3  v_col;
void main(){
  vec2 uv=gl_PointCoord-.5;
  float d=length(uv);
  float soft=1.-smoothstep(.28,.5,d);
  float glow=exp(-d*5.5)*.5;
  gl_FragColor=vec4(v_col,(soft+glow)*v_alpha);
}`;

const AV = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.,1.); }`;
const AF = `
precision mediump float;
uniform float u_time,u_mood;
uniform vec3  u_primary,u_secondary,u_bg;
uniform vec2  u_res;
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float t=u_time*.22;
  float m=u_mood;
  float n1=sin(uv.x*(2.5+m*.3)+t+uv.y*1.3)*.5+.5;
  float n2=sin(uv.x*(4.8-m*.2)-t*1.2+uv.y*2.4)*.5+.5;
  float n3=sin(uv.y*(3.2+m*.15)+t*.65+uv.x*1.6)*.5+.5;
  float aur=n1*n2*n3;
  float bhi=.4+m*.05;
  float band=smoothstep(0.,.3,uv.y)*(1.-smoothstep(bhi,bhi+.15,uv.y));
  aur*=band*.18;
  float bot=(1.-smoothstep(0.,.35,uv.y))*.06;
  vec3 col=u_bg+u_primary*(aur+bot)+u_secondary*(aur*.35);
  vec2 v=uv-.5;
  col*=clamp(1.-dot(v,v)*1.6,0.,1.);
  gl_FragColor=vec4(col,1.);
}`;

const mkS=(gl,type,src)=>{
  const s=gl.createShader(type);
  gl.shaderSource(s,src); gl.compileShader(s);
  return s;
};
const mkP=(gl,vs,fs)=>{
  const p=gl.createProgram();
  gl.attachShader(p,mkS(gl,gl.VERTEX_SHADER,vs));
  gl.attachShader(p,mkS(gl,gl.FRAGMENT_SHADER,fs));
  gl.linkProgram(p); return p;
};
const u1f=(gl,p,n,v)=>gl.uniform1f(gl.getUniformLocation(p,n),v);
const u2f=(gl,p,n,a,b)=>gl.uniform2f(gl.getUniformLocation(p,n),a,b);
const u3f=(gl,p,n,a,b,c)=>gl.uniform3f(gl.getUniformLocation(p,n),a,b,c);
const bindB=(gl,prog,buf,name,sz)=>{
  const loc=gl.getAttribLocation(prog,name);
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc,sz,gl.FLOAT,false,0,0);
};

const N=1600;

export default function ScrollBackground(){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current;
    if(!canvas) return;
    const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false});
    if(!gl) return;
    gl.enable(gl.BLEND);

    const aurP=mkP(gl,AV,AF);
    const partP=mkP(gl,VERT,FRAG);

    const quadBuf=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]),gl.STATIC_DRAW);

    const posA=new Float32Array(N*2),phA=new Float32Array(N),sdA=new Float32Array(N);
    for(let i=0;i<N;i++){
      posA[i*2]=(Math.random()-.5)*2; posA[i*2+1]=(Math.random()-.5)*2;
      phA[i]=Math.random(); sdA[i]=Math.random();
    }
    const mkB=d=>{ const b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER,d,gl.STATIC_DRAW); return b; };
    const pB=mkB(posA), phB=mkB(phA), sB=mkB(sdA);

    let W=0,H=0;
    const resize=()=>{ W=window.innerWidth; H=window.innerHeight; canvas.width=W; canvas.height=H; gl.viewport(0,0,W,H); };
    resize(); window.addEventListener('resize',resize);

    let targetMood=0, curMood=0;
    const onScroll=()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight;
      targetMood=max>0 ? clamp(window.scrollY/max,0,1)*8 : 0;
    };
    window.addEventListener('scroll',onScroll,{passive:true});

    const SPEEDS=[0.55,0.42,1.05,0.70,0.65,0.80,0.32,0.90,1.10];
    let raf, t0=performance.now();

    const draw=now=>{
      raf=requestAnimationFrame(draw);
      const t=(now-t0)/1000;
      curMood+=( targetMood-curMood)*0.06;

      const mi=clamp(curMood,0,8);
      const lo=Math.min(Math.floor(mi),7);
      const hi=Math.min(lo+1,8);
      const mf=mi-lo;

      const pLo=PALETTES[lo], pHi=PALETTES[hi];
      const pri=pLo.p.map((v,i)=>lerp(v,pHi.p[i],mf));
      const sec=pLo.s.map((v,i)=>lerp(v,pHi.s[i],mf));
      const bg =pLo.bg.map((v,i)=>lerp(v,pHi.bg[i],mf));
      const spd=lerp(SPEEDS[lo],SPEEDS[hi],mf);

      // Aurora
      gl.blendFunc(gl.ONE,gl.ZERO);
      gl.useProgram(aurP);
      bindB(gl,aurP,quadBuf,'a_pos',2);
      u1f(gl,aurP,'u_time',t); u1f(gl,aurP,'u_mood',mi);
      u3f(gl,aurP,'u_primary',...pri); u3f(gl,aurP,'u_secondary',...sec);
      u3f(gl,aurP,'u_bg',...bg); u2f(gl,aurP,'u_res',W,H);
      gl.drawArrays(gl.TRIANGLES,0,6);

      // Particles
      gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
      gl.useProgram(partP);
      bindB(gl,partP,pB,'a_pos',2);
      bindB(gl,partP,phB,'a_phase',1);
      bindB(gl,partP,sB,'a_seed',1);
      u1f(gl,partP,'u_time',t); u1f(gl,partP,'u_mood',mi);
      u1f(gl,partP,'u_speed',spd);
      u3f(gl,partP,'u_primary',...pri); u3f(gl,partP,'u_secondary',...sec);
      u2f(gl,partP,'u_res',W,H);
      gl.drawArrays(gl.POINTS,0,N);
    };
    raf=requestAnimationFrame(draw);

    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize); window.removeEventListener('scroll',onScroll); };
  },[]);

  return (
    <canvas ref={ref} style={{
      position:'fixed', inset:0,
      width:'100vw', height:'100vh',
      zIndex:0, pointerEvents:'none', display:'block',
    }}/>
  );
}
