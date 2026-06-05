import { useEffect, useRef } from 'react';

// ── Shape generators — return {x,y} in 0-1 normalised space ─────────────────
const shapes = {
  scatter: (n) =>
    Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random() })),

  infinity: (n) =>
    Array.from({ length: n }, (_, i) => {
      const t = (i / n) * Math.PI * 2;
      const scale = 0.22;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      return {
        x: 0.5 + (scale * Math.cos(t)) / denom,
        y: 0.5 + (scale * Math.sin(t) * Math.cos(t)) / denom,
      };
    }),

  grid: (n) => {
    const cols = Math.ceil(Math.sqrt(n * 1.5));
    const rows = Math.ceil(n / cols);
    const pts = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (pts.length < n)
          pts.push({ x: 0.2 + (c / (cols - 1)) * 0.6, y: 0.2 + (r / (rows - 1)) * 0.6 });
    return pts;
  },

  chartLine: (n) =>
    Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      return {
        x: 0.1 + t * 0.8,
        y: 0.75 - t * 0.5 + Math.sin(t * Math.PI * 3) * 0.05 + (Math.random() - 0.5) * 0.03,
      };
    }),

  chatBubble: (n) => {
    const pts = [];
    const w = 0.55, h = 0.38, cx = 0.5, cy = 0.44;
    const body = Math.floor(n * 0.75);
    const perim = 2 * (w + h);
    for (let i = 0; i < body; i++) {
      const t = (i / body) * perim;
      let x, y;
      if (t < w)           { x = cx - w/2 + t;          y = cy - h/2; }
      else if (t < w+h)    { x = cx + w/2;               y = cy - h/2 + (t-w); }
      else if (t < 2*w+h)  { x = cx + w/2 - (t-w-h);    y = cy + h/2; }
      else                 { x = cx - w/2;               y = cy + h/2 - (t-2*w-h); }
      pts.push({ x, y });
    }
    const tail = n - body;
    for (let i = 0; i < tail; i++) {
      const t = i / tail;
      pts.push({ x: 0.36 + t * 0.1, y: cy + h/2 + t * 0.13 });
    }
    return pts;
  },

  shoppingBag: (n) => {
    const pts = [];
    const bx=0.5, by=0.56, bw=0.42, bh=0.4;
    const body = Math.floor(n * 0.7);
    const perim = 2*(bw+bh);
    for (let i = 0; i < body; i++) {
      const t = (i / body) * perim;
      let x, y;
      if (t < bw)           { x = bx-bw/2+t;           y = by-bh/2; }
      else if (t < bw+bh)   { x = bx+bw/2;             y = by-bh/2+(t-bw); }
      else if (t < 2*bw+bh) { x = bx+bw/2-(t-bw-bh);  y = by+bh/2; }
      else                  { x = bx-bw/2;             y = by+bh/2-(t-2*bw-bh); }
      pts.push({ x, y });
    }
    const handle = n - body;
    for (let i = 0; i < handle; i++) {
      const t = (i / handle) * Math.PI;
      pts.push({ x: bx + Math.cos(Math.PI + t) * 0.11, y: by - bh/2 - Math.sin(t) * 0.14 });
    }
    return pts;
  },

  codeBrackets: (n) => {
    const pts = [];
    const chunk = Math.floor(n / 3);
    for (let i = 0; i < chunk; i++) {
      const t = i / chunk;
      pts.push(t < 0.5
        ? { x: 0.27 - (0.5-t)*0.13, y: 0.3 + t*0.4 }
        : { x: 0.27 - (t-0.5)*0.13, y: 0.3 + t*0.4 });
    }
    for (let i = 0; i < chunk; i++) {
      const t = i / chunk;
      pts.push({ x: 0.43 + t*0.14, y: 0.72 - t*0.44 });
    }
    const rest = n - 2*chunk;
    for (let i = 0; i < rest; i++) {
      const t = i / rest;
      pts.push(t < 0.5
        ? { x: 0.73 + (0.5-t)*0.13, y: 0.3 + t*0.4 }
        : { x: 0.73 + (t-0.5)*0.13, y: 0.3 + t*0.4 });
    }
    return pts;
  },

  fiveStars: (n) => {
    const pts = [];
    const perStar = Math.floor(n / 5);
    for (let s = 0; s < 5; s++) {
      const cx = 0.1 + s * 0.2, cy = 0.5;
      for (let i = 0; i < perStar; i++) {
        const angle = (i / perStar) * Math.PI * 2 - Math.PI / 2;
        const r = (i % 2 === 0) ? 0.078 : 0.034;
        pts.push({ x: cx + Math.cos(angle)*r, y: cy + Math.sin(angle)*r });
      }
    }
    return pts;
  },

  arrowSteps: (n) => {
    const pts = [];
    const steps = 4, perStep = Math.floor(n / steps);
    for (let s = 0; s < steps; s++) {
      const cx = 0.13 + s*0.24, cy = 0.5;
      const dotN = Math.floor(perStep * 0.6);
      for (let i = 0; i < dotN; i++) {
        const a = (i/dotN)*Math.PI*2;
        pts.push({ x: cx+Math.cos(a)*0.057, y: cy+Math.sin(a)*0.057 });
      }
      if (s < steps-1) {
        const arrN = perStep - dotN;
        for (let i = 0; i < arrN; i++) {
          pts.push({ x: cx+0.075+(i/arrN)*0.1, y: cy });
        }
      }
    }
    return pts;
  },

  envelope: (n) => {
    const pts = [];
    const ex=0.5, ey=0.5, ew=0.52, eh=0.35;
    const body = Math.floor(n*0.6);
    const perim = 2*(ew+eh);
    for (let i = 0; i < body; i++) {
      const t = (i/body)*perim;
      let x, y;
      if (t < ew)           { x=ex-ew/2+t;          y=ey-eh/2; }
      else if (t < ew+eh)   { x=ex+ew/2;             y=ey-eh/2+(t-ew); }
      else if (t < 2*ew+eh) { x=ex+ew/2-(t-ew-eh);  y=ey+eh/2; }
      else                  { x=ex-ew/2;             y=ey+eh/2-(t-2*ew-eh); }
      pts.push({ x, y });
    }
    const flap = n - body;
    for (let i = 0; i < flap; i++) {
      const t = i/flap;
      pts.push(t < 0.5
        ? { x: ex-ew/2+t*ew,            y: ey-eh/2+t*eh*0.7 }
        : { x: ex+ew/2-(t-0.5)*ew,      y: ey-eh/2+(1-t)*eh*0.7 });
    }
    return pts;
  },
};

const SECTION_SHAPES = {
  home:          'scatter',
  narrative:     'infinity',
  products:      'grid',
  'trading-bot': 'chartLine',
  assistant:     'chatBubble',
  store:         'shoppingBag',
  services:      'codeBrackets',
  reviews:       'fiveStars',
  process:       'arrowSteps',
  contact:       'envelope',
  footer:        'scatter',
};

const SECTION_COLORS = {
  home:          [180, 160, 255],
  narrative:     [120, 140, 255],
  products:      [160, 100, 255],
  'trading-bot': [80,  220, 140],
  assistant:     [80,  160, 255],
  store:         [60,  220, 200],
  services:      [100, 120, 220],
  reviews:       [220, 80,  180],
  process:       [80,  210, 160],
  contact:       [180, 160, 255],
  footer:        [120, 120, 200],
};

export default function ScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const isMobile = () => W < 768;

    const setSize = () => {
      W = window.innerWidth;
      H = document.documentElement.scrollHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    setSize();

    // ── Atmospheres ──────────────────────────────────────────────────────────
    const ATMOSPHERES = [
      { bg:[8,4,28]  }, { bg:[3,8,28]  }, { bg:[14,4,28] }, { bg:[2,14,10] },
      { bg:[2,6,28]  }, { bg:[2,18,20] }, { bg:[3,3,20]  }, { bg:[18,3,16] },
      { bg:[2,16,14] }, { bg:[8,4,28]  },
    ];
    const ambient = { r:8, g:4, b:28 };
    const LERP = 0.03;

    // ── Stars ────────────────────────────────────────────────────────────────
    const clusterCentres = Array.from({ length: 12 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
    }));
    const clusteredPos = (str=0.4) => {
      if (Math.random() < str) {
        const c = clusterCentres[Math.floor(Math.random()*clusterCentres.length)];
        const sp = Math.min(W,H)*0.12;
        return {
          x: Math.max(0,Math.min(W, c.x+(Math.random()-0.5)*sp*2)),
          y: Math.max(0,Math.min(H, c.y+(Math.random()-0.5)*sp*2)),
        };
      }
      return { x:Math.random()*W, y:Math.random()*H };
    };
    const makeStars = (count,rMin,rMax,opMin,opMax,sMin,sMax,drift,cluster) =>
      Array.from({ length:count }, () => {
        const p = clusteredPos(cluster);
        return { x:p.x, y:p.y,
          vx:(Math.random()-0.5)*drift, vy:(Math.random()-0.5)*drift,
          r:Math.random()*(rMax-rMin)+rMin,
          opacity:Math.random()*(opMax-opMin)+opMin,
          phase:Math.random()*Math.PI*2,
          speed:Math.random()*(sMax-sMin)+sMin,
        };
      });

    const distantStars = makeStars(600,0.3,0.7, 0.15,0.55, 0.15,0.4,  0.0,  0.45);
    const midStars     = makeStars(180,0.5,1.1, 0.30,0.65, 0.12,0.35, 0.04, 0.3);
    const closeStars   = makeStars(60, 0.9,1.6, 0.50,0.85, 0.10,0.28, 0.08, 0.2);
    const MOUSE_DIST=160, MOUSE_FORCE=0.05, SPEED_CAP=1.5;

    // ── Shape particles ──────────────────────────────────────────────────────
    // KEY FIX: particles live in VIEWPORT space (0..W, 0..windowHeight),
    // not page space. We convert on draw using window.scrollY.
    const N = isMobile() ? 120 : 220;

    // viewport coords
    const VW = W;
    const VH = window.innerHeight;

    const particles = Array.from({ length: N }, () => ({
      // current position in viewport space
      vx_pos: Math.random() * VW,
      vy_pos: Math.random() * VH,
      // target in viewport space
      tx: Math.random() * VW,
      ty: Math.random() * VH,
      // velocity for smooth movement
      velX: 0,
      velY: 0,
      r:  Math.random()*1.4+0.6,
      opacity: Math.random()*0.3+0.35,
    }));

    // Shape color
    let shapeColor = { r:180, g:160, b:255 };
    let targetColor = { r:180, g:160, b:255 };

    // Build targets in viewport space from normalised shape pts
    const buildTargets = (sectionId) => {
      const key = SECTION_SHAPES[sectionId] || 'scatter';
      const pts = shapes[key](N);

      // Box fills most of the viewport
      const boxW = Math.min(VW * 0.7, 560);
      const boxH = Math.min(VH * 0.65, 420);
      const boxX = (VW - boxW) / 2;
      const boxY = (VH - boxH) / 2;

      pts.forEach((pt, i) => {
        if (!particles[i]) return;
        particles[i].tx = boxX + pt.x * boxW;
        particles[i].ty = boxY + pt.y * boxH;
      });

      const col = SECTION_COLORS[sectionId] || [180,160,255];
      targetColor = { r:col[0], g:col[1], b:col[2] };
    };

    // ── IntersectionObserver ─────────────────────────────────────────────────
    const SECTION_IDS = Object.keys(SECTION_SHAPES);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buildTargets(entry.target.id);
        }
      });
    }, { threshold: 0.15 }); // lower threshold — fires earlier

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Kick off with home shape immediately
    buildTargets('home');

    // ── Event listeners ──────────────────────────────────────────────────────
    const onMouse = e => { mouse.x=e.clientX; mouse.y=e.clientY+window.scrollY; };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      setSize();
      clusterCentres.forEach(c => { c.x=Math.random()*W; c.y=Math.random()*H; });
      [...distantStars,...midStars,...closeStars].forEach(p => {
        const pos=clusteredPos(0.3); p.x=pos.x; p.y=pos.y;
      });
    };
    window.addEventListener('resize', onResize);

    // ── Draw ─────────────────────────────────────────────────────────────────
    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      // Scroll progress → atmosphere
      const pageH = document.documentElement.scrollHeight - window.innerHeight;
      const sp = pageH > 0 ? Math.min(window.scrollY/pageH, 1) : 0;
      const atmCount = ATMOSPHERES.length;
      const raw = sp*(atmCount-1);
      const ai = Math.min(Math.floor(raw), atmCount-2);
      const af = raw-ai;
      const a=ATMOSPHERES[ai], b=ATMOSPHERES[ai+1];
      ambient.r += (a.bg[0]+(b.bg[0]-a.bg[0])*af - ambient.r)*LERP;
      ambient.g += (a.bg[1]+(b.bg[1]-a.bg[1])*af - ambient.g)*LERP;
      ambient.b += (a.bg[2]+(b.bg[2]-a.bg[2])*af - ambient.b)*LERP;

      // Lerp shape color
      shapeColor.r += (targetColor.r-shapeColor.r)*0.035;
      shapeColor.g += (targetColor.g-shapeColor.g)*0.035;
      shapeColor.b += (targetColor.b-shapeColor.b)*0.035;

      // Vignette
      const vig = ctx.createRadialGradient(W/2,H*0.4,0, W/2,H*0.4, Math.max(W,H)*0.75);
      vig.addColorStop(0,'rgba(0,0,0,0)');
      vig.addColorStop(1,'rgba(0,0,0,0.55)');
      ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);

      // ── Stars (unchanged) ───────────────────────────────────────────────
      const drawStar = (s,col) => {
        const tw = 0.85+0.15*Math.abs(Math.sin(t*s.speed+s.phase));
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${col},${s.opacity*tw})`;
        ctx.fill();
      };
      distantStars.forEach(s=>drawStar(s,'220,225,255'));
      midStars.forEach(s=>{
        s.x+=s.vx; s.y+=s.vy;
        if(s.x<0)s.x=W; if(s.x>W)s.x=0;
        if(s.y<0)s.y=H; if(s.y>H)s.y=0;
        drawStar(s,'230,235,255');
      });
      closeStars.forEach(s=>{
        const dx=mouse.x-s.x, dy=mouse.y-s.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<MOUSE_DIST&&dist>0){
          const str=(1-dist/MOUSE_DIST)*MOUSE_FORCE;
          s.vx+=(dx/dist)*str; s.vy+=(dy/dist)*str;
        }
        const spd=Math.sqrt(s.vx*s.vx+s.vy*s.vy);
        if(spd>SPEED_CAP){s.vx=(s.vx/spd)*SPEED_CAP; s.vy=(s.vy/spd)*SPEED_CAP;}
        s.vx*=0.97; s.vy*=0.97;
        s.x+=s.vx; s.y+=s.vy;
        if(s.x<0)s.x=W; if(s.x>W)s.x=0;
        if(s.y<0)s.y=H; if(s.y>H)s.y=0;
        drawStar(s,'245,248,255');
      });

      // ── Shape particles — rendered in VIEWPORT space ─────────────────────
      // Particles store viewport coords; we draw them offset by scrollY
      // so they appear fixed to the viewport (always visible).
      const { r:cr, g:cg, b:cb } = shapeColor;

      particles.forEach(p => {
        // Spring toward target
        const dx = p.tx - p.vx_pos;
        const dy = p.ty - p.vy_pos;
        p.velX += dx * 0.06;
        p.velY += dy * 0.06;
        p.velX *= 0.82;
        p.velY *= 0.82;
        p.vx_pos += p.velX;
        p.vy_pos += p.velY;

        // Draw at viewport position — canvas is fixed so we draw at vx_pos, vy_pos
        // but canvas height = full page, so we offset by scrollY to keep in view
        const drawX = p.vx_pos;
        const drawY = p.vy_pos + window.scrollY;

        // Brightness based on how close to target
        const distToTarget = Math.sqrt(dx*dx+dy*dy);
        const closeness = Math.max(0, 1 - distToTarget/120);
        const alpha = p.opacity*0.3 + closeness*0.6;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.r, 0, Math.PI*2);
        ctx.fillStyle=`rgba(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)},${alpha.toFixed(2)})`;
        ctx.fill();
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
