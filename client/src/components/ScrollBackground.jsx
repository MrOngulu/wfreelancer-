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

    // ── Section color palettes ──────────────────────────────────────────────
    // Each entry is [blob0color, blob1color, blob2color, blob3color, blob4color, blob5color]
    const SECTION_PALETTES = [
      // Hero — purple / teal
      [[90,60,220],[20,200,160],[60,40,180],[110,60,240],[15,210,170],[70,45,200]],
      // Narrative — deep indigo / ice blue
      [[30,20,180],[0,100,220],[20,10,160],[50,30,200],[10,120,230],[30,15,170]],
      // Featured Products — bright violet
      [[160,60,240],[60,80,220],[120,40,210],[170,70,250],[50,90,210],[140,55,220]],
      // Trading Bot — strong green
      [[10,180,80],[0,220,120],[10,150,60],[20,200,90],[0,230,130],[10,160,70]],
      // Assistant — electric blue
      [[20,80,240],[0,160,220],[15,60,210],[30,90,250],[10,170,230],[20,70,220]],
      // Store — cyan / teal
      [[0,200,180],[0,230,190],[10,180,160],[20,210,185],[0,240,195],[10,190,170]],
      // Services — dark royal blue
      [[20,30,210],[5,50,190],[15,20,180],[30,40,220],[10,60,200],[20,25,200]],
      // Testimonials — magenta / pink purple
      [[190,30,200],[140,10,180],[160,20,190],[200,40,210],[150,15,185],[180,25,195]],
      // Process — emerald green
      [[10,180,110],[0,210,130],[8,160,100],[15,190,120],[5,220,135],[10,170,105]],
      // Contact — back to purple / teal
      [[90,60,220],[20,200,160],[60,40,180],[110,60,240],[15,210,170],[70,45,200]],
    ];

    // ── Gradient blobs ──────────────────────────────────────────────────────
    const blobs = [
      { x: W*0.15, y: H*0.08, r:620, color:[90,60,200],  vx:0.18,  vy:0.12,  a:0.12 },
      { x: W*0.80, y: H*0.12, r:500, color:[20,180,160], vx:-0.14, vy:0.16,  a:0.10 },
      { x: W*0.50, y: H*0.40, r:680, color:[60,40,160],  vx:0.10,  vy:-0.13, a:0.10 },
      { x: W*0.10, y: H*0.65, r:520, color:[100,60,220], vx:0.16,  vy:0.10,  a:0.10 },
      { x: W*0.85, y: H*0.72, r:460, color:[15,200,170], vx:-0.12, vy:-0.15, a:0.10 },
      { x: W*0.40, y: H*0.88, r:540, color:[70,45,180],  vx:0.13,  vy:0.09,  a:0.10 },
    ];

    // ── Particles ───────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 160;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      vx:      (Math.random() - 0.5) * 0.5,
      vy:      (Math.random() - 0.5) * 0.5,
      r:       Math.random() * 1.2 + 0.5,
      opacity: Math.random() * 0.5 + 0.35,
    }));

    const MOUSE_DIST  = 200;
    const MOUSE_FORCE = 0.08;
    const SPEED_CAP   = 2.2;
    const COLOR_LERP  = 0.035;   // how fast colors transition

    const onScroll = () => {
      const s = window.scrollY * 0.04;
      blobs.forEach((b, i) => { b._scrollOffset = s * (i % 2 === 0 ? 1 : -0.6); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      setSize();
      particles.forEach(p => { p.x = Math.random() * W; p.y = Math.random() * H; });
    };
    window.addEventListener('resize', onResize);

    // ── Draw loop ────────────────────────────────────────────────────────────
    let t = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.012;

      // Work out which section palette to use based on scroll progress
      const pageHeight     = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = pageHeight > 0 ? Math.min(window.scrollY / pageHeight, 1) : 0;
      const paletteCount   = SECTION_PALETTES.length;
      const rawIndex       = scrollProgress * (paletteCount - 1);
      const palIndex       = Math.floor(rawIndex);
      const palFrac        = rawIndex - palIndex;
      const palA           = SECTION_PALETTES[Math.min(palIndex,     paletteCount - 1)];
      const palB           = SECTION_PALETTES[Math.min(palIndex + 1, paletteCount - 1)];

      // Lerp blob colors toward target
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

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#04040a';
      ctx.fillRect(0, 0, W, H);

      // Blobs
      blobs.forEach((b, i) => {
        b.x += b.vx;
        b.y += b.vy;
        const floatY = Math.sin(t + i * 1.3) * 28;
        const floatX = Math.cos(t * 0.7 + i * 0.9) * 20;
        if (b.x < -b.r || b.x > W + b.r) b.vx *= -1;
        if (b.y < -b.r || b.y > H + b.r) b.vy *= -1;
        const drawX = b.x + floatX;
        const drawY = b.y + floatY + (b._scrollOffset || 0);
        const [r, g, bl] = b.color;
        const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, b.r);
        grad.addColorStop(0,   `rgba(${r|0},${g|0},${bl|0},${b.a})`);
        grad.addColorStop(0.5, `rgba(${r|0},${g|0},${bl|0},${b.a * 0.4})`);
        grad.addColorStop(1,   `rgba(${r|0},${g|0},${bl|0},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Particles
      particles.forEach(p => {
        const dx   = mouse.x - p.x;
        const dy   = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_DIST && dist > 0) {
          const strength = (1 - dist / MOUSE_DIST) * MOUSE_FORCE;
          p.vx += (dx / dist) * strength;
          p.vy += (dy / dist) * strength;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > SPEED_CAP) {
          p.vx = (p.vx / speed) * SPEED_CAP;
          p.vy = (p.vy / speed) * SPEED_CAP;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x  += p.vx;
        p.y  += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Twinkle
        const twinkle = p.opacity * (0.3 + 0.9 * Math.abs(Math.sin(t * 3 + p.x * 0.01)));

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        glow.addColorStop(0, `rgba(180,160,255,${twinkle * 0.35})`);
        glow.addColorStop(1, `rgba(180,160,255,0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,225,255,${twinkle})`;
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
