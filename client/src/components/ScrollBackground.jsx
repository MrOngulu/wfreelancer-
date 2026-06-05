import { useEffect, useRef } from 'react';

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

    const setSize = () => {
      W = window.innerWidth;
      H = document.documentElement.scrollHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    setSize();

    // ── Ambient atmosphere per section ──────────────────────────────────────
    // Each entry: { bg: [r,g,b], blobs: [[r,g,b], ...x6] }
    // bg is the full-canvas ambient wash color (kept very dark, just a tint)
    const ATMOSPHERES = [
      { bg:[8,4,28],   blobs:[[80,20,180],[10,60,160],[60,10,150],[100,30,200],[15,80,180],[60,15,160]] }, // Hero — deep purple
      { bg:[3,8,28],   blobs:[[10,40,160],[0,80,180],[8,30,140],[15,55,170],[5,90,190],[8,35,150]]     }, // Narrative — cold indigo
      { bg:[14,4,28],  blobs:[[140,20,200],[100,10,180],[120,15,190],[160,25,210],[110,12,185],[135,18,195]] }, // Products — violet
      { bg:[2,14,10],  blobs:[[0,160,80],[0,200,100],[0,140,60],[0,180,90],[0,220,110],[0,150,70]]     }, // Trading Bot — deep green
      { bg:[2,6,28],   blobs:[[0,60,200],[0,100,180],[0,50,170],[0,80,210],[0,120,190],[0,55,185]]     }, // Assistant — electric blue
      { bg:[2,18,20],  blobs:[[0,160,160],[0,200,180],[0,140,140],[0,180,165],[0,220,185],[0,150,150]] }, // Store — teal
      { bg:[3,3,20],   blobs:[[10,15,160],[5,20,140],[8,10,130],[15,18,170],[6,22,150],[10,12,140]]    }, // Services — dark void blue
      { bg:[18,3,16],  blobs:[[200,10,140],[160,5,120],[180,8,130],[220,15,150],[170,6,125],[195,10,135]] }, // Testimonials — deep pink
      { bg:[2,16,14],  blobs:[[0,180,130],[0,220,150],[0,160,110],[0,200,140],[0,240,160],[0,170,120]] }, // Process — emerald
      { bg:[8,4,28],   blobs:[[80,20,180],[10,60,160],[60,10,150],[100,30,200],[15,80,180],[60,15,160]] }, // Contact — back to purple
    ];

    // Current ambient color (lerps toward target)
    const ambient = { r: 8, g: 4, b: 28 };

    // ── Nebula blobs ────────────────────────────────────────────────────────
    const blobs = [
      { x:W*0.15, y:H*0.08, r:700, color:[80,20,180],  vx:0.12, vy:0.08, a:0.13 },
      { x:W*0.80, y:H*0.15, r:580, color:[10,60,160],  vx:-0.10,vy:0.12, a:0.11 },
      { x:W*0.45, y:H*0.38, r:760, color:[60,10,150],  vx:0.07, vy:-0.09,a:0.10 },
      { x:W*0.10, y:H*0.62, r:600, color:[100,30,200], vx:0.11, vy:0.07, a:0.11 },
      { x:W*0.88, y:H*0.70, r:540, color:[15,80,180],  vx:-0.08,vy:-0.11,a:0.10 },
      { x:W*0.42, y:H*0.90, r:620, color:[60,15,160],  vx:0.09, vy:0.06, a:0.12 },
    ];

    // ── Stars — three depth layers ──────────────────────────────────────────
    const makeStars = (count, rMin, rMax, opMin, opMax, speedMin, speedMax) =>
      Array.from({ length: count }, () => ({
        x:       Math.random() * W,
        y:       Math.random() * H,
        vx:      (Math.random() - 0.5) * 0.06,
        vy:      (Math.random() - 0.5) * 0.06,
        r:       Math.random() * (rMax - rMin) + rMin,
        opacity: Math.random() * (opMax - opMin) + opMin,
        phase:   Math.random() * Math.PI * 2,
        speed:   Math.random() * (speedMax - speedMin) + speedMin,
      }));

    const distantStars = makeStars(200, 0.2, 0.6,  0.40, 0.75, 0.3, 1.0);
    const midStars = makeStars(90,  0.4, 1.0,  0.55, 0.85, 0.6, 1.8);
    const closeStars = makeStars(35,  0.8, 1.8,  0.70, 1.00, 1.0, 2.8);

    const MOUSE_DIST  = 160;
    const MOUSE_FORCE = 0.05;
    const SPEED_CAP   = 1.5;
    const LERP        = 0.03;

    const onScroll = () => {
      const s = window.scrollY * 0.025;
      blobs.forEach((b, i) => { b._scrollOffset = s * (i % 2 === 0 ? 1 : -0.5); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      setSize();
      [...distantStars, ...midStars, ...closeStars].forEach(p => {
        p.x = Math.random() * W; p.y = Math.random() * H;
      });
    };
    window.addEventListener('resize', onResize);

    let t = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.010;

      // Scroll → atmosphere index
      const pageHeight     = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = pageHeight > 0 ? Math.min(window.scrollY / pageHeight, 1) : 0;
      const atmCount       = ATMOSPHERES.length;
      const rawIndex       = scrollProgress * (atmCount - 1);
      const atmIndex       = Math.min(Math.floor(rawIndex), atmCount - 2);
      const atmFrac        = rawIndex - atmIndex;
      const atmA           = ATMOSPHERES[atmIndex];
      const atmB           = ATMOSPHERES[atmIndex + 1];

      // Lerp ambient bg color
      const targetR = atmA.bg[0] + (atmB.bg[0] - atmA.bg[0]) * atmFrac;
      const targetG = atmA.bg[1] + (atmB.bg[1] - atmA.bg[1]) * atmFrac;
      const targetB = atmA.bg[2] + (atmB.bg[2] - atmA.bg[2]) * atmFrac;
      ambient.r += (targetR - ambient.r) * LERP;
      ambient.g += (targetG - ambient.g) * LERP;
      ambient.b += (targetB - ambient.b) * LERP;

      // Lerp blob colors
      blobs.forEach((b, i) => {
        const tgt = [
          atmA.blobs[i][0] + (atmB.blobs[i][0] - atmA.blobs[i][0]) * atmFrac,
          atmA.blobs[i][1] + (atmB.blobs[i][1] - atmA.blobs[i][1]) * atmFrac,
          atmA.blobs[i][2] + (atmB.blobs[i][2] - atmA.blobs[i][2]) * atmFrac,
        ];
        b.color[0] += (tgt[0] - b.color[0]) * LERP;
        b.color[1] += (tgt[1] - b.color[1]) * LERP;
        b.color[2] += (tgt[2] - b.color[2]) * LERP;
      });

      // ── Draw background with ambient tint ─────────────────────────────────
      // Base near-black + ambient color wash
      ctx.fillStyle = `rgb(${ambient.r|0},${ambient.g|0},${ambient.b|0})`;
      ctx.fillRect(0, 0, W, H);

      // Vignette — darkens edges, keeps centre lit by ambient
      const vignette = ctx.createRadialGradient(W/2, H*0.4, 0, W/2, H*0.4, Math.max(W, H) * 0.75);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      // ── Nebula blobs ───────────────────────────────────────────────────────
      blobs.forEach((b, i) => {
        b.x += b.vx;
        b.y += b.vy;
        const floatY = Math.sin(t * 0.5 + i * 1.3) * 25;
        const floatX = Math.cos(t * 0.35 + i * 0.9) * 18;
        if (b.x < -b.r || b.x > W + b.r) b.vx *= -1;
        if (b.y < -b.r || b.y > H + b.r) b.vy *= -1;
        const drawX = b.x + floatX;
        const drawY = b.y + floatY + (b._scrollOffset || 0);
        const [r, g, bl] = b.color;
        const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, b.r);
        grad.addColorStop(0,    `rgba(${r|0},${g|0},${bl|0},${b.a})`);
        grad.addColorStop(0.45, `rgba(${r|0},${g|0},${bl|0},${b.a * 0.45})`);
        grad.addColorStop(0.8,  `rgba(${r|0},${g|0},${bl|0},${b.a * 0.1})`);
        grad.addColorStop(1,    `rgba(${r|0},${g|0},${bl|0},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Stars ──────────────────────────────────────────────────────────────
      const drawStar = (s, glowMult, coreColor) => {
        const tw = s.opacity * (0.2 + 0.8 * Math.abs(Math.sin(t * s.speed + s.phase)));
        if (glowMult > 0) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * glowMult);
          glow.addColorStop(0, `rgba(190,200,255,${tw * 0.3})`);
          glow.addColorStop(1, `rgba(190,200,255,0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * glowMult, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${coreColor},${tw})`;
        ctx.fill();
      };

      distantStars.forEach(s => drawStar(s, 0, '200,208,255'));
      midStars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        drawStar(s, 4, '215,222,255');
      });
      closeStars.forEach(s => {
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const str = (1 - dist/MOUSE_DIST) * MOUSE_FORCE;
          s.vx += (dx/dist)*str; s.vy += (dy/dist)*str;
        }
        const spd = Math.sqrt(s.vx*s.vx + s.vy*s.vy);
        if (spd > SPEED_CAP) { s.vx=(s.vx/spd)*SPEED_CAP; s.vy=(s.vy/spd)*SPEED_CAP; }
        s.vx *= 0.97; s.vy *= 0.97;
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        drawStar(s, 6, '235,240,255');
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
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
