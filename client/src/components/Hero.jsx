import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BtnPrimary, BtnGhost, ease } from './ui';

const LINES = ['Build faster.', 'Scale smarter.', 'Automate everything.'];

function CyclingHeadline() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % LINES.length); setShow(true); }, 400);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const gradients = [
    null,
    'linear-gradient(135deg, var(--ai2) 0%, var(--ai3) 100%)',
    'linear-gradient(135deg, var(--green) 0%, var(--ai2) 100%)',
  ];

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      {/* Static lines */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h1
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
          style={{
            fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
            fontWeight: 900, letterSpacing: '-0.055em',
            lineHeight: 1.0, margin: 0, color: 'var(--white)',
          }}
        >
          The future of
        </motion.h1>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <motion.h1
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.7, ease }}
          style={{
            fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
            fontWeight: 900, letterSpacing: '-0.055em',
            lineHeight: 1.0, margin: 0, color: 'var(--white)',
          }}
        >
          freelancing is
        </motion.h1>
      </div>
      {/* Cycling line */}
      <div style={{
        height: 'clamp(2.8rem, 5.5vw, 5.2rem)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        <motion.h1
          key={idx}
          initial={{ y: '110%' }}
          animate={show ? { y: 0 } : { y: '-110%' }}
          transition={{ duration: 0.45, ease }}
          style={{
            fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
            fontWeight: 900, letterSpacing: '-0.055em',
            lineHeight: 1.0, margin: 0,
            background: gradients[idx] || 'var(--white)',
            WebkitBackgroundClip: gradients[idx] ? 'text' : undefined,
            WebkitTextFillColor: gradients[idx] ? 'transparent' : undefined,
            color: gradients[idx] ? undefined : 'var(--white)',
            whiteSpace: 'nowrap',
          }}
        >
          {LINES[idx]}
        </motion.h1>
      </div>
    </div>
  );
}

function TiltCard({ onBuy }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientY - r.top  - r.height/2) / (r.height/2)) * -10,
      y: ((e.clientX - r.left - r.width/2)  / (r.width/2))  *  10,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 1.0, ease }}
      style={{ perspective: 1000, width: '100%' }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x:0, y:0 }); setHovered(false); }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered?1.02:1})`,
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.6s ease',
          transformStyle: 'preserve-3d', borderRadius: 24, overflow: 'hidden',
          background: 'linear-gradient(160deg,rgba(123,104,238,0.18),rgba(255,255,255,0.03))',
          border: '1px solid rgba(123,104,238,0.35)',
          boxShadow: hovered
            ? '0 40px 80px rgba(0,0,0,0.7), 0 0 50px rgba(123,104,238,0.25)'
            : '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Glare */}
        <div style={{
          position:'absolute', inset:0, borderRadius:24, zIndex:10, pointerEvents:'none',
          background: hovered
            ? `radial-gradient(circle at ${50+tilt.y*2}% ${50+tilt.x*2}%,rgba(255,255,255,0.07) 0%,transparent 55%)`
            : 'none',
        }} />
        {/* Titlebar */}
        <div style={{
          background:'rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.08)',
          padding:'0.875rem 1.25rem', display:'flex', alignItems:'center', gap:8,
        }}>
          <div style={{ display:'flex', gap:6 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
            ))}
          </div>
          <span style={{ fontSize:'0.68rem', fontFamily:'var(--mono)', color:'var(--muted)', marginLeft:'auto' }}>
            wf-trading-bot v2.1 · live
          </span>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)',
            boxShadow:'0 0 8px var(--green)', flexShrink:0, animation:'pulse 2s infinite' }} />
        </div>
        {/* Body */}
        <div style={{ padding:'1.35rem' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1rem' }}>
            <div>
              <p style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:'var(--muted)',
                textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>AI Product</p>
              <h3 style={{ fontSize:'1.1rem', fontWeight:800, letterSpacing:'-0.025em' }}>WF Trading Bot</h3>
            </div>
            <span style={{
              background:'rgba(29,233,182,0.12)', color:'var(--green)',
              border:'1px solid rgba(29,233,182,0.25)',
              fontSize:'0.65rem', fontFamily:'var(--mono)', fontWeight:600,
              padding:'0.25rem 0.65rem', borderRadius:100, flexShrink:0,
            }}>+12.4% today</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.6rem', marginBottom:'1rem' }}>
            {[['87%','Win rate'],['24/7','Active'],['0.3s','Execute']].map(([v,l]) => (
              <div key={l} style={{
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:12, padding:'0.75rem 0.5rem', textAlign:'center',
              }}>
                <div style={{ fontSize:'1rem', fontWeight:800, fontFamily:'var(--mono)', color:'var(--green)' }}>{v}</div>
                <div style={{ fontSize:'0.62rem', color:'var(--muted)', marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ height:52, background:'rgba(255,255,255,0.03)', borderRadius:10,
            marginBottom:'1rem', overflow:'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 300 52" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1de9b6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#1de9b6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polygon points="0,52 0,42 30,36 60,38 90,27 120,29 150,17 180,14 210,21 240,9 270,6 300,2 300,52" fill="url(#cg)"/>
              <polyline points="0,42 30,36 60,38 90,27 120,29 150,17 180,14 210,21 240,9 270,6 300,2"
                fill="none" stroke="#1de9b6" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <span style={{ fontSize:'1.35rem', fontWeight:900, fontFamily:'var(--mono)' }}>$299</span>
              <span style={{ fontSize:'0.72rem', color:'var(--muted)', marginLeft:5 }}>/ license</span>
            </div>
            <motion.button
              whileHover={{ scale:1.05, boxShadow:'0 0 32px rgba(123,104,238,0.5)' }}
              whileTap={{ scale:0.95 }}
              onClick={() => onBuy('WF AI Trading Bot','ML-powered trading bot.',299)}
              style={{
                background:'linear-gradient(135deg,var(--ai),#6a5acd)', color:'#fff',
                padding:'0.5rem 1.2rem', borderRadius:10, fontSize:'0.82rem',
                fontWeight:700, border:'none', cursor:'pointer',
                boxShadow:'0 0 20px var(--ai-glow)',
              }}
            >Buy now</motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Counter({ val, suffix='' }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let cur = 0;
      const end = parseInt(String(val).replace(/\D/g,'')) || 0;
      const step = end / 45;
      const t = setInterval(() => {
        cur += step;
        if (cur >= end) { setN(end); clearInterval(t); }
        else setN(Math.floor(cur));
      }, 30);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [val]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const STATS = [
  { val:50, suffix:'+',         label:'Products shipped' },
  { val:199, prefix:'$',        label:'Starting price'   },
  { val:3,  suffix:' countries',label:'Active clients'   },
];

export default function Hero({ onBuy }) {
  const scrollTo = h => document.querySelector(h)?.scrollIntoView({ behavior:'smooth' });

  return (
    <div style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center',
      padding:'0 clamp(1.25rem, 4vw, 3rem)',
      paddingTop:'80px', // offset for fixed navbar
      overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}
        className="hero-grid">

        {/* ── Left col ── */}
        <div>
          <motion.div
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.15, duration:0.6, ease }}
          >
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'rgba(123,104,238,0.12)', border:'1px solid rgba(123,104,238,0.3)',
              padding:'0.3rem 0.9rem', borderRadius:100,
              fontSize:'0.72rem', fontFamily:'var(--mono)', color:'var(--ai3)',
              marginBottom:'1.75rem',
            }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--ai2)',
                boxShadow:'0 0 8px var(--ai)', flexShrink:0, animation:'pulse 2s infinite' }} />
              AI software · Made in Africa
            </div>
          </motion.div>

          <CyclingHeadline />

          <motion.p
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.55, duration:0.7, ease }}
            style={{ fontSize:'1.05rem', color:'var(--muted2)', fontWeight:400,
              lineHeight:1.8, maxWidth:420, marginBottom:'2rem' }}
          >
            AI trading bots, intelligent assistants, website templates, and mobile apps —
            ready to deploy or custom-built for your business.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.68, duration:0.6, ease }}
            style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', marginBottom:'2.75rem' }}
          >
            <BtnPrimary onClick={() => scrollTo('#products')}>Explore products ↓</BtnPrimary>
            <BtnGhost   onClick={() => scrollTo('#contact')}>Custom project →</BtnGhost>
          </motion.div>

          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.85, duration:0.8 }}
            style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap',
              paddingTop:'1.75rem', borderTop:'1px solid var(--border)' }}
          >
            {STATS.map((s,i) => (
              <motion.div key={s.label}
                initial={{ opacity:0, y:12 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.9+i*0.08, duration:0.5, ease }}
              >
                <div style={{ fontSize:'1.7rem', fontWeight:900, fontFamily:'var(--mono)',
                  letterSpacing:'-0.04em', color:'var(--white)' }}>
                  {s.prefix||''}<Counter val={s.val} suffix={s.suffix||''} />
                </div>
                <div style={{ fontSize:'0.7rem', color:'var(--muted)',
                  textTransform:'uppercase', letterSpacing:'0.07em', marginTop:3 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right col: tilt card ── */}
        <TiltCard onBuy={onBuy} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media(max-width:900px){
          .hero-grid { grid-template-columns:1fr !important; gap:2.5rem !important; }
        }
        @media(max-width:600px){
          .hero-grid > div:last-child { display:none; }
        }
      `}</style>
    </div>
  );
}
