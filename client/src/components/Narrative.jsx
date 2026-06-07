import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from './ui';

const PAIN_POINTS = [
  { icon: '⏳', text: 'Spending hours on repetitive tasks instead of billable work', label: 'Time drain' },
  { icon: '📉', text: 'Missing trading opportunities when you step away from the screen', label: 'Missed signals' },
  { icon: '📞', text: 'Losing leads because no one is online to answer questions', label: 'Lost leads' },
  { icon: '🔧', text: 'Building the same infrastructure from scratch, every single project', label: 'Wasted effort' },
];

const OPPORTUNITIES = [
  { icon: '📈', label: 'Automate trading', desc: 'Run ML strategies 24/7 while you sleep', color: 'var(--green)', glow: 'rgba(29,233,182,0.12)', glowHover: 'rgba(29,233,182,0.18)', borderHover: 'rgba(29,233,182,0.4)', hero: true },
  { icon: '🤖', label: 'Automate support', desc: 'Answer customers instantly with AI', color: 'var(--ai2)', glow: 'rgba(123,104,238,0.12)', glowHover: 'rgba(123,104,238,0.18)', borderHover: 'rgba(123,104,238,0.4)', hero: false },
  { icon: '⚡', label: 'Ship faster', desc: 'Start with battle-tested templates', color: 'var(--amber)', glow: 'rgba(255,160,64,0.12)', glowHover: 'rgba(255,160,64,0.18)', borderHover: 'rgba(255,160,64,0.4)', hero: false },
];

const HOVER_ACCENT = { border: 'rgba(123,104,238,0.5)', bg: 'rgba(123,104,238,0.07)' };

export default function Narrative() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const opportunityRef = useRef(null);
  const opportunityInView = useInView(opportunityRef, { once: true, margin: '-80px' });

  return (
    <section id="narrative" style={{ background: 'transparent', position: 'relative' }}>

      {/* ── PROBLEM ── */}
      <div style={{ padding: '6rem 2.5rem', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(123,104,238,0.06) 0%, transparent 70%)',
        }} />

        <div ref={ref} style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', position: 'relative' }}>

          {/* LEFT — headline */}
          <div style={{ flex: '0 0 45%' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                letterSpacing: '0.16em', color: 'var(--muted)', marginBottom: '1.5rem' }}
            >The problem</motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 900,
                letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: '1.5rem' }}
            >
              Most freelancers waste time building systems
              <span style={{ color: 'var(--ai2)' }}> instead of earning.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ color: 'var(--muted2)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 380 }}
            >
              The best digital businesses run on automation. Most freelancers don't have the tools to get there.
            </motion.p>
          </div>

          {/* RIGHT — cards */}
          <div style={{ flex: 1, position: 'relative', paddingLeft: '2rem' }}>
            {/* Vertical bar */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 2, background: 'linear-gradient(180deg, var(--ai), var(--ai2))',
              borderRadius: 2,
            }} />

            {PAIN_POINTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease }}
                whileHover={{ background: HOVER_ACCENT.bg, borderColor: HOVER_ACCENT.border, x: 4 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
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
                  color: 'rgba(255,255,255,0.2)', minWidth: 18, flexShrink: 0 }}>0{i + 1}</span>
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                    {p.label}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted2)', lineHeight: 1.55, margin: 0 }}>
                    {p.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>



      {/* ── DIVIDER LINE ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0 3rem' }}>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(var(--border), var(--ai))' }} />
      </div>

      {/* ── OPPORTUNITY ── */}
      <div ref={opportunityRef} style={{ padding: '0 2.5rem 8rem' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', gap: '5rem', alignItems: 'center' }}>

          {/* LEFT — headline + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={opportunityInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            style={{ flex: '0 0 320px' }}
          >
            {/* Pill tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100,
              padding: '0.3rem 0.75rem', marginBottom: '1.75rem',
            }}>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)' }}>System Opportunity</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900,
              letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: '1.25rem' }}>
              AI automates<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--ai2), var(--ai3))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>the hard parts.</span>
            </h2>

            <p style={{ color: 'var(--muted2)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 300 }}>
              WFreelancers provides studio-grade infrastructure to deploy complex ML operations—without scaling an expensive headcount of 20+.
            </p>

            <motion.a
              href="#store"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#fff', color: '#0a0a12',
                padding: '0.75rem 1.5rem', borderRadius: 100,
                fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >Deploy Infrastructure →</motion.a>
          </motion.div>

          {/* RIGHT — asymmetric card grid */}
          <div style={{ flex: 1 }}>
            {/* Top row: two smaller cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>

              {/* Automate support */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={opportunityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6, ease }}
                whileHover={{ y: -4, borderColor: 'rgba(123,104,238,0.4)', background: 'rgba(123,104,238,0.06)' }}
                style={{
                  border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18,
                  padding: '1.5rem', background: 'transparent', cursor: 'default',
                  transition: 'all 0.08s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(123,104,238,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(123,104,238,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></div>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ai2)',
                    boxShadow: '0 0 8px var(--ai2)', marginTop: 4 }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>Automate support</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted2)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Resolve tier-1 tickets instantly with context-aware RAG agents.
                </p>
                {/* Terminal snippet */}
                <div style={{
                  background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '0.6rem 0.75rem',
                  fontFamily: 'var(--mono)', fontSize: '0.7rem',
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '0.25rem' }}>&gt; User request parsing...</div>
                  <div style={{ color: 'var(--green)' }}>Action: <span style={{ color: '#fff' }}>Refund initiated</span></div>
                </div>
              </motion.div>

              {/* Ship faster */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={opportunityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6, ease }}
                whileHover={{ y: -4, borderColor: 'rgba(255,160,64,0.4)', background: 'rgba(255,160,64,0.05)' }}
                style={{
                  border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18,
                  padding: '1.5rem', background: 'transparent', cursor: 'default',
                  transition: 'all 0.08s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(255,160,64,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,160,64,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg></div>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)',
                    boxShadow: '0 0 8px var(--amber)', marginTop: 4 }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>Ship faster</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted2)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Bypass boilerplate with battle-tested template pipelines.
                </p>
                {/* Progress bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {[{ label: 'BUILD', pct: '88%' }, { label: 'TEST', pct: '72%' }].map(b => (
                    <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', minWidth: 30 }}>{b.label}</span>
                      <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                        <div style={{ width: b.pct, height: '100%', background: 'var(--amber)', borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom row: wide hero card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={opportunityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease }}
              whileHover={{ y: -4, borderColor: 'rgba(29,233,182,0.4)', background: 'rgba(29,233,182,0.05)' }}
              style={{
                border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18,
                padding: '1.5rem', background: 'transparent', cursor: 'default',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.08s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(29,233,182,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(29,233,182,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div>
                  <span style={{
                    fontSize: '0.6rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                    letterSpacing: '0.12em', color: 'var(--green)',
                    background: 'rgba(29,233,182,0.1)', border: '1px solid rgba(29,233,182,0.25)',
                    borderRadius: 100, padding: '0.2rem 0.6rem',
                  }}>Active Module</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>Automate trading</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted2)', lineHeight: 1.6, maxWidth: 340 }}>
                  Execute high-frequency ML strategies 24/7 without manual market supervision.
                </p>
              </div>
              {/* Mini bar chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', padding: '0 1rem', flexShrink: 0 }}>
                {[40, 60, 45, 75, 55, 80, 65, 90, 70, 95].map((h, i) => (
                  <div key={i} style={{
                    width: 8, height: `${h * 0.6}px`,
                    background: i >= 7 ? 'var(--green)' : 'rgba(29,233,182,0.35)',
                    borderRadius: '3px 3px 0 0',
                  }} />
                ))}
              </div>
            </motion.div>
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