import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BtnPrimary, BtnGhost, ease } from './ui';

// ─── Animated word-flip headline ─────────────────────────────────────────────
const LINES = [
  'Build faster.',
  'Scale smarter.',
  'Automate everything.',
];

function AnimatedHero() {
  const [lineIdx, setLineIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setLineIdx(i => (i + 1) % LINES.length);
        setVisible(true);
      }, 420);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div style={{ overflow: 'hidden', height: 'clamp(3.2rem, 7vw, 6.4rem)', display: 'flex', alignItems: 'center' }}>
      <motion.span
        key={lineIdx}
        initial={{ y: 56, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: -48, opacity: 0 }}
        transition={{ duration: 0.55, ease }}
        style={{
          display: 'block',
          fontSize: 'clamp(3.2rem, 7vw, 6.4rem)',
          fontWeight: 900,
          letterSpacing: '-0.055em',
          lineHeight: 1,
          background: lineIdx === 1
            ? 'linear-gradient(135deg, var(--ai2) 0%, var(--ai3) 100%)'
            : lineIdx === 2
            ? 'linear-gradient(135deg, var(--green) 0%, var(--ai2) 100%)'
            : 'var(--white)',
          WebkitBackgroundClip: lineIdx > 0 ? 'text' : undefined,
          WebkitTextFillColor: lineIdx > 0 ? 'transparent' : undefined,
        }}
      >
        {LINES[lineIdx]}
      </motion.span>
    </div>
  );
}

// ─── Tilt card ────────────────────────────────────────────────────────────────
function TiltCard({ onBuy }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -12, y: dx * 12 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ delay: 0.8, duration: 1.2, ease }}
      style={{ perspective: 1000, width: '100%', zIndex: 1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.7s ease',
          transformStyle: 'preserve-3d',
          borderRadius: 24,
          overflow: 'hidden',
          background: 'linear-gradient(160deg,rgba(123,104,238,0.14),rgba(255,255,255,0.02))',
          border: '1px solid rgba(123,104,238,0.35)',
          boxShadow: hovered
            ? '0 60px 120px rgba(0,0,0,0.7), 0 0 60px rgba(123,104,238,0.25)'
            : '0 40px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Glare */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 24, zIndex: 10,
          background: hovered
            ? `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(255,255,255,0.08) 0%, transparent 55%)`
            : 'none',
          pointerEvents: 'none',
        }} />
        {/* Titlebar */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)',
          padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginLeft: 'auto' }}>
            wf-trading-bot v2.1 · live
          </span>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', flexShrink: 0, animation: 'pulse 2s infinite' }} />
        </div>
        {/* Body */}
        <div style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>AI Product</p>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.025em' }}>WF Trading Bot</h3>
            </div>
            <span style={{
              background: 'var(--green-dim)', color: 'var(--green)',
              border: '1px solid rgba(29,233,182,0.25)',
              fontSize: '0.65rem', fontFamily: 'var(--mono)', fontWeight: 600,
              padding: '0.25rem 0.65rem', borderRadius: 100, flexShrink: 0,
            }}>+12.4% today</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.65rem', marginBottom: '1rem' }}>
            {[['87%','Win rate'],['24/7','Active'],['0.3s','Execute']].map(([v, l]) => (
              <div key={l} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '0.75rem 0.5rem', textAlign: 'center',
                transform: 'translateZ(20px)',
              }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--green)' }}>{v}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--muted)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          {/* Mini chart */}
          <div style={{ height: 56, background: 'rgba(255,255,255,0.03)', borderRadius: 10, marginBottom: '1rem', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 300 56" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1de9b6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1de9b6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="0,56 0,44 30,38 60,40 90,28 120,30 150,18 180,15 210,22 240,10 270,7 300,3 300,56" fill="url(#cg)" />
              <polyline points="0,44 30,38 60,40 90,28 120,30 150,18 180,15 210,22 240,10 270,7 300,3"
                fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--mono)' }}>$299</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginLeft: 5 }}>/ license</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(123,104,238,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBuy('WF AI Trading Bot', 'ML-powered trading bot.', 299)}
              style={{
                background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
                color: '#fff', padding: '0.55rem 1.2rem', borderRadius: 10,
                fontSize: '0.82rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                boxShadow: '0 0 22px var(--ai-glow)',
              }}
            >Buy now</motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const end = parseInt(String(target).replace(/\D/g, '')) || 0;
        const step = end / 45;
        let cur = 0;
        const timer = setInterval(() => {
          cur += step;
          if (cur >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(cur));
        }, 32);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { val: 50, suffix: '+', label: 'Products shipped' },
  { val: 199, prefix: '$', label: 'Starting price' },
  { val: 3,  suffix: ' countries', label: 'Active clients' },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero({ onBuy }) {
  const scrollTo = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center',
      padding: '0 2.5rem',
      position: 'relative',
    }}>
      {/* Bottom fade into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(transparent, rgba(4,4,10,0.4))',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', zIndex: 1 }} className="hero-grid">
        {/* Left */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(123,104,238,0.1)', border: '1px solid rgba(123,104,238,0.28)',
              padding: '0.3rem 0.9rem', borderRadius: 100,
              fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--ai3)',
              marginBottom: '2rem',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--ai2)', boxShadow: '0 0 8px var(--ai)',
                flexShrink: 0, animation: 'pulse 2s infinite',
              }} />
              AI software · Made in Africa
            </div>
          </motion.div>

          {/* Cycling headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <AnimatedHero />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            style={{
              fontSize: '1.1rem', color: 'var(--muted2)',
              fontWeight: 400, lineHeight: 1.85,
              maxWidth: 440, margin: '1.75rem 0 2.25rem',
            }}
          >
            AI trading bots, intelligent assistants, website templates, and mobile apps — ready to deploy or custom-built for your business.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
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
            transition={{ delay: 0.85, duration: 0.8 }}
            style={{
              display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
              paddingTop: '2rem', borderTop: '1px solid var(--border)',
            }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.6, ease }}
              >
                <div style={{
                  fontSize: '1.75rem', fontWeight: 900,
                  fontFamily: 'var(--mono)', letterSpacing: '-0.04em',
                }}>
                  {s.prefix || ''}<Counter target={s.val} suffix={s.suffix || ''} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 3 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Tilt card */}
        <TiltCard onBuy={onBuy} />
      </div>

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
        }
      `}</style>
    </div>
  );
}
