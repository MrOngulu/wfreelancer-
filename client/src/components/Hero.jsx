import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BtnPrimary, BtnGhost, ease } from './ui';

// ─── Three.js background canvas ───────────────────────────────────────────────
function ThreeBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let THREE, renderer, scene, camera, animId;
    let objects = [];
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    import('three').then((mod) => {
      THREE = mod;
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 6;
      const ambient = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambient);
      const purple = new THREE.PointLight(0x7b68ee, 3, 20);
      purple.position.set(3, 3, 3);
      scene.add(purple);
      const teal = new THREE.PointLight(0x1de9b6, 2, 20);
      teal.position.set(-3, -2, 2);
      scene.add(teal);
      const geometries = [
        new THREE.IcosahedronGeometry(0.5, 0), new THREE.OctahedronGeometry(0.45, 0),
        new THREE.TetrahedronGeometry(0.45, 0), new THREE.IcosahedronGeometry(0.3, 0),
        new THREE.OctahedronGeometry(0.35, 0), new THREE.IcosahedronGeometry(0.25, 0),
        new THREE.TetrahedronGeometry(0.3, 0), new THREE.OctahedronGeometry(0.2, 0),
      ];
      const matOptions = [
        { color: 0x7b68ee, emissive: 0x3a2f88, wireframe: false },
        { color: 0x1de9b6, emissive: 0x0a6b50, wireframe: false },
        { color: 0x9c8ff5, emissive: 0x4a3fa0, wireframe: false },
        { color: 0x7b68ee, wireframe: true }, { color: 0x1de9b6, wireframe: true },
      ];
      const positions = [
        [-4,2,-2],[4,1,-3],[-3,-2,-1],[3,-1,-2],[0,3,-3],[-5,0,-2],[5,-2,-3],[1,-3,-1],
      ];
      geometries.forEach((geo, i) => {
        const opt = matOptions[i % matOptions.length];
        const mat = opt.wireframe
          ? new THREE.MeshBasicMaterial({ color: opt.color, wireframe: true, opacity: 0.25, transparent: true })
          : new THREE.MeshPhongMaterial({ color: opt.color, emissive: opt.emissive, shininess: 80, opacity: 0.7, transparent: true });
        const mesh = new THREE.Mesh(geo, mat);
        const pos = positions[i];
        mesh.position.set(pos[0], pos[1], pos[2]);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        const speed = 0.003 + Math.random() * 0.004;
        const floatAmp = 0.15 + Math.random() * 0.2;
        const floatOffset = Math.random() * Math.PI * 2;
        objects.push({ mesh, speed, floatAmp, floatOffset, baseY: pos[1] });
        scene.add(mesh);
      });
      const particleCount = 120;
      const pGeo = new THREE.BufferGeometry();
      const positions3 = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions3[i*3] = (Math.random()-0.5)*20;
        positions3[i*3+1] = (Math.random()-0.5)*12;
        positions3[i*3+2] = (Math.random()-0.5)*8-3;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions3, 3));
      const pMat = new THREE.PointsMaterial({ color: 0x7b68ee, size: 0.025, opacity: 0.5, transparent: true });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);
      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.01;
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;
        scene.rotation.y = mouse.x * 0.08;
        scene.rotation.x = mouse.y * 0.05;
        objects.forEach(obj => {
          obj.mesh.rotation.x += obj.speed;
          obj.mesh.rotation.y += obj.speed * 0.7;
          obj.mesh.position.y = obj.baseY + Math.sin(t + obj.floatOffset) * obj.floatAmp;
        });
        particles.rotation.y = t * 0.02;
        renderer.render(scene, camera);
      };
      animate();
      return () => window.removeEventListener('resize', onResize);
    }).catch(() => {});
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animId) cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
    };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

// ─── TiltCard ─────────────────────────────────────────────────────────────────
function TiltCard({ onBuy }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
    const dy = (e.clientY - rect.top - rect.height/2) / (rect.height/2);
    setTilt({ x: dy * -12, y: dx * 12 });
  };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ delay: 0.7, duration: 1.1, ease }}
      style={{ perspective: 1000, width: '100%', zIndex: 1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.6s ease',
          transformStyle: 'preserve-3d', borderRadius: 24, overflow: 'hidden',
          background: 'linear-gradient(160deg,rgba(123,104,238,0.12),rgba(255,255,255,0.03))',
          border: '1px solid rgba(123,104,238,0.3)',
          boxShadow: hovered
            ? '0 60px 120px rgba(0,0,0,0.7), 0 0 60px rgba(123,104,238,0.2)'
            : '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(123,104,238,0.1)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 24,
          background: hovered
            ? `radial-gradient(circle at ${50+tilt.y*2}% ${50+tilt.x*2}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            : 'none',
          transition: 'background 0.1s', zIndex: 10,
        }} />
        <div style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)',
          padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginLeft: 'auto' }}>
            wf-trading-bot v2.1 · live
          </span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)',
            boxShadow: '0 0 8px var(--green)', flexShrink: 0 }} />
        </div>
        <div style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>AI Product</p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--white)' }}>WF Trading Bot</h3>
            </div>
            <span style={{ background: 'var(--green-dim)', color: 'var(--green)', border: '1px solid rgba(29,233,182,0.2)',
              fontSize: '0.65rem', fontFamily: 'var(--mono)', fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: 100, flexShrink: 0 }}>
              +12.4% today
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.625rem', marginBottom: '1rem' }}>
            {[['87%','Win rate'],['24/7','Active'],['0.3s','Execute']].map(([v,l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '0.75rem', textAlign: 'center', transform: 'translateZ(20px)' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--green)' }}>{v}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--muted)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 56, background: 'rgba(255,255,255,0.03)', borderRadius: 10, marginBottom: '1rem', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 300 56" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1de9b6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1de9b6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="0,56 0,46 30,36 60,38 90,26 120,28 150,16 180,14 210,20 240,8 270,6 300,2 300,56" fill="url(#chartGrad)" />
              <polyline points="0,46 30,36 60,38 90,26 120,28 150,16 180,14 210,20 240,8 270,6 300,2"
                fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--white)' }}>$30</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginLeft: 4 }}>/ month</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(123,104,238,0.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onBuy('WF AI Trading Bot','Automated ML-powered trading bot.',30)}
              style={{ background: 'linear-gradient(135deg,var(--ai),#6a5acd)', color: '#fff',
                padding: '0.5rem 1.1rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700,
                border: 'none', cursor: 'pointer', boxShadow: '0 0 20px var(--ai-glow)' }}
            >Buy now</motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Parallax orbs ────────────────────────────────────────────────────────────
function ParallaxOrbs() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX/window.innerWidth - 0.5, y: e.clientY/window.innerHeight - 0.5 });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  const orbs = [
    { size: 700, x: '62%', y: '8%', color: 'rgba(123,104,238,0.07)', depth: 0.03 },
    { size: 400, x: '8%', y: '65%', color: 'rgba(29,233,182,0.05)', depth: 0.06 },
    { size: 300, x: '80%', y: '72%', color: 'rgba(123,104,238,0.05)', depth: 0.04 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {orbs.map((orb, i) => (
        <div key={i} style={{
          position: 'absolute', left: orb.x, top: orb.y,
          width: orb.size, height: orb.size, borderRadius: '50%',
          background: `radial-gradient(ellipse, ${orb.color} 0%, transparent 70%)`,
          transform: `translate(-50%,-50%) translate(${mouse.x*orb.depth*1000}px,${mouse.y*orb.depth*1000}px)`,
          transition: 'transform 0.15s ease-out',
        }} />
      ))}
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const end = parseInt(target.replace(/\D/g, '')) || 0;
        const step = end / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { val: '50', suffix: '+', label: 'Projects delivered' },
  { val: '199', prefix: '$', label: 'Starting price' },
  { val: '3', suffix: ' countries', label: 'Clients across Africa' },
];

const LINES = [
  { text: 'Build faster.',        gradient: false },
  { text: 'Scale smarter.',       gradient: true  },
  { text: 'Automate everything.', gradient: false },
];

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero({ onBuy }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '8rem 2.5rem 6rem', position: 'relative', overflow: 'hidden',
    }}>
      <ThreeBackground />
      <ParallaxOrbs />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%,black 20%,transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%,black 20%,transparent 75%)',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(transparent,var(--bg))', pointerEvents: 'none', zIndex: 2,
      }} />

      <motion.div style={{ y, opacity, maxWidth: 1140, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}
        className="hero-grid">

        {/* Left column */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(123,104,238,0.1)', border: '1px solid rgba(123,104,238,0.25)',
              padding: '0.3rem 0.9rem', borderRadius: 100,
              fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--ai3)',
              marginBottom: '2rem',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: 'var(--ai2)',
                boxShadow: '0 0 8px var(--ai)', flexShrink: 0, animation: 'pulse 2s infinite',
              }} />
              AI-powered software · Made in Africa
            </div>
          </motion.div>

          {/* Headline — each line slides up independently */}
          <div style={{ marginBottom: '1.5rem' }}>
            {LINES.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.75, ease }}
                  style={{
                    fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: '-0.05em',
                    margin: 0,
                    color: 'var(--white)',
                    ...(line.gradient ? {
                      background: 'linear-gradient(135deg, var(--ai2), var(--ai3))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    } : {}),
                  }}
                >
                  {line.text}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease }}
            style={{ fontSize: '1.05rem', color: 'var(--muted2)', fontWeight: 400, maxWidth: 440, marginBottom: '2.25rem', lineHeight: 1.75 }}
          >
            AI trading bots, intelligent assistants, website templates, and mobile apps — ready to deploy or custom-built for your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            <BtnPrimary onClick={() => scrollTo('#products')}>Explore products ↓</BtnPrimary>
            <BtnGhost onClick={() => scrollTo('#contact')}>Custom project →</BtnGhost>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ display: 'flex', gap: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}
          >
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.08, duration: 0.6, ease }}
              >
                <div style={{ fontSize: '1.7rem', fontWeight: 900, fontFamily: 'var(--mono)', letterSpacing: '-0.04em', color: 'var(--white)' }}>
                  {s.prefix || ''}<Counter target={s.val} />{s.suffix || ''}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 2 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D tilt card */}
        <TiltCard onBuy={onBuy} />
      </motion.div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        @media(max-width:900px){
          .hero-grid { grid-template-columns:1fr !important; gap:3rem !important; }
          #home { padding:8rem 2rem 5rem !important; }
        }
        @media(max-width:600px){
          #home { padding:7rem 1.25rem 4rem !important; }
        }
      `}</style>
    </section>
  );
}