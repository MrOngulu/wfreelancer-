import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SectionLabel, AnimatedHeadline, Badge, ease } from './ui';

const featured = [
  {
    icon: '🤖', variant: 'ai', tag: 'AI Software', badge: { text:'AI', variant:'ai' },
    name: 'WF AI Trading Bot',
    desc: 'Machine-learning trading algorithm that scans markets 24/7 and executes positions automatically on Forex, crypto & stocks.',
    price: '$299', per: '/ license', slug: 'wf-ai-trading-bot',
    glow: 'rgba(123,104,238,0.22)', accentColor: 'var(--ai2)',
    stats: [['87%','Win rate'],['24/7','Active'],['+12.4%','Today']],
  },
  {
    icon: '💬', variant: 'green', tag: 'AI Software', badge: { text:'New', variant:'green' },
    name: 'WF AI Assistant',
    desc: 'Deploy a smart chatbot on any website. Handles customer support, qualifies leads, and answers questions — fully customizable.',
    price: '$199', per: '/ license', slug: 'wf-ai-assistant',
    glow: 'rgba(29,233,182,0.16)', accentColor: 'var(--green)',
    stats: [['60%','Ticket drop'],['Instant','Response'],['99.9%','Uptime']],
  },
  {
    icon: '⚡', variant: 'amber', tag: 'AI Software', badge: { text:'Coming soon', variant:'muted' },
    name: 'WF Analytics AI',
    desc: 'Ask questions about your business in plain English and get instant charts, summaries and insights from your own data.',
    price: '—', per: 'in development', comingSoon: true, slug: null,
    glow: 'rgba(255,160,64,0.14)', accentColor: 'var(--amber)',
    stats: [['Plain','English'],['Any','Dataset'],['Real-time','Insights']],
  },
];

function FeatCard({ item, index }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay: index * 0.12 }}
      whileHover={{ y: -8, boxShadow: `0 40px 80px rgba(0,0,0,0.55), 0 0 0 1px ${item.glow}` }}
      style={{
        background: 'linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))',
        border: '1px solid var(--border)', borderRadius: 28, padding: '2.25rem',
        cursor: item.comingSoon ? 'default' : 'pointer',
        transition: 'border-color 0.3s, box-shadow 0.4s',
        position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%',
        background: `radial-gradient(ellipse,${item.glow} 0%,transparent 70%)`, pointerEvents: 'none',
      }} />
      {/* Horizontal line at top */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: `linear-gradient(90deg,transparent,${item.glow},transparent)`,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 18,
          background: `radial-gradient(circle at 30% 30%,${item.glow},rgba(255,255,255,0.03))`,
          border: `1px solid ${item.glow}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
        }}>{item.icon}</div>
        <Badge variant={item.badge.variant}>{item.badge.text}</Badge>
      </div>

      <p style={{ fontSize: '0.67rem', fontFamily: 'var(--mono)', color: 'var(--muted)',
        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>{item.tag}</p>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>{item.name}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--muted2)', lineHeight: 1.7, marginBottom: '1.75rem', flexGrow: 1 }}>{item.desc}</p>

      {/* Mini stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem', marginBottom: '1.75rem' }}>
        {item.stats.map(([val, lab]) => (
          <div key={lab} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '0.6rem 0.5rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, fontFamily: 'var(--mono)', color: item.accentColor }}>{val}</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2 }}>{lab}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--mono)',
            color: item.comingSoon ? 'var(--muted)' : item.accentColor }}>{item.price}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginLeft: 5 }}>{item.per}</span>
        </div>
        {!item.comingSoon && (
          <motion.button
            whileHover={{ scale: 1.05, background: 'var(--ai)', color: '#fff', borderColor: 'var(--ai)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/product/${item.slug}`)}
            style={{
              background: 'rgba(255,255,255,0.07)', color: 'var(--white2)',
              border: '1px solid var(--border2)', borderRadius: 10,
              padding: '0.5rem 1.1rem', fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'var(--head)',
            }}
          >Learn more →</motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="products" style={{ padding: '8rem 2.5rem', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(123,104,238,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(29,233,182,0.03) 0%, transparent 50%)',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>
        <div ref={ref}>
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
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
          {featured.map((item, i) => <FeatCard key={item.name} item={item} index={i} />)}
        </div>
      </div>

      <style>{`@media(max-width:600px){ #products { padding:5rem 1.25rem !important; } }`}</style>
    </section>
  );
}
