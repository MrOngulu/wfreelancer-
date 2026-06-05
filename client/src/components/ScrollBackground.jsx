import { useEffect, useRef } from 'react';

// ── Shape generators — return array of {x,y} in normalised 0-1 space ────────
const shapes = {
  scatter: (n) =>
    Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random() })),

  infinity: (n) =>
    Array.from({ length: n }, (_, i) => {
      const t = (i / n) * Math.PI * 2;
      const scale = 0.22;
      const cx = 0.5, cy = 0.5;
      // Lemniscate of Bernoulli
      const denom = 1 + Math.sin(t) * Math.sin(t);
      return {
        x: cx + (scale * Math.cos(t)) / denom,
        y: cy + (scale * Math.sin(t) * Math.cos(t)) / denom,
      };
    }),

  grid: (n) => {
    const cols = Math.ceil(Math.sqrt(n * 1.5));
    const rows = Math.ceil(n / cols);
    const pts = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (pts.length < n)
          pts.push({
            x: 0.25 + (c / (cols - 1)) * 0.5,
            y: 0.25 + (r / (rows - 1)) * 0.5,
          });
    return pts;
  },

  chartLine: (n) =>
    Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      // Rising curve with noise
      const base = 0.7 - t * 0.45;
      const wave = Math.sin(t * Math.PI * 3) * 0.04;
      const jitter = (Math.random() - 0.5) * 0.03;
      return { x: 0.1 + t * 0.8, y: base + wave + jitter };
    }),

  chatBubble: (n) => {
    const pts = [];
    // Rounded rect top part
    const w = 0.5, h = 0.35, cx = 0.5, cy = 0.45;
    const perimeter = 2 * (w + h);
    for (let i = 0; i < Math.floor(n * 0.75); i++) {
      const t = (i / Math.floor(n * 0.75)) * perimeter;
      let x, y;
      if (t < w)      { x = cx - w/2 + t;       y = cy - h/2; }
      else if (t < w+h) { x = cx + w/2;           y = cy - h/2 + (t - w); }
      else if (t < 2*w+h){ x = cx + w/2 - (t-w-h); y = cy + h/2; }
      else              { x = cx - w/2;           y = cy + h/2 - (t-2*w-h); }
      pts.push({ x, y });
    }
    // Tail triangle dots
    const tailN = n - pts.length;
    for (let i = 0; i < tailN; i++) {
      const t = i / tailN;
      pts.push({ x: 0.38 + t * 0.1, y: cy + h/2 + t * 0.12 });
    }
    return pts;
  },

  shoppingBag: (n) => {
    const pts = [];
    // Bag body — rounded rect
    const bx = 0.5, by = 0.55, bw = 0.38, bh = 0.38;
    const body = Math.floor(n * 0.7);
    for (let i = 0; i < body; i++) {
      const t = (i / body) * (2 * (bw + bh));
      let x, y;
      if (t < bw)        { x = bx - bw/2 + t;        y = by - bh/2; }
      else if (t < bw+bh){ x = bx + bw/2;             y = by - bh/2 + (t - bw); }
      else if (t < 2*bw+bh){ x = bx + bw/2 - (t-bw-bh); y = by + bh/2; }
      else               { x = bx - bw/2;             y = by + bh/2 - (t-2*bw-bh); }
      pts.push({ x, y });
    }
    // Handle arc
    const handle = n - body;
    for (let i = 0; i < handle; i++) {
      const t = (i / handle) * Math.PI;
      pts.push({ x: bx + Math.cos(Math.PI + t) * 0.1, y: by - bh/2 - Math.sin(t) * 0.13 });
    }
    return pts;
  },

  codeBrackets: (n) => {
    const pts = [];
    const chunk = Math.floor(n / 3);
    // Left bracket <
    for (let i = 0; i < chunk; i++) {
      const t = i / chunk;
      if (t < 0.5) pts.push({ x: 0.28 - (0.5 - t) * 0.12, y: 0.35 + t * 0.3 });
      else         pts.push({ x: 0.28 - (t - 0.5) * 0.12, y: 0.35 + t * 0.3 });
    }
    // Slash /
    for (let i = 0; i < chunk; i++) {
      const t = i / chunk;
      pts.push({ x: 0.44 + t * 0.12, y: 0.7 - t * 0.4 });
    }
    // Right bracket >
    const rest = n - 2 * chunk;
    for (let i = 0; i < rest; i++) {
      const t = i / rest;
      if (t < 0.5) pts.push({ x: 0.72 + (0.5 - t) * 0.12, y: 0.35 + t * 0.3 });
      else         pts.push({ x: 0.72 + (t - 0.5) * 0.12, y: 0.35 + t * 0.3 });
    }
    return pts;
  },

  fiveStars: (n) => {
    const pts = [];
    const starCount = 5;
    const perStar = Math.floor(n / starCount);
    for (let s = 0; s < starCount; s++) {
      const cx = 0.1 + s * 0.2;
      const cy = 0.5;
      const outerR = 0.075, innerR = 0.032;
      for (let i = 0; i < perStar; i++) {
        const idx = i % 10;
        const angle = (idx / 10) * Math.PI * 2 - Math.PI / 2;
        const r = idx % 2 === 0 ? outerR : innerR;
        pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
      }
    }
    return pts;
  },

  arrowSteps: (n) => {
    const pts = [];
    const steps = 4;
    const perStep = Math.floor(n / steps);
    for (let s = 0; s < steps; s++) {
      const cx = 0.15 + s * 0.23;
      const cy = 0.5;
      const dotN = Math.floor(perStep * 0.55);
      // Circle node
      for (let i = 0; i < dotN; i++) {
        const a = (i / dotN) * Math.PI * 2;
        pts.push({ x: cx + Math.cos(a) * 0.055, y: cy + Math.sin(a) * 0.055 });
      }
      // Arrow to next
      if (s < steps - 1) {
        const arrN = perStep - dotN;
        for (let i = 0; i < arrN; i++) {
          const t = i / arrN;
          pts.push({ x: cx + 0.07 + t * 0.1, y: cy });
        }
      }
    }
    return pts;
  },

  envelope: (n) => {
    const pts = [];
    const ex = 0.5, ey = 0.5, ew = 0.5, eh = 0.34;
    const body = Math.floor(n * 0.55);
    // Rect outline
    for (let i = 0; i < body; i++) {
      const t = (i / body) * (2 * (ew + eh));
      let x, y;
      if (t < ew)         { x = ex - ew/2 + t;         y = ey - eh/2; }
      else if (t < ew+eh) { x = ex + ew/2;              y = ey - eh/2 + (t - ew); }
      else if (t < 2*ew+eh){ x = ex + ew/2 - (t-ew-eh); y = ey + eh/2; }
      else                 { x = ex - ew/2;              y = ey + eh/2 - (t-2*ew-eh); }
      pts.push({ x, y });
    }
    // V flap
    const flap = n - body;
    for (let i = 0; i < flap; i++) {
      const t = i / flap;
      if (t < 0.5) pts.push({ x: ex - ew/2 + t * ew, y: ey - eh/2 + t * eh * 0.7 });
      else         pts.push({ x: ex + (1-t) * ew - ew/2 + ew, y: ey - eh/2 + (1-t) * eh * 0.7 });
    }
    return pts;
  },
};

// Section → shape key mapping
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

// Section → atmosphere color (matches ATMOSPHERES in order)
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

    const isMobile = () => window.innerWidth < 768;
    const PARTICLE_COUNT = () => isMobile() ? 120 : 220;

    const setSize = () => {
      W = window.innerWidth;
      H = document.documentElement.scrollHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    setSize();

    // ── Atmospheres (scroll-driven ambient color) ────────────────────────────
    const ATMOSPHERES = [
      { bg:[8,4,28]   },
      { bg:[3,8,28]   },
      { bg:[14,4,28]  },
      { bg:[2,14,10]  },
      { bg:[2,6,28]   },
      { bg:[2,18,20]  },
      { bg:[3,3,20]   },
      { bg:[18,3,16]  },
      { bg:[2,16,14]  },
      { bg:[8,4,28]   },
    ];
    const ambient = { r: 8, g: 4, b: 28 };
    const LERP = 0.03;

    // ── Stars (same crisp design as before) ─────────────────────────────────
    const clusterCentres = Array.from({ length: 12 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
    }));
    const clusteredPos = (strength = 0.4) => {
      if (Math.random() < strength) {
        const c = clusterCentres[Math.floor(Math.random() * clusterCentres.length)];
        const spread = Math.min(W, H) * 0.12;
        return {
          x: Math.max(0, Math.min(W, c.x + (Math.random()-0.5)*spread*2)),
          y: Math.max(0, Math.min(H, c.y + (Math.random()-0.5)*spread*2)),
        };
      }
      return { x: Math.random()*W, y: Math.random()*H };
    };
    const makeStars = (count, rMin, rMax, opMin, opMax, sMin, sMax, drift, cluster) =>
      Array.from({ length: count }, () => {
        const p = clusteredPos(cluster);
        return { x:p.x, y:p.y,
          vx:(Math.random()-0.5)*drift, vy:(Math.random()-0.5)*drift,
          r:Math.random()*(rMax-rMin)+rMin,
          opacity:Math.random()*(opMax-opMin)+opMin,
          phase:Math.random()*Math.PI*2,
          speed:Math.random()*(sMax-sMin)+sMin,
        };
      });

    const distantStars = makeStars(600, 0.3, 0.7, 0.15, 0.55, 0.15, 0.4, 0.0,  0.45);
    const midStars     = makeStars(180, 0.5, 1.1, 0.30, 0.65, 0.12, 0.35, 0.04, 0.3);
    const closeStars   = makeStars(60,  0.9, 1.6, 0.50, 0.85, 0.10, 0.28, 0.08, 0.2);
    const MOUSE_DIST=160, MOUSE_FORCE=0.05, SPEED_CAP=1.5;

    // ── Floating shape particles ─────────────────────────────────────────────
    // Each particle has a current position, a target position, and drifts
    let N = PARTICLE_COUNT();

    // Build initial positions scattered
    let particles = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.6 + H * 0.1, // bias toward upper portion
      // target position (set when section changes)
      tx: 0, ty: 0,
      // morph progress 0→1
      morphing: false,
      // small drift offsets for organic feel when settled
      dx: (Math.random()-0.5)*0.4,
      dy: (Math.random()-0.5)*0.4,
      r: Math.random()*1.2+0.5,
      opacity: Math.random()*0.3+0.3,
    }));

    // Current shape state
    let currentSection = 'home';
    let shapeColor = { r:180, g:160, b:255 };
    let targetColor = { r:180, g:160, b:255 };

    // viewport-relative section anchor (top of viewport when section is active)
    // We track the section's top in page coords and render shape centered there
    let sectionTop = 0;  // page Y where current section starts

    const buildTargets = (sectionId, secTop, secHeight) => {
      const key = SECTION_SHAPES[sectionId] || 'scatter';
      const N_local = particles.length;
      const pts = shapes[key](N_local);

      // Shape renders in a box: horizontally centered, vertically in the
      // section's viewport area — use a fixed render region on the canvas
      const boxW = Math.min(W * 0.55, 500);
      const boxH = Math.min(secHeight * 0.55, 380);
      const boxX = (W - boxW) / 2;
      const boxY = secTop + (secHeight - boxH) / 2;

      pts.forEach((pt, i) => {
        if (particles[i]) {
          particles[i].tx = boxX + pt.x * boxW;
          particles[i].ty = boxY + pt.y * boxH;
          particles[i].morphing = true;
          // Stagger morph start slightly per particle for organic feel
          particles[i].morphDelay = i * 0.4; // ms-ish delay factor
          particles[i].morphT = 0;
        }
      });
    };

    // ── IntersectionObserver ─────────────────────────────────────────────────
    const SECTION_IDS = Object.keys(SECTION_SHAPES);
    const sectionEls = {};
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionEls[id] = el;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (!SECTION_SHAPES[id]) return;
          currentSection = id;
          const rect = entry.target.getBoundingClientRect();
          const secTop = rect.top + window.scrollY;
          const secH   = entry.target.offsetHeight;
          sectionTop = secTop;
          buildTargets(id, secTop, secH);
          const col = SECTION_COLORS[id] || [180,160,255];
          targetColor = { r:col[0], g:col[1], b:col[2] };
        }
      });
    }, { threshold: 0.25 });

    Object.values(sectionEls).forEach(el => observer.observe(el));

    // Kick off initial shape
    const homeEl = document.getElementById('home');
    if (homeEl) {
      buildTargets('home', 0, homeEl.offsetHeight);
    }

    // ── Event listeners ──────────────────────────────────────────────────────
    const onMouse = e => { mouse.x = e.clientX; mouse.y = e.clientY + window.scrollY; };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      setSize();
      N = PARTICLE_COUNT();
      // rebuild particles if count changed
      if (particles.length !== N) {
        particles = Array.from({ length: N }, () => ({
          x: Math.random()*W, y: Math.random()*H*0.6+H*0.1,
          tx:0, ty:0, morphing:false,
          dx:(Math.random()-0.5)*0.4, dy:(Math.random()-0.5)*0.4,
          r:Math.random()*1.2+0.5,
          opacity:Math.random()*0.3+0.3,
        }));
      }
      clusterCentres.forEach(c => { c.x=Math.random()*W; c.y=Math.random()*H; });
      [...distantStars,...midStars,...closeStars].forEach(p => {
        const pos = clusteredPos(0.3); p.x=pos.x; p.y=pos.y;
      });
    };
    window.addEventListener('resize', onResize);

    // ── Main draw loop ───────────────────────────────────────────────────────
    let t = 0;
    const MORPH_SPEED = 0.025; // how fast particles travel to target

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      // Atmosphere
      const pageHeight     = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = pageHeight > 0 ? Math.min(window.scrollY/pageHeight,1) : 0;
      const atmCount = ATMOSPHERES.length;
      const rawIndex = scrollProgress*(atmCount-1);
      const atmIndex = Math.min(Math.floor(rawIndex), atmCount-2);
      const atmFrac  = rawIndex-atmIndex;
      const atmA=ATMOSPHERES[atmIndex], atmB=ATMOSPHERES[atmIndex+1];
      ambient.r += (atmA.bg[0]+(atmB.bg[0]-atmA.bg[0])*atmFrac - ambient.r)*LERP;
      ambient.g += (atmA.bg[1]+(atmB.bg[1]-atmA.bg[1])*atmFrac - ambient.g)*LERP;
      ambient.b += (atmA.bg[2]+(atmB.bg[2]-atmA.bg[2])*atmFrac - ambient.b)*LERP;

      // Lerp shape color
      shapeColor.r += (targetColor.r - shapeColor.r) * 0.04;
      shapeColor.g += (targetColor.g - shapeColor.g) * 0.04;
      shapeColor.b += (targetColor.b - shapeColor.b) * 0.04;

      // Vignette
      const vig = ctx.createRadialGradient(W/2,H*0.4,0, W/2,H*0.4, Math.max(W,H)*0.75);
      vig.addColorStop(0,'rgba(0,0,0,0)');
      vig.addColorStop(1,'rgba(0,0,0,0.55)');
      ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);

      // ── Draw stars ──────────────────────────────────────────────────────
      const drawStar = (s, col) => {
        const tw = 0.85 + 0.15*Math.abs(Math.sin(t*s.speed+s.phase));
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${col},${s.opacity*tw})`;
        ctx.fill();
      };
      distantStars.forEach(s => drawStar(s,'220,225,255'));
      midStars.forEach(s => {
        s.x+=s.vx; s.y+=s.vy;
        if(s.x<0)s.x=W; if(s.x>W)s.x=0;
        if(s.y<0)s.y=H; if(s.y>H)s.y=0;
        drawStar(s,'230,235,255');
      });
      closeStars.forEach(s => {
        const dx=mouse.x-s.x, dy=mouse.y-s.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<MOUSE_DIST&&dist>0){const str=(1-dist/MOUSE_DIST)*MOUSE_FORCE; s.vx+=(dx/dist)*str; s.vy+=(dy/dist)*str;}
        const spd=Math.sqrt(s.vx*s.vx+s.vy*s.vy);
        if(spd>SPEED_CAP){s.vx=(s.vx/spd)*SPEED_CAP; s.vy=(s.vy/spd)*SPEED_CAP;}
        s.vx*=0.97; s.vy*=0.97;
        s.x+=s.vx; s.y+=s.vy;
        if(s.x<0)s.x=W; if(s.x>W)s.x=0;
        if(s.y<0)s.y=H; if(s.y>H)s.y=0;
        drawStar(s,'245,248,255');
      });

      // ── Draw shape particles ─────────────────────────────────────────────
      const { r: cr, g: cg, b: cb } = shapeColor;

      // Only render particles near the current viewport (perf)
      const viewTop    = window.scrollY - 200;
      const viewBottom = window.scrollY + window.innerHeight + 200;

      particles.forEach(p => {
        // Morph toward target
        if (p.morphing) {
          p.morphT = Math.min((p.morphT || 0) + MORPH_SPEED, 1);
          // Ease out cubic
          const ease = 1 - Math.pow(1 - p.morphT, 3);
          p.x += (p.tx - p.x) * ease * 0.06;
          p.y += (p.ty - p.y) * ease * 0.06;
          if (p.morphT >= 1) p.morphing = false;
        } else {
          // Gentle organic drift when settled
          p.x += p.dx * 0.08;
          p.y += p.dy * 0.08;
          // Slowly drift back toward target
          p.x += (p.tx - p.x) * 0.002;
          p.y += (p.ty - p.y) * 0.002;
        }

        // Only draw if in viewport range
        if (p.y < viewTop || p.y > viewBottom) return;

        // Fade based on distance from settled target (particles look brighter when close)
        const dist = Math.sqrt((p.x-p.tx)**2 + (p.y-p.ty)**2);
        const closeness = Math.max(0, 1 - dist/80);
        const alpha = (p.opacity * 0.35 + closeness * 0.55);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)},${alpha.toFixed(2)})`;
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
