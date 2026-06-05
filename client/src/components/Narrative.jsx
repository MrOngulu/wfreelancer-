import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ease } from './ui';

const PAIN_POINTS = [
  { icon: '⏳', text: 'Spending hours on repetitive tasks instead of billable work' },
  { icon: '📉', text: 'Missing trading opportunities when you step away from the screen' },
  { icon: '📞', text: 'Losing leads because no one is online to answer questions' },
  { icon: '🔧', text: 'Building the same infrastructure from scratch, every single project' },
];

const OPPORTUNITIES = [
  { label: 'Automate trading', desc: 'Run ML strategies 24/7 while you sleep', color: 'var(--green)', glow: 'rgba(29,233,182,0.12)' },
  { label: 'Automate support', desc: 'Answer customers instantly with AI', color: 'var(--ai2)', glow: 'rgba(123,104,238,0.12)' },
  { label: 'Ship faster', desc: 'Start with battle-tested templates', color: 'var(--amber)', glow: 'rgba(255,160,64,0.12)' },
];

export default function Narrative() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="narrative" style={{ padding: '9rem 2.5rem', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      {/* Parallax gradient bg */}
      <motion.div style={{ y, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(123,104,238,0.05) 0%, transparent 65%)',
        }} />
      </motion.div>

      <div ref={ref} style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>

        {/* Problem */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'var(--muted)', marginBottom: '1.5rem' }}
          >The problem</motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.05em',
              lineHeight: 1.0, marginBottom: '1.5rem', maxWidth: 700, margin: '0 auto 1.5rem' }}
          >
            Most freelancers waste time building systems
            <span style={{ color: 'var(--muted)' }}> instead of earning.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 3.5rem', lineHeight: 1.75 }}
          >
            The best digital businesses run on automation. Most freelancers don't have the tools to get there.
          </motion.p>

          {/* Pain points */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: 900, margin: '0 auto' }}>
            {PAIN_POINTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease }}
                style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '1.25rem', textAlign: 'left',
                  display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                }}
              >
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{p.icon}</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.65 }}>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider arrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(var(--border),var(--ai))' }} />
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#fff',
              boxShadow: '0 0 20px var(--ai-glow)' }}>↓</div>
          </div>
        </motion.div>

        {/* Opportunity */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'var(--ai2)', marginBottom: '1.5rem' }}
          >The opportunity</motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.05em',
              lineHeight: 1.0, marginBottom: '1.5rem' }}
          >
            AI can automate{' '}
            <span style={{
              background: 'linear-gradient(135deg,var(--ai2),var(--ai3))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>the hard parts.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.7 }}
            style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 3.5rem', lineHeight: 1.75 }}
          >
            WFreelancers gives you the tools to run like a studio — without a team of 20.
          </motion.p>
        </div>

        {/* Opportunity cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: 900, margin: '0 auto' }}>
          {OPPORTUNITIES.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease }}
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

      <style>{`@media(max-width:600px){ section:has(.narrative) { padding:5rem 1.25rem !important; } }`}</style>
    </section>
  );
}
