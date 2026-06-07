import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ease } from './ui';

const PAIN_POINTS = [
  { icon: '⏳', text: 'Spending hours on repetitive tasks instead of billable work', label: 'Time drain' },
  { icon: '📉', text: 'Missing trading opportunities when you step away from the screen', label: 'Missed signals' },
  { icon: '📞', text: 'Losing leads because no one is online to answer questions', label: 'Lost leads' },
  { icon: '🔧', text: 'Building the same infrastructure from scratch, every single project', label: 'Wasted effort' },
];

const OPPORTUNITIES = [
  { label: 'Automate trading', desc: 'Run ML strategies 24/7 while you sleep', color: 'var(--green)', glow: 'rgba(29,233,182,0.12)' },
  { label: 'Automate support', desc: 'Answer customers instantly with AI', color: 'var(--ai2)', glow: 'rgba(123,104,238,0.12)' },
  { label: 'Ship faster', desc: 'Start with battle-tested templates', color: 'var(--amber)', glow: 'rgba(255,160,64,0.12)' },
];

const CARD_ACCENTS = [
  { border: 'rgba(123,104,238,0.5)', bg: 'rgba(123,104,238,0.07)' },
  { border: 'rgba(29,233,182,0.5)',  bg: 'rgba(29,233,182,0.07)'  },
  { border: 'rgba(255,160,64,0.5)',  bg: 'rgba(255,160,64,0.07)'  },
  { border: 'rgba(123,104,238,0.5)', bg: 'rgba(123,104,238,0.07)' },
];

function PainBar({ point, index, progress }) {
  // Each card slides in at its own threshold of the 0–1 hover-scroll progress
  const threshold = index / PAIN_POINTS.length;
  const accent = CARD_ACCENTS[index];

  // Derive x and opacity from the raw progress value
  const inRange = progress >= threshold;
  const localProgress = Math.min(1, Math.max(0, (progress - threshold) / (1 / PAIN_POINTS.length)));

  return (
    <motion.div
      animate={{
        x: inRange ? 0 : -60,
        opacity: inRange ? 1 : 0,
      }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div
        whileHover={{ background: accent.bg, borderColor: accent.border, x: 4 }}
        transition={{ duration: 0.18 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '1.25rem',
          padding: '1.1rem 1.5rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 14, marginBottom: '0.75rem',
          cursor: 'default',
        }}
      >
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.2)', minWidth: 18, flexShrink: 0 }}>0{index + 1}</span>
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{point.icon}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
            {point.label}
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted2)', lineHeight: 1.55, margin: 0 }}>
            {point.text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Narrative() {
  const opportunityRef = useRef(null);
  const opportunityInView = useInView(opportunityRef, { once: true, margin: '-80px' });
  const headlineRef = useRef(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: '-80px' });

  // Hover-driven scroll progress (0 = no cards, 1 = all cards)
  const [progress, setProgress] = useState(1); // start fully revealed
  const [isHovered, setIsHovered] = useState(false);
  const progressRef = useRef(1);

  // Vertical bar scale matches progress
  const barScaleY = progress;

  const handleWheel = useCallback((e) => {
    if (!isHovered) return;
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY > 0 ? 0.28 : -0.28;
    const next = Math.min(1, Math.max(0, progressRef.current + delta));
    progressRef.current = next;
    setProgress(next);
  }, [isHovered]);

  const panelRef = useRef(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <section id="narrative" style={{ background: 'transparent', position: 'relative' }}>

      {/* ── PROBLEM ── */}
      <div style={{ padding: '6rem 2.5rem', position: 'relative' }}>

        {/* Purple glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(123,104,238,0.06) 0%, transparent 70%)',
        }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', position: 'relative' }}>

          {/* LEFT — headline */}
          <div ref={headlineRef} style={{ flex: '0 0 45%' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                letterSpacing: '0.16em', color: 'var(--muted)', marginBottom: '1.5rem' }}
            >The problem</motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 900,
                letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: '1.5rem' }}
            >
              Most freelancers waste time building systems
              <span style={{ color: 'var(--ai2)' }}> instead of earning.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={headlineInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ color: 'var(--muted2)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 380 }}
            >
              The best digital businesses run on automation. Most freelancers don't have the tools to get there.
            </motion.p>
          </div>

          {/* RIGHT — hover-to-scroll cards panel */}
          <div
            ref={panelRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              flex: 1, position: 'relative', paddingLeft: '2rem',
              cursor: isHovered ? 'ns-resize' : 'default',
            }}
          >
            {/* Hint label */}
            <motion.p
              animate={{ opacity: isHovered ? 0 : 0.4 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute', top: -28, left: '2rem',
                fontSize: '0.65rem', fontFamily: 'var(--mono)',
                color: 'var(--muted)', letterSpacing: '0.12em',
                textTransform: 'uppercase', pointerEvents: 'none',
              }}
            >Scroll inside to reveal ↓</motion.p>

            {/* Vertical track bar */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2,
            }}>
              <motion.div
                animate={{ scaleY: barScaleY }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(180deg, var(--ai), var(--ai2))',
                  transformOrigin: 'top', borderRadius: 2,
                }}
              />
            </div>

            {/* Cards */}
            {PAIN_POINTS.map((p, i) => (
              <PainBar key={i} point={p} index={i} progress={progress} />
            ))}
          </div>

        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0 3rem' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(var(--border),var(--ai))' }} />
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', color: '#fff', boxShadow: '0 0 20px var(--ai-glow)',
          }}>↓</div>
        </div>
      </div>

      {/* ── OPPORTUNITY ── */}
      <div ref={opportunityRef} style={{ padding: '0 2.5rem 8rem' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={opportunityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                letterSpacing: '0.16em', color: 'var(--ai2)', marginBottom: '1.5rem' }}
            >The opportunity</motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={opportunityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900,
                letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: '1.5rem' }}
            >
              AI can automate{' '}
              <span style={{
                background: 'linear-gradient(135deg,var(--ai2),var(--ai3))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>the hard parts.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={opportunityInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.7 }}
              style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.75 }}
            >
              WFreelancers gives you the tools to run like a studio — without a team of 20.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: 900, margin: '0 auto' }}>
            {OPPORTUNITIES.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={opportunityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease }}
                whileHover={{ y: -6, boxShadow: `0 32px 80px rgba(0,0,0,0.4)` }}
                style={{
                  background: o.glow, border: `1px solid ${o.glow.replace('0.12','0.25')}`,
                  borderRadius: 20, padding: '2rem',
                  transition: 'box-shadow 0.4s, transform 0.4s',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: o.color,
                  boxShadow: `0 0 12px ${o.color}`, marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.03em',
                  marginBottom: '0.5rem', color: o.color }}>{o.label}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted2)', lineHeight: 1.7 }}>{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #narrative > div:first-child > div { flex-direction: column !important; gap: 2rem !important; }
          #narrative > div:first-child { padding: 4rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}