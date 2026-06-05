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

    // ── Nebula palettes — each is a region of space ─────────────────────────
    // Colors reference real nebula photography:
    // Pillars of Creation, Crab Nebula, Orion, Eagle, Helix, Horsehead
    const NEBULA_PALETTES = [
      // Hero — deep purple
      [[80,20,180],[10,60,160],[60,10,150],[100,30,200],[15,80,180],[60,15,160]],
      // Narrative — bright teal/cyan
      [[0,160,180],[0,200,200],[0,140,160],[0,180,190],[0,220,210],[0,150,170]],
      // Featured Products — violet/magenta
      [[160,20,200],[120,10,180],[140,15,190],[180,25,210],[130,12,185],[155,18,195]],
      // Trading Bot — strong green
      [[0,180,80],[0,220,100],[0,160,60],[0,200,90],[0,240,110],[0,170,70]],
      // Assistant — electric blue
      [[0,80,220],[0,120,200],[0,60,190],[0,100,230],[0,140,210],[0,70,200]],
      // Store — warm orange/red nebula
      [[200,80,20],[180,60,10],[190,70,15],[220,90,25],[185,65,12],[195,75,18]],
      // Services — cold deep blue
      [[10,20,180],[5,30,160],[8,15,150],[15,25,190],[6,35,170],[10,18,160]],
      // Testimonials — hot pink/magenta
      [[220,10,140],[180,5,120],[200,8,130],[240,15,150],[190,6,125],[210,10,135]],
      // Process — bright teal/green
      [[0,200,150],[0,230,170],[0,180,130],[0,210,160],[0,250,180],[0,190,140]],
      // Contact — back to purple
      [[80,20,180],[10,60,160],[60,10,150],[100,30,200],[15,80,180],[60,15,160]],
    ];
    // ── Nebula blobs — 6 large soft clouds ─────────────────────────────────
    const blobs = [
      { x: W*0.15, y: H*0.08, r: 750, color:[60,20,140],  vx:0.14, vy:0.09, a:0.14 },
      { x: W*0.80, y: H*0.15, r: 620, color:[10,60,180],  vx:-0.11,vy:0.13, a:0.12 },
      { x: W*0.45, y: H*0.38, r: 800, color:[40,10,120],  vx:0.08, vy:-0.10,a:0.10 },
      { x: W*0.10, y: H*0.62, r: 640, color:[80,30,160],  vx:0.13, vy:0.08, a:0.12 },
      { x: W*0.88, y: H*0.70, r: 580, color:[15,80,200],  vx:-0.09,vy:-0.12,a:0.11 },
      { x: W*0.42, y: H*0.90, r: 660, color:[50,15,130],  vx:0.10, vy:0.07, a:0.13 },
    ];

    // ── Stars — three layers: distant, mid, close ────────────────────────────
    // Distant — tiny, barely visible, don't move
    const DISTANT_COUNT = 220;
    const distantStars = Array.from({ length: DISTANT_COUNT }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      r:       Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.35 + 0.1,
      phase:   Math.random() * Math.PI * 2,
      speed:   Math.random() * 0.8 + 0.4,
    }));

    // Mid — medium, gentle drift, subtle twinkle
    const MID_COUNT = 100;
    const midStars = Array.from({ length: MID_COUNT }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      vx:      (Math.random() - 0.5) * 0.08,
      vy:      (Math.random() - 0.5) * 0.08,
      r:       Math.random() * 0.9 + 0.4,
      opacity: Math.random() * 0.45 + 0.25,
      phase:   Math.random() * Math.PI * 2,
      speed:   Math.random() * 1.5 + 0.8,
    }));

    // Close — larger, brighter, move slightly, react to mouse
    const CLOSE_COUNT = 40;
    const closeStars = Array.from({ length: CLOSE_COUNT }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      vx:      (Math.random() - 0.5) * 0.18,
      vy:      (Math.random() - 0.5) * 0.18,
      r:       Math.random() * 1.6 + 0.8,
      opacity: Math.random() * 0.5 + 0.45,
      phase:   Math.random() * Math.PI * 2,
      speed:   Math.random() * 2.5 + 1.2,
    }));

    const MOUSE_DIST  = 180;
    const MOUSE_FORCE = 0.06;
    const SPEED_CAP   = 1.8;
    const COLOR_LERP  = 0.025;

    const onScroll = () => {
      const s = window.scrollY * 0.03;
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
        p.x = Math.random() * W;
        p.y = Math.random() * H;
      });
    };
    window.addEventListener('resize', onResize);

    // ── Draw ─────────────────────────────────────────────────────────────────
    let t = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.010;

      // Scroll → palette
      const pageHeight     = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = pageHeight > 0 ? Math.min(window.scrollY / pageHeight, 1) : 0;
      const paletteCount   = NEBULA_PALETTES.length;
      const rawIndex       = scrollProgress * (paletteCount - 1);
      const palIndex       = Math.min(Math.floor(rawIndex), paletteCount - 2);
      const palFrac        = rawIndex - palIndex;
      const palA           = NEBULA_PALETTES[palIndex];
      const palB           = NEBULA_PALETTES[palIndex + 1];

      // Lerp blob colors
      blobs.forEach((b, i) => {
        const target = [
          palA[i][0] + (palB[i][0] - palA[i][0]) * palFrac,
          palA[i][1] + (palB[i][1] - palA[i][1]) * palFrac,
          palA[i][2] + (palB[i][2] - palA[i][2]) * palFrac,
        ];
        b.color[0] += (target[0] - b.color[0]) * COLOR_LERP;
        b.color[1] += (target[1] - b.color[1]) * COLOR_LERP;
        b.color[2] += (target[2] - b.color[2]) * COLOR_LERP;
      });

      // Background
      ctx.fillStyle = '#03030a';
      ctx.fillRect(0, 0, W, H);

      // Nebula blobs
      blobs.forEach((b, i) => {
        b.x += b.vx;
        b.y += b.vy;
        const floatY = Math.sin(t * 0.6 + i * 1.3) * 30;
        const floatX = Math.cos(t * 0.4 + i * 0.9) * 22;
        if (b.x < -b.r || b.x > W + b.r) b.vx *= -1;
        if (b.y < -b.r || b.y > H + b.r) b.vy *= -1;
        const drawX = b.x + floatX;
        const drawY = b.y + floatY + (b._scrollOffset || 0);
        const [r, g, bl] = b.color;
        const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, b.r);
        grad.addColorStop(0,    `rgba(${r|0},${g|0},${bl|0},${b.a})`);
        grad.addColorStop(0.4,  `rgba(${r|0},${g|0},${bl|0},${b.a * 0.5})`);
        grad.addColorStop(0.75, `rgba(${r|0},${g|0},${bl|0},${b.a * 0.15})`);
        grad.addColorStop(1,    `rgba(${r|0},${g|0},${bl|0},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Distant stars — fixed, pure twinkle ─────────────────────────────
      distantStars.forEach(s => {
        const tw = s.opacity * (0.2 + 0.8 * Math.abs(Math.sin(t * s.speed + s.phase)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,210,255,${tw})`;
        ctx.fill();
      });

      // ── Mid stars — slow drift, twinkle ─────────────────────────────────
      midStars.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;
        const tw = s.opacity * (0.25 + 0.75 * Math.abs(Math.sin(t * s.speed + s.phase)));
        // Soft glow
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        glow.addColorStop(0, `rgba(180,190,255,${tw * 0.3})`);
        glow.addColorStop(1, `rgba(180,190,255,0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215,220,255,${tw})`;
        ctx.fill();
      });

      // ── Close stars — brighter, mouse reactive ───────────────────────────
      closeStars.forEach(s => {
        // Mouse pull
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const strength = (1 - dist / MOUSE_DIST) * MOUSE_FORCE;
          s.vx += (dx / dist) * strength;
          s.vy += (dy / dist) * strength;
        }
        const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (speed > SPEED_CAP) { s.vx = (s.vx / speed) * SPEED_CAP; s.vy = (s.vy / speed) * SPEED_CAP; }
        s.vx *= 0.97;
        s.vy *= 0.97;
        s.x  += s.vx;
        s.y  += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        const tw = s.opacity * (0.3 + 0.9 * Math.abs(Math.sin(t * s.speed + s.phase)));

        // Larger glow for close stars
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
        glow.addColorStop(0, `rgba(200,210,255,${tw * 0.4})`);
        glow.addColorStop(1, `rgba(200,210,255,0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235,240,255,${tw})`;
        ctx.fill();
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
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
