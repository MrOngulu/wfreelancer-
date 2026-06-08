import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SectionLabel, AnimatedHeadline, ease } from './ui';


const ICONS = {
  bot: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(123,104,238,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="15" x2="8" y2="15"/><line x1="16" y1="15" x2="16" y2="15"/></svg>,
  chat: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(29,233,182,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  bolt: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,160,64,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

const featured = [
  {
    icon: 'bot', category: 'ALGORITHMIC',
    tag: 'AUTOMATED EXECUTION', badge: 'AI',
    name: 'WF AI Trading Bot',
    desc: 'Machine-learning algorithm that continuously scans markets and executes positions automatically across Forex, crypto & equities.',
    price: '$299', per: '/ per license', slug: 'wf-ai-trading-bot',
    accentColor: 'rgba(123,104,238,1)',
    accentGlow: 'rgba(123,104,238,0.18)',
    accentBorder: 'rgba(123,104,238,0.35)',
    stats: [{ val: '87%', label: 'HISTORICAL WIN RATE' }, { val: '24/7', label: 'UPTIME' }, { val: '+12.4%', label: "TODAY'S DELTA" }],
  },
  {
    icon: 'chat', category: 'CONVERSATIONAL',
    tag: 'INTELLIGENT SUPPORT', badge: 'New',
    name: 'WF AI Assistant',
    desc: 'Deploy a smart chatbot on any website. Handles customer support, qualifies leads, and answers questions — fully customizable.',
    price: '$199', per: '/ per license', slug: 'wf-ai-assistant',
    accentColor: 'rgba(29,233,182,1)',
    accentGlow: 'rgba(29,233,182,0.14)',
    accentBorder: 'rgba(29,233,182,0.3)',
    stats: [{ val: '60%', label: 'TICKET DROP' }, { val: 'Instant', label: 'RESPONSE' }, { val: '99.9%', label: 'UPTIME' }],
  },
  {
    icon: 'bolt', category: 'DATA PROCESSING',
    tag: 'BUSINESS INTELLIGENCE', badge: 'Coming soon',
    name: 'WF Analytics AI',
    desc: 'Ask questions about your business in plain English and get instant charts, summaries and insights from your own data.',
    price: '—', per: 'in development', slug: null, comingSoon: true,
    accentColor: 'rgba(255,160,64,1)',
    accentGlow: 'rgba(255,160,64,0.12)',
    accentBorder: 'rgba(255,160,64,0.28)',
    stats: [{ val: 'Plain', label: 'ENGLISH INPUT' }, { val: 'Any', label: 'DATASET' }, { val: 'Real-time', label: 'INSIGHTS' }],
  },
];

export default function FeaturedProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const item = featured[active];

  return (
    <section id="products" style={{ padding: '8rem 2.5rem', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(123,104,238,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(29,233,182,0.03) 0%, transparent 50%)',
      }} />

      <div ref={ref} style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
          <SectionLabel>Flagship software</SectionLabel>
        </motion.div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
          <AnimatedHeadline style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.0, margin: 0, maxWidth: 500 }} delay={0.1}>
            AI products built to earn
          </AnimatedHeadline>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ color: 'var(--muted2)', fontSize: '0.9rem', maxWidth: 320, lineHeight: 1.7 }}
          >
            Deploy-ready algorithms and intelligent tools — powered by machine learning, tested in real markets.
          </motion.p>
        </div>

        {/* Main two-column layout */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease }}
          style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}
        >

          {/* LEFT — selector list */}
          <div style={{ flex: '0 0 280px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Infrastructure label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: 20, height: 1, background: 'var(--ai2)' }} />
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                letterSpacing: '0.14em', color: 'var(--ai2)' }}>Infrastructure</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)', fontWeight: 900, letterSpacing: '-0.04em',
              lineHeight: 1.2, marginBottom: '1.75rem', color: '#fff' }}>
              Select a module to view specifications.
            </h2>

            {featured.map((f, i) => (
              <div
                key={f.name}
                onClick={() => setActive(i)}
                style={{
                  padding: '0.9rem 1rem 0.9rem 1.1rem',
                  borderRadius: 12,
                  cursor: 'pointer',
                  borderLeft: `2px solid ${i === active ? f.accentColor : 'rgba(255,255,255,0.08)'}`,
                  background: i === active ? `${f.accentGlow}` : 'transparent',
                  transition: 'all 0.18s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
                onMouseEnter={e => { if (i !== active) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderLeftColor = 'rgba(255,255,255,0.2)'; }}}
                onMouseLeave={e => { if (i !== active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderLeftColor = 'rgba(255,255,255,0.08)'; }}}
              >
                <div>
                  <p style={{ fontSize: '0.6rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                    letterSpacing: '0.12em', color: i === active ? f.accentColor : 'var(--muted)',
                    marginBottom: '0.2rem', transition: 'color 0.18s' }}>{f.category}</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: i === active ? '#fff' : 'var(--muted2)',
                    transition: 'color 0.18s' }}>{f.name}</p>
                </div>
                {i === active && (
                  <span style={{ color: f.accentColor, fontSize: '1rem' }}>→</span>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT — product detail card */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease }}
                style={{
                  border: `1px solid ${item.accentBorder}`,
                  borderRadius: 24,
                  padding: '2rem',
                  background: 'transparent',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Top glow */}
                <div style={{
                  position: 'absolute', top: -80, right: -80, width: 280, height: 280,
                  borderRadius: '50%', background: `radial-gradient(ellipse, ${item.accentGlow} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
                {/* Top line */}
                <div style={{
                  position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                  background: `linear-gradient(90deg, transparent, ${item.accentColor.replace('1)', '0.4)')}, transparent)`,
                }} />

                {/* Card header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: item.accentGlow,
                    border: `1px solid ${item.accentBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{ICONS[item.icon]}</div>
                  <div style={{
                    fontSize: '0.65rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                    letterSpacing: '0.12em', color: item.accentColor,
                    border: `1px solid ${item.accentBorder}`,
                    borderRadius: 100, padding: '0.25rem 0.7rem',
                  }}>{item.badge}</div>
                </div>

                {/* Tag + name */}
                <p style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
                  letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: '0.5rem' }}>{item.tag}</p>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900,
                  letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '0.75rem', color: '#fff' }}>{item.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted2)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: 520 }}>{item.desc}</p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  {item.stats.map((s, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${item.accentBorder}`,
                      borderRadius: 12, padding: '0.65rem 1rem', minWidth: 90,
                    }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)',
                        color: item.accentColor, letterSpacing: '-0.02em' }}>{s.val}</div>
                      <div style={{ fontSize: '0.58rem', color: 'var(--muted)', marginTop: 2,
                        fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <span style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--mono)',
                      color: item.comingSoon ? 'var(--muted)' : '#fff' }}>{item.price}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: 6 }}>{item.per}</span>
                  </div>
                  {!item.comingSoon && (
                    <button
                      onClick={() => navigate(`/product/${item.slug}`)}
                      onMouseEnter={e => { e.currentTarget.style.background = item.accentColor; e.currentTarget.style.color = '#0a0a12'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0a0a12'; }}
                      style={{
                        background: '#fff', color: '#0a0a12',
                        border: 'none', borderRadius: 100,
                        padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: '0.875rem',
                        cursor: 'pointer', transition: 'background 0.18s ease, color 0.18s ease',
                        letterSpacing: '-0.01em',
                      }}
                    >Acquire License →</button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>

      <style>{`
        @media(max-width:768px){
          #products { padding: 5rem 1.25rem !important; }
          #products .two-col { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}