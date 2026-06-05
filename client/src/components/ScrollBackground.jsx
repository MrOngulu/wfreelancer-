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
    const ATMOSPHERES = [
      { bg:[8,4,28],   blobs:[[80,20,180],[10,60,160],[60,10,150],[100,30,200],[15,80,180],[60,15,160]] },
      { bg:[3,8,28],   blobs:[[10,40,160],[0,80,180],[8,30,140],[15,55,170],[5,90,190],[8,35,150]]     },
      { bg:[14,4,28],  blobs:[[140,20,200],[100,10,180],[120,15,190],[160,25,210],[110,12,185],[135,18,195]] },
      { bg:[2,14,10],  blobs:[[0,160,80],[0,200,100],[0,140,60],[0,180,90],[0,220,110],[0,150,70]]     },
      { bg:[2,6,28],   blobs:[[0,60,200],[0,100,180],[0,50,170],[0,80,210],[0,120,190],[0,55,185]]     },
      { bg:[2,18,20],  blobs:[[0,160,160],[0,200,180],[0,140,140],[0,180,165],[0,220,185],[0,150,150]] },
      { bg:[3,3,20],   blobs:[[10,15,160],[5,20,140],[8,10,130],[15,18,170],[6,22,150],[10,12,140]]    },
      { bg:[18,3,16],  blobs:[[200,10,140],[160,5,120],[180,8,130],[220,15,150],[170,6,125],[195,10,135]] },
      { bg:[2,16,14],  blobs:[[0,180,130],[0,220,150],[0,160,110],[0,200,140],[0,240,160],[0,170,120]] },
      { bg:[8,4,28],   blobs:[[80,20,180],[10,60,160],[60,10,150],[100,30,200],[15,80,180],[60,15,160]] },
    ];

    const ambient = { r: 8, g: 4, b: 28 };
    const LERP = 0.03;

    // ── Natural star clustering helper ──────────────────────────────────────
    // Mixes pure random positions with clustered ones for organic distribution
    const clusterCentres = Array.from({ length: 12 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
    }));

    const clusteredPos = (clusterStrength = 0.4) => {
      if (Math.random() < clusterStrength) {
        // Near a random cluster centre with gaussian-ish spread
        const c = clusterCentres[Math.floor(Math.random() * clusterCentres.length)];
        const spread = Math.min(W, H) * 0.12;
        return {
          x: Math.max(0, Math.min(W, c.x + (Math.random() - 0.5) * spread * 2)),
          y: Math.max(0, Math.min(H, c.y + (Math.random() - 0.5) * spread * 2)),
        };
      }
      return { x: Math.random() * W, y: Math.random() * H };
    };

    // ── Stars — three depth layers ──────────────────────────────────────────
    // Crisp, sharp stars — no glow halos, natural clustering, subtle twinkle
    const makeStars = (count, rMin, rMax, opMin, opMax, speedMin, speedMax, drift, cluster) =>
      Array.from({ length: count }, () => {
        const pos = clusteredPos(cluster);
        return {
          x:       pos.x,
          y:       pos.y,
          vx:      (Math.random() - 0.5) * drift,
          vy:      (Math.random() - 0.5) * drift,
          r:       Math.random() * (rMax - rMin) + rMin,
          // Base opacity — varies for natural brightness variation
          opacity: Math.random() * (opMax - opMin) + opMin,
          phase:   Math.random() * Math.PI * 2,
          // Twinkle speed — slow and subtle
          speed:   Math.random() * (speedMax - speedMin) + speedMin,
        };
      });

    // Distant: tiny 1px crisp dots, very subtle twinkle, stationary
    const distantStars = makeStars(600, 0.3, 0.7,  0.15, 0.55, 0.15, 0.4,  0.0,  0.45);
    // Mid: slightly larger, very slow drift, minimal twinkle
    const midStars     = makeStars(180,  0.5, 1.1,  0.30, 0.65, 0.12, 0.35, 0.04, 0.3);
    // Close: brightest, mouse reactive, still crisp (no glow)
    const closeStars   = makeStars(60,  0.9, 1.6,  0.50, 0.85, 0.10, 0.28, 0.08, 0.2);

    const MOUSE_DIST  = 160;
    const MOUSE_FORCE = 0.05;
    const SPEED_CAP   = 1.5;

    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      setSize();
      // Regenerate cluster centres for new size
      clusterCentres.forEach(c => {
        c.x = Math.random() * W;
        c.y = Math.random() * H;
      });
      [...distantStars, ...midStars, ...closeStars].forEach(p => {
        const pos = clusteredPos(0.3);
        p.x = pos.x; p.y = pos.y;
      });
    };
    window.addEventListener('resize', onResize);

    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      t += 0.008; // slightly slower tick for more subtle animation

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

      // Vignette — darkens edges
      const vignette = ctx.createRadialGradient(W/2, H*0.4, 0, W/2, H*0.4, Math.max(W, H) * 0.75);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      // ── Star draw — crisp dot only, no glow, subtle opacity twinkle ────────
      const drawStar = (s, coreColor) => {
        // Very subtle twinkle — just a small opacity pulse, no size change
        const twinkleFactor = 0.85 + 0.15 * Math.abs(Math.sin(t * s.speed + s.phase));
        const alpha = s.opacity * twinkleFactor;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${coreColor},${alpha})`;
        ctx.fill();
      };

      // Distant — fully static, pure crisp dots
      distantStars.forEach(s => drawStar(s, '220,225,255'));

      // Mid — very slow drift
      midStars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        drawStar(s, '230,235,255');
      });

      // Close — mouse attraction, slightly brighter whites
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
        drawStar(s, '245,248,255');
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
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
